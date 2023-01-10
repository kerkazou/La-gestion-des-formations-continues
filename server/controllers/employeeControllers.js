const db = require('../models');
const jwt = require('jsonwebtoken');
var storage = require('local-storage');
const mailer = require('../middlewares/mailer');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

// Create Main Model
const User = db.user;
const Role = db.role;
const Formation = db.formation;
const Organisme = db.organisme;


const GetEmployees = async (req, res) => {
    const organisme = await Organisme.find()
    const role_employee = await Role.findOne({ name: 'Employee' })
    const find_employee = await User.find({ role: role_employee._id })
        .populate('roles')
        .populate('organisme')
    res.send({ employee: find_employee, organisme })
}

const AddEmployee = async (req, res) => {
    const { body } = req
    if (!body.username || !body.email || !body.organisme) throw Error('Fill the all fields')
    const find_email = await User.findOne({ email: body.email })
    if (find_email) throw Error('Employee already exist')
    const role_employee = await Role.findOne({ name: 'Employee' })
    const find_organisme = await Organisme.findOne({ name: body.organisme })
    if (!find_organisme) throw Error('Organisme not existed')
    const password = await (Math.random() + 1).toString(36).substring(7)
    const hash = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
        username: body.username,
        email: body.email,
        password: hash,
        roles: role_employee._id,
        organisme: find_organisme._id
    })
    if (user) {
        mailer.main('add_employee', { username: user.username, email: user.email, password: password })
        res.json({ message: 'Successfully, Employee is created' })
    }
    if (!user) throw Error('User not created try again')
}

module.exports = {
    GetEmployees,
    AddEmployee
}
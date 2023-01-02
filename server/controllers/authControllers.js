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

const login = async (req, res) => {
    const { body } = req
    if (!body.email || !body.password) throw Error('Fill the all fields to login')
    const login_user = await User.findOne({ email: body.email })
    if (!login_user || !(await bcrypt.compare(body.password, login_user.password))) throw Error('Email or password is incorect')
    const login_role = await Role.findById(login_user.roles)
    const token = await jwt.sign({ _id: login_user._id }, process.env.TOKEN_KEY)
    storage('token', token)
    res.json({ role: login_role.name, username: login_user.username, token: storage('token') })
}

const AddEmployee = async (req, res) => {
    const { body } = req
    if (!body.username || !body.email || !body.formation || !body.organisme) throw Error('Fill the all fields')
    const role_employee = await Role.findOne({ name: 'Employee' })
    const find_email = await User.findOne({ email: body.email })
    if (find_email) throw Error('Email already exist')
    const find_formation = await Formation.findOne({name: body.formation})
    if (find_formation) throw Error('Formation not existed')
    const find_organisme = await Organisme.findOne({name: body.organisme})
    if (find_organisme) throw Error('Formation not existed')
    const password = await (Math.random() + 1).toString(36).substring(7)
    const hash = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
        username: body.username,
        email: body.email,
        password: hash,
        roles: role_employee._id,
        formation: find_formation._id,
        organisme: find_organisme._id
    })
    if (user) {
        mailer.main('add_employee', {username: user.username, email: user.email, password: password})
        res.json({ message: 'Successfully, Employee is created' })
    }
    if (!user) throw Error('User not created try again')
}

const logout = async (req, res) => {
    storage.clear();
    res.send('You are logout')
}

module.exports = {
    login,
    AddEmployee,
    logout
}
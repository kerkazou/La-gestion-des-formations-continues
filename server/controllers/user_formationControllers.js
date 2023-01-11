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
const User_formation = db.user_formation;


const GetFormation = async (req, res) => {
    const token = storage('token')
    const formation_employee = await User_formation.find()
        .populate('user')
        .populate('formation')
    const role_employee = await Role.findOne({ name: 'Employee' })
    const employee = await User.find({ roles: role_employee._id })
        .populate('roles')
        .populate('organisme')
    const formation = await Formation.find()
    res.send({ formation_employee, employee, formation })
}

const FormationToEmployee = async (req, res) => {
    const { body } = req
    if (!body.organisme || !body.formation) throw Error('Fill the all fields')
    const find_organisme = await Organisme.findOne({ name: body.organisme })
    if (!find_organisme) throw Error('Organisme is not exist')
    const find_formation = await Formation.findOne({ name: body.formation })
    if (!find_formation) throw Error('Formation is not exist')
    const user_formation = await User_formation.create({
        organisme: find_organisme._id,
        formation: find_formation._id
    })
    if (!user_formation) throw Error('Formation not assigned to employee, try again')
    res.json({ message: 'Successfully, Formation assigned to employee' })
}

const MyFormation = async (req, res) => {
    const token = req.params.token
    const verify_token = await jwt.verify(token, process.env.TOKEN_KEY)
    const user = await User.findById(verify_token._id)
    if (!user) throw Error('Error, User not found')
    const formation = await User_formation.find({ employee: user._id })
    res.send(formation)
}

module.exports = {
    GetFormation,
    FormationToEmployee,
    MyFormation
}
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
        .populate('employee')
        .populate('formation')
    const role_employee = await Role.findOne({ name: 'Employee' })
    const employee = await User.find({ roles: role_employee._id, status: true })
        .populate('roles')
        .populate('organisme')
    const formation = await Formation.find({ status: true })
    res.send({ formation_employee, employee, formation })
}

const FormationToEmployee = async (req, res) => {
    const { body } = req
    if (!body.employee || !body.formation) throw Error('Fill the all fields')
    const find_employee = await User.findById(body.employee)
    const find_formation = await Formation.findById(body.formation)
    if (!find_employee || !find_formation) throw Error('Emplotee or Formation is not exist')

    const find_formation_employee = await User_formation.findOne({employee: find_employee._id, formation: find_formation._id})
    if(find_formation_employee) throw Error("Is already assigned")

    const formation_employee = await User_formation.create({
        employee: find_employee._id,
        formation: find_formation._id
    })
    if (!formation_employee) throw Error('Formation not assigned to employee, try again')
    res.json({ message: 'Successfully' })
}

const DeleteUserFormation = async (req, res) => {
    const id = req.params.id
    const find_user_formation = await User_formation.findById(id)
    if (!find_user_formation) throw Error('User formation not existed')
    const delete_user_formation = await User_formation.deleteOne({_id: id})
    if (!delete_user_formation) throw Error('User formation not reset try again')
    res.json({ message: 'Successfully, User formation is Reset' })
}

const MyFormation = async (req, res) => {
    const token = req.params.token
    const verify_token = await jwt.verify(token, process.env.TOKEN_KEY)
    const user = await User.findById(verify_token._id)
    if (!user) throw Error('Error, User not found')
    const formation = await User_formation.find({ employee: user._id })
        .populate('employee')
        .populate('formation')
    res.send(formation)
}

module.exports = {
    GetFormation,
    FormationToEmployee,
    DeleteUserFormation,
    MyFormation
}
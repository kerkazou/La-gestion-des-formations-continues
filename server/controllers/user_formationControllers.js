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
    const ferify_token = await jwt.verify(token, process.env.TOKEN_KEY)
    const find_formation = await User_formation.find({ employee: ferify_token._id })
        .populate('user')
        .populate('formation')
    res.send({ formation: find_formation })
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

module.exports = {
    GetFormation,
    FormationToEmployee
}
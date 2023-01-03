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


const GetFormation = async (req, res) => {
    const find_formation = await Formation.find()
    res.send({find_formation})
}

const AddFormation = async (req, res) => {
    const { body } = req
    if (!body.name || !body.duration) throw Error('Fill the all fields')
    if (await Formation.findOne({ name: body.name })) throw Error('Formation already exist')
    const formation = await Formation.create({
        name: body.name,
        duration: body.duration,
        image: `${req.protocol}://${req.get("host")}/public/${req.file.filename}`
    })
    if (!formation) throw Error('Formation not created try again')
    res.json({ message: 'Successfully, Formation is created' })
}

module.exports = {
    GetFormation,
    AddFormation
}
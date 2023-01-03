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


const GetOrganisme = async (req, res) => {
    const find_organisme = await Organisme.find()
    res.send({ organisme: find_organisme })
}

const AddOrganisme = async (req, res) => {
    const { body } = req
    if (!body.name) throw Error('Fill the all fields')
    const organisme = await Organisme.create({ name: body.name })
    if (!organisme) throw Error('Formation not created try again')
    res.json({ message: 'Successfully, Organisme is created' })
}

const UpdateOrganisme = async (req, res) => {
    const name = req.body.name
    const id = req.params.id
    const find_organisme = await Organisme.findById(id)
    if (!find_organisme) throw Error('Organisme not existed')
    const update_organisme = await Organisme.updateOne({ id }, { name: name })
    if (!update_organisme) throw Error('Organisme not updated try again')
    res.json({ message: 'Successfully, Organisme is updated' })
}

module.exports = {
    GetOrganisme,
    AddOrganisme,
    UpdateOrganisme
}
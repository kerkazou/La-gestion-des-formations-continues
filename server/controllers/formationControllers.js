const db = require('../models');
const jwt = require('jsonwebtoken');
var storage = require('local-storage');
const mailer = require('../middlewares/mailer');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const fs = require("fs");
const path = require("path");

// Create Main Model
const User = db.user;
const Role = db.role;
const Formation = db.formation;
const Organisme = db.organisme;
const User_formation = db.user_formation;


const GetFormations = async (req, res) => {
    const formation = await Formation.find()
    res.send({ formation })
}

const AddFormation = async (req, res) => {
    const { body } = req
    if (!body.name || !body.dateDebut || !body.dateFin || !req.file) {
        if (req.file) fs.unlinkSync('./public/' + req.file.filename)
        throw Error('Fill the all fields')
    }
    if (await Formation.findOne({ name: body.name })) throw Error('Formation already exist')
    const formation = await Formation.create({
        name: body.name,
        dateDebut: body.dateDebut,
        dateFin: body.dateFin,
        image: `${req.protocol}://${req.get("host")}/${req.file.filename}`
    })
    if (!formation) throw Error('Formation not created try again')
    res.json({ message: 'Successfully, Formation is created' })
}

const UpdateFormation = async (req, res) => {
    const { body } = req
    const id = req.params.id
    let file = ''
    if (!body.name || !body.dateDebut || !body.dateFin) throw Error('Fill the all fields')
    const find_formation = await Formation.findById(id)
    if (!find_formation) throw Error('Formation not existed')
    if (req.file) {
        file = find_formation.image.split('/')[find_formation.image.split('/').length - 1]
        const update_file_formation = await Formation.updateOne({ _id: id }, { ...body, image: `${req.protocol}://${req.get("host")}/${req.file.filename}` })
        await fs.unlinkSync('./public/' + file)
        if (!update_file_formation) throw Error('Formation not updated try again')
    }
    else {
        const update_formation = await Formation.updateOne({ _id: id }, { ...body })
        if (!update_formation) throw Error('Formation not updated try again')
    }
    res.json({ message: 'Successfully, Formation is updated' })
}

const DeleteFormation = async (req, res) => {
    const id = req.params.id
    const find_formation = await Formation.findById(id)
    if (!find_formation) throw Error('Formation not existed')
    if (find_formation.status) {
        const delete_formation = await Formation.updateOne({ _id: id }, { status: false })
        if (!delete_formation) throw Error('Formation not Deleted try again')
        res.json({ message: 'Successfully, Formation is Deleted' })
    }
    if (!find_formation.status) {
        const delete_formation = await Formation.updateOne({ _id: id }, { status: true })
        if (!delete_formation) throw Error('Formation not reset try again')
        res.json({ message: 'Successfully, Formation is Reset' })
    }
}

module.exports = {
    GetFormations,
    AddFormation,
    UpdateFormation,
    DeleteFormation
}
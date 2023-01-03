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


const Statistique = async (req, res) => {
    const role_employee = await Role.findOne({ name: 'Employee' })
    const employee = await User.aggregate([
        { $match: { roles: role_employee._id } },
        { $count: "total" }
    ])
    const formation = await Formation.aggregate([
        { $count: "total" }
    ])
    const organisme = await Organisme.aggregate([
        { $count: "total" }
    ])
    let n_employee = 0
    let n_formation = 0
    let n_organisme = 0
    if (employee.length != 0) n_employee = employee[0].total
    if (formation.length != 0) n_formation = formation[0].total
    if (organisme.length != 0) n_organisme = organisme[0].total
    res.send({ employee: n_employee, formation: n_formation, organisme: n_organisme })
}

module.exports = {
    Statistique
}
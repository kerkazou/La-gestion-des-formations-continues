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
    if(!login_user.status) throw Error("You can't to use this account")
    const login_role = await Role.findById(login_user.roles)
    const token = await jwt.sign({ _id: login_user._id }, process.env.TOKEN_KEY)
    storage('token', token)
    res.json({ role: login_role.name, username: login_user.username, token: storage('token') })
}

const logout = async (req, res) => {
    storage.clear();
    res.send('You are logout')
}

module.exports = {
    login,
    logout
}
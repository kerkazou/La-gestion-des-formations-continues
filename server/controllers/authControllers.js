const db = require('../models');
const jwt = require('jsonwebtoken');
var storage = require('local-storage');
const mailer = require('../middlewares/mailer');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

// Create Main Model
const User = db.user;
const Role = db.role;

const login = async (req, res) => {
    const {body} = req
    if(!body.email || !body.password) throw Error('Fill the all fields to login')
    const login_user = await User.findOne({email: body.email})
    if(!login_user || !(await bcrypt.compare(body.password, login_user.password))) throw Error('Email or password is incorect')
    const login_role = await Role.findById(login_user.roles)
    const token = await jwt.sign({_id: login_user._id}, process.env.TOKEN_KEY)
    storage('token', token)
    res.json({role: login_role.name, username: login_user.username, token: storage('token')})
}

const AddEmployee = async (req, res) => {
    const {body} = req
    if(!body.username || !body.email || !body.password || body.password != body.confirm_password)
        throw Error('Fill the all fields to register')
    const findEmail = await User.findOne({email: body.email})
    if(findEmail) throw Error('Email already exist')
    const hash = await bcrypt.hash(body.password, saltRounds);
    const user = await User.create({
        ...body, password: hash, roles: '637de58c1c73d7e2ef657a46', verification: true
    })
    if(user) {
        mailer.main('verify-email',body.email)
        res.json({message: 'Successfully, Livreur is created.'})
    }
    if(!user) throw Error('User not created try again')
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
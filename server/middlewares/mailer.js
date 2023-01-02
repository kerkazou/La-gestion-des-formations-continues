const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
require('dotenv').config();

function main(action, employee) {

  let content = ''
  if (action == 'add_employee') {
    content = `<div style='height: 200px; width: 100%;'>
                <p>Hy ${employee.username},</p>
                <p>Welcome to continuing education</p>
                <div>
                  <p>Email: ${employee.email}</p>
                  <p>Password: ${employee.password}</p>
                </div>
                <div>
                  <a href='http://localhost:3000/login' style="margin-buttom: 10px !important; padding: 15px 32px; text-align: center; text-decoration: none; cursor: pointer; color: white; border-radius: 8px; border: none; background-color: #4CAF50;">Login</a>
                </div>
              </div>`
  }

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  })

  let info = {
    from: '"YOUCODE👻" <kerkazou.zakaria@gmail.com>',
    to: employee.email,
    subject: "YOUCODE ✔",
    html: content
  }

  transporter.sendMail(info);
}

module.exports = {
  main
}
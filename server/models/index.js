const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

const db = {};

db.mongoose = mongoose;

db.user = require("../models/userModal");
db.role = require("../models/roleModal");
db.organisme = require("../models/organismeModal");
db.formation = require("../models/formationModal");
db.user_formation = require("../models/user_formationModal");

db.role.estimatedDocumentCount((err, count) => {
    if (!err && count != 2) {
        db.role.findOne({ name: 'Administrator' })
            .then((e) => {
                if (!e) {
                    new db.role({
                        name: "Administrator"
                    })
                        .save(err => {
                            if (err) { console.log("error", err) }
                            console.log("'Administrator' added to roles collection");
                        });
                }
            })
            .catch((error) => { console.log(error) })

        db.role.findOne({ name: 'Employee' })
            .then((e) => {
                if (!e) {
                    new db.role({
                        name: "Employee"
                    })
                        .save(err => {
                            if (err) { console.log("error", err) }
                            console.log("'Employee' added to roles collection");
                        });
                }
            })
            .catch((error) => { console.log(error) })
        Administrator();
    }
});

const Administrator = async () => {
    const role_admin = await db.role.findOne({ name: 'Administrator' })
    const find_admin = await db.user.findOne({ email: 'manager@gmail.com' })
    const hash = await bcrypt.hash('111', salt)
    if (!find_admin) {
        new db.user({
            username: "manager",
            email: "manager@gmail.com",
            password: hash,
            roles: role_admin._id,
        })
            .save(err => {
                if (err) { console.log("error", err) }
                console.log("'Manager' added to Users collection");
            });
    }
}

module.exports = db;
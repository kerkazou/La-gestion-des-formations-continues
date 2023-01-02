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
    }
});

module.exports = db;
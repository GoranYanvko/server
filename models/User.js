const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserShema = mongoose.Schema({
    username: {type:String, require:true, unique: true},
    password: {type:String, require:true},
    email: {type:String}
})

UserShema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPass;
    }
});

const User = mongoose.model('User',  UserShema);

User.seedAdminUser = async () => {
    try {
        let users = await User.find();
        if (users.length > 0) return;
        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, 'Admin');
        return User.create({
            username: 'Admin',
            salt,
            hashedPass,
            roles: ['Admin']
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = User;

module.exports.addUser = function (newUser, calback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save(calback)

        })
    })
}

module.exports.chekPass = function (pass, hash, calback) {
   bcrypt.compare(pass, hash, (err, isMatch)=>{
       console.log(isMatch);
       calback(null, isMatch)
   })
 }



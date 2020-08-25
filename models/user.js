const bcrypt = require('bcrypt');

module.exports = (sequelize, type) => {

    const User = sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: type.STRING,
            unique: true,
            allowNull: false,
            validate: {
                // is: /^(?=.*[a-zA-Z])(?=.*[0-9])([a-zA-z0-9])$/i
            }
        },
        password: {
            type: type.STRING,
            allowNull: false,
        }
    },
        {
            // freezeTableName: true,
            hooks: {
                beforeCreate: (user) => {
                    const salt = bcrypt.genSaltSync();
                    user.password = bcrypt.hashSync(user.password, salt);
                },
                beforeUpdate: (user) => {
                    const salt = bcrypt.genSaltSync();
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            },
        }
    );
    // function setSaltAndHashPassword(user){
    //     if(user.changed('password')){
    //         const salt = bcrypt.genSaltSync();
    //         user.password = bcrypt.hashSync(user.password, salt);
    //     }
    // }
    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    }
    return User;
}
const bcrypt = require('bcrypt');

module.exports = (sequelize, type) => {

    const Website = sequelize.define('website', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId:{
            type:type.INTEGER
        },
        website_name: {
            type: type.STRING,
            allowNull: false,
            notNull: true
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
                beforeCreate: (website) => {
                    const salt = bcrypt.genSaltSync();
                    website.password = bcrypt.hashSync(website.password, salt);
                },
                beforeUpdate: (website) => {
                    const salt = bcrypt.genSaltSync();
                    website.password = bcrypt.hashSync(website.password, salt);
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
    Website.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    }
    return User;
}
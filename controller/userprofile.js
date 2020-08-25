const db = require('../sequilize');
module.exports = 
{
    register : async (req, res) => {
    console.log("Register api")
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        data = req.body;
        User = await db.User.create(data);
        res.statusCode = 200;
        res.setHeader('application/json');
        res.json({
            "status":"account created"
        })
        return;
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err.errors[0].message);
    }
},
login: async(req,res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json({errors:errors.array()});
            return;
        }

        username = req.username;
        password = req.password;

        var user = await db.User.findOne({
            where: {
                username: username
            },
            attributes: {
                exclude: ['password','username']
            }
        });
        res.json({
            "status":"success",
            "userId":user.id
        });
    }
    catch (err) {
        res.status(400).send(err);
    }
}
};
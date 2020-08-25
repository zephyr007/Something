const db = require('../sequilize');

module.exports = {
    addWebsite : async(req,res) => {
        var user = await db.User.findOne({
            where:{
                id:req.params.userId
            }
        });

        const data = req.body;
        data.userId = user.id;
        try {
            await db.Web.create(data);
            return res.status(200).send("Success");
        } catch (err) {
            res.json(err.errors[0].message);
        }
    },
    displayWebsites: async(req,res) => {
        try {
            web = await db.Web.findAll({
                where:{
                    userId:req.params.id
                }
            });
            return res.send(web);
        }
        catch(err){
            res.statusCode = 400;
            res.send("Error");
        }
    }
};
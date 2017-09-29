var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = mongoose.model("User");
var Question = mongoose.model("Question");

module.exports = {

    create: function(req, res){

        var user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,

        });
        user.save().then((user)=>{
            req.session.userId = user._id;
            console.log(`Successfully saved ${user.email}...`);
            res.json(user);
            console.log("After res.json, before redirect...");
        }).catch((err)=>{
            res.status(500);
            console.log("Inside the .catch");
            console.log(err);
            res.json(err);
        })
    },

    findUser: function(req, res){
        console.log("Inside findUser method in Express Controller");
        User.findOne({email: req.body.email}).exec(function(err, user){
            if(err){
                console.log("Errors during findUser!");
                res.json(err);
                res.status(500);
            }
            else{
                if(user.password != req.body.password)
                {
                    console.log("Passwords did not match Sucka!");
                    res.status(500);
                    res.json({error: "Passwords did not match Sucka!"});
                }
                else
                {
                    console.log(user)
                    req.session.userId = user._id;
                    res.json(user);
                }

            }
        })
    },

    findCreator: function(req, res){
        console.log("Inside findCreator method in Express Controller");
        User.findOne({_id: req.body.creatorId}).exec(function(err, user){
            if(err){
                console.log("Errors during findUser!");
                res.json(err);
                res.status(500);
            }
            else{
                res.json(user);
                }

        })
    },

    logout: function(req, res)
    {
        req.session.destroy();
        res.redirect('/');
    },
    getSession: function(req, res){
        if(req.session.userId == null)
        {
            res.status(500);
            console.log("Session is currently null.");
            res.json({error: "Session is currently null!"});
        }
        else
        {
            User.findOne({_id: req.session.userId}, function(err, user){
                res.status(200);
                res.json(user);
            })

        }
    }

}


// updateStatus: function(req, res){
//     console.log(`stuff from req.body = ${req.body.playerId}, ${req.body.status}, ${req.body.idx}`)
//     console.log("inside players.js updateStatus");
//     let player = new Player();
//     console.log(player)
//     let idx = req.body.idx;
//     let setter = {};
//     setter[`status.${idx}`]=req.body.status; //this line builds the query which is used in the line below as $set:setter... $set is followed by a querry of what key to match and what value to set it to. Because we want to use a variable in the key we have to build this query here first and pass it in as a whole.
//     player = Player.findOneAndUpdate({_id:req.body.playerId},{$set:setter}, {new:true}, function(err, result){
//         if(err){
//             console.log(err);
//             res.json(err);
//         }
//         else{
//             console.log(result);
//             player = result;
//         }
//     })
// },
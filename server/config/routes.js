var mongoose = require("mongoose");
const path = require("path");

users = require("./../controllers/users.js");
questions = require("./../controllers/questions.js");

module.exports = function(app){

    app.post("/findUser", function(req, res){
        console.log("Inside Find User Server Express route... " + req.body.email);
        users.findUser(req, res);
    })

    app.post("/addUser", function(req, res){
        console.log("Inside Add User Server Express route..." + req.body.email);
        users.create(req, res);
    })

    app.get("/logout", function(req, res){
        console.log("Inside Logout Express route...");
        users.logout(req, res);
    })

    app.get("/getSession", function(req, res){
        console.log("Inside Get Session Server Express route..." + req.session.userId);
        users.getSession(req, res);

    })

    app.post("/addQuestion", function(req, res){
        console.log("Inside Add Question Server Express route..." + req.body.title);
        questions.addQuestion(req, res);
    })

    app.get("/getAllQuestions", function(req, res){
        console.log("Inside Getting All Questions Server Express route...");
        questions.getAllQuestions(req, res);
    })
    app.post("/findCreator", function(req, res){
        console.log("Inside Creator info Server Express route...");
        users.findCreator(req, res);
    })
    app.post("/getMyQuestions", function(req, res){
        console.log("Inside Get My Questions info Server Express route...");
        questions.getMyQuestions(req, res);
    })
    app.post("/removeQuestion", function(req, res){
        console.log("Inside remove Question action!");
        questions.removeQuestion(req, res);
    })
    app.post("/updateQuestion", function(req, res){
        console.log("Inside Update Question Server Express route...");
        questions.updateQuestion(req, res);
    })
    app.all("*", (req,res,next)=>{
        res.sendFile(path.resolve("./public/dist/index.html"))
    });

}
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Question = mongoose.model("Question");
var User = mongoose.model("User");

module.exports = {

    addQuestion: function(req, res){
            var question = new Question({
                imgurl: req.body.imgurl,
                title: req.body.title,
                description: req.body.description,
                location: req.body.location,
                _user: req.session.userId
            });
            question.save().then((question)=>{
                User.update({_id: req.session.userId}, {$push: {questions: question}}, function(err, user)
                {
                    if(err)
                    {
                        console.log("There were errors tying the question to the user...");
                    }
                    else
                    {
                        console.log("Question successfully tied to user!");
                    }
                });
                console.log(`Successfully saved ${question.title}...`);
                res.json(question);
                console.log("After res.json, before redirect...");
            }).catch((err)=>{
                res.status(500);
                console.log("Inside the .catch");
                console.log(err);
                res.json(err);
            })
    },

    getAllQuestions: function(req, res){
        Question.find()
            .exec((err, allquestions)=>{
                if(err){
                    console.log("No questions found")
                }
                else
                {
                console.log("All Questions: " + allquestions)
                res.json(allquestions)
                }})
    },

    getMyQuestions: function(req, res){
        Question.find({_user: req.body.userId})
            .exec((err, myquestions)=>{
                if(err){
                    console.log("No myquestions found")
                }
                else
                {
                console.log("All users questions: " + myquestions)
                res.json(myquestions)
                }})
    },

    removequestion: function(req, res){
        console.log("Inside removequestion method in Express Controller", req.body.questionid);
        Question.remove({_id: req.body.questionid})
        .then(question => {res.json(true);})
        .catch(err => console.log("We didnt remove the question" + err))

    },
    updateQuestion: function(req, res){
        console.log("Inside update question controller");
        console.log(req.body)
        Question.findOne({_id: req.body.question._id})
            .then((question)=> {
                question.title = req.body.question.title
                question.location = req.body.question.location
                question.description = req.body.question.description
                question.save()
            })
            .then(() =>{res.json(true)})
            .catch((err) => {console.log(err)})
    },

    logout: function(req, res)
    {
        req.session.destroy();
        res.redirect('/');
    }


}
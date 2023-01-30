const router = require('express').Router();
let Question = require('../model/question.model');


//recieve data
router.route("/").get((req,res)=>{
    Question.find()
    .then(Questions=>res.json(Questions))
    .catch((error) => {
        console.log(error); 
      });
})

//add data

router.route("/add").post((req, res)=>{
    const question = req.body.question;

    const newQ = new Question ({question})
    newQ.save()
    .then(()=>res.json("Question Added"))
    .catch((error) => {
        console.log(error); 
      });
})

// delete data

router.route('/:id').delete((req, res)=>{
    Question.findByIdAndDelete(req.params.id)
    .then(()=>res.json("Question deleted!"))
    .catch((error) => {
        console.log(error); 
      });
})

//update

router.route('/update/:id').post((req, res)=>{
    Question.findById(req.params.id)
    .then(Question=>{
        Question = req.body;
        Question.save()
        .then(()=>res.json("User updated"))
        .catch((error) => {
            console.log(error); 
          });
    })
    .catch((error) => {
        console.log(error); 
      });
})

module.exports = router;



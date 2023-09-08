const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz')

/* GET home page. */
router.get('/', (req, res, next) => {
  const show = !req.session.vote
  Quiz.find({})
  .then(data => {
    let sum = 0
    data.forEach(elem => {
      sum += elem.vote
    })
    res.render('quiz', { title: 'Quiz', data, show, sum })
  }).catch(err => console.log(err))
});

router.post('/', (req, res) => {
  const id = req.body.quiz
  Quiz.findOne({_id: id}).then(item => {
    item.vote = item.vote + 1
    item.save()
  }).then(()=>{
    req.session.vote = 1
    res.redirect('/quiz')
  }).catch(err => console.log(err))
});

module.exports = router;

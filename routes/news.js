const express = require('express');
const router = express.Router();
const News = require('../models/news');

async function getNews(search) {
  let news = {}
  if(search){
    news = await News.find({title: new RegExp(search.trim(), 'i')}).sort({created: -1});
  }else{
    news = await News.find({}).sort({created: -1});
  }
  return news;
}
router.get('/', (req, res) => {
  const {search} = req.query
  getNews(search).then(function(data){
    res.render('news', { title: 'News', data, search });
  });
});

module.exports = router;

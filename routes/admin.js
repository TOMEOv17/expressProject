const express = require('express');
const router = express.Router();
const News = require('../models/news')

router.all('*', (req, res, next) => {
  if(!req.session.admin){
    res.redirect('/login')
    return
  }

  next()
})


async function getNews() {
  const news = await News.find({});
  return news;
}
router.get('/', (req, res) => {
  getNews().then(function(data){
    res.render('admin/index', { title: 'Admin', data });
  });
});



router.get('/news/add', (req, res, next) => {
  res.render('admin/news_form', { title: 'Dodaj newsa' });
});

router.post('/news/add', (req, res) => {
  const body = req.body

  const newsData = new News(body)

  const errors = newsData.validateSync()

  newsData.save()
  res.redirect('/admin')
  res.render('admin/news_form', { title: 'Formularz', errors });
})

async function delNews(id) {
  await News.findByIdAndDelete(id)
}
router.get('/news/delete/:id', (req, res) => {
  delNews(req.params.id)
  res.redirect('/admin')
});

module.exports = router;

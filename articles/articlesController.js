const express = require('express')
const router = express.Router()

router.get('/articles', (req, res) => {
    res.render('articles')
})

router.get('/admin/articles/new', (req, res) => {
    res.send('Admin/articles/New')
})

module.exports = router
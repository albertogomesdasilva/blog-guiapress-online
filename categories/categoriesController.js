const express = require('express')
const router = express.Router()
const Category = require('./Category')
const slugify = require('slugify')

router.get("/admin/categories/new", (req, res) => {
    const url = req.url.replace(/\//g, '-')   // Remove todas as barras
    // const url = slugify(req.url) // Remove os espaços e junta tudo
    res.render('admin/categories/new', { url: url })
})

router.post("/categories/save", (req, res) => {
    var title = req.body.title
    if(title != undefined) {
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect('/')
        })
    }else{
        res.redirect('/admin/categories/new')
    }
})

router.get('/categories', (req, res) => {
    res.render('categories')
})

router.get('/admin/categories/new', (req, res) => {
    res.send('Admin/categories/New')
})

module.exports = router
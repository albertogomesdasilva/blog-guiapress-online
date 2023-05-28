const express = require('express')
const router = express.Router()
const Category = require('./Category')
const slugify = require('slugify')
var moment = require('moment')

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
            slug: slugify(title).toLowerCase()
        }).then(() => {
            res.redirect('/admin/categories')
        })
    }else{
        res.redirect('/admin/categories/new')
    }
})

router.get('/categories', (req, res) => {
    res.render('categories')
})

router.get('/admin/categories/new', (req, res) => {
    res.send('Admin/Categories/New')  // aqui só exibe o texto
})

router.get("/admin/categories", (req, res) => {
    const url = req.url.replace(/\//g, '-')   // Remove todas as barras
    // const url = slugify(req.url) // Remove os espaços e junta tudo
    Category.findAll().then(categories => {
        res.render('admin/categories/index', { url: url, categories: categories, moment: moment })

    })

    // ROTA DELETE
    router.post("/categories/delete", (req, res) => {
        var id = req.body.id
        if(id != undefined) {
            if(!isNaN(id)) {

                Category.destroy({
                    where: {
                        id: id
                    }
                }).then(() => {
                    res.redirect('/admin/categories')
                })
            }else{
                res.redirect('/admin/categories')
            }
        }else {
            res.redirect('/admin/categories')
        }
    })

    router.get('/admin/categories/edit/:id',(req, res) => {
        var id = req.params.id
        // if(!isNaN(id)) {
        //     res.redirect('/admin/categories')
        // }
        Category.findByPk(id).then(category => {
            if(category != undefined) {
                res.render('admin/categories/edit', { category: category})
            }else{
                res.redirect('/admin/categories')
            }
        }).catch(erro => {
            res.redirect('/admin/categories')
        })
    })

    router.post("/categories/update", (req, res) => {
        var id = req.body.id
        var title = req.body.title
        
        
        
        if(title != undefined) {
            Category.update({
                title: title,
                slug: slugify(title).toLowerCase(),
            },{
                where: {
                    id: id
                }
            }
                        
            ).then(() => {
                res.redirect('/admin/categories')
            })
        }else{
            res.redirect('/admin/categories/new')
        }
    })
    

})

module.exports = router
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

const categoriesController = require('./categories/categoriesController')
const articlesController = require('./articles/articlesController')


// Importar os Models
const Article = require('./articles/Article')
const Category = require('./categories/Category')


//Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

// Estou dizendo para o Express usar o EJS como View engine
app.set('view engine','ejs');
app.use(express.static('public'));
// Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Importando o arquivo de Rotas
app.use('/', categoriesController)
app.use('/', articlesController)

// Rotas
app.get("/",(req, res) => {
    res.render("index");
})


app.listen(8000,()=>{console.log("App rodando na porta 8000!");})
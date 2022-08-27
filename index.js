require('dotenv').config()

const express = require('express')
const app = express()



const router = express.Router()

const mongoose = require('mongoose')
const { deleteOne } = require('./models/Todo')
mongoose.connect(process.env.DB_URL)

.then(()=>{console.log("connected")})
.catch((e)=>{console.log(e)})

const Todo =require('./models/Todo')

app.use(express.json())
app.use(express.static('static'))
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))



app.get('/',async(req,res)=>{
    let data = await Todo.find()
    res.render('home',{data})    
})

app.post('/',async(req,res)=>{
    let id = Date.now()
    let {text} = req.body
    console.log(text)
    await Todo.create({id:id,text:text})

    res.redirect('/')
})
app.get('/delete/:a',async(req,res)=>{
    let id = req.params.a
    console.log(id)
    await Todo.deleteOne({id:id})

    res.redirect('/')
})
app.post('/update/:a',async(req,res)=>{
    let id = req.params.a
    let {text} = req.body
    const d = await Todo.findOne({id:id})
    d.text = text 
    d.save()
    console.log(d)


    res.redirect('/')
})




app.listen(process.env.PORT)
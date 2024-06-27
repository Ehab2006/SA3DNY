//ServerModule
const express = require('express')
const app = express()
const path = require('path')

let Url = "https://sa3dny.onrender.com"

app.use(express.json());
const cors = require('cors')
let corsOptions = { 
    origin : [Url], 
}


   
 app.use(cors(corsOptions))

//DataBaseModule
const Data = require("./database")

const { auth , requiresAuth  } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'UAsf_FPrmm0TwOzOqvGy6opsZy_vEEYqSazACIksQqd2iyrZNVT9Q0ZAgI91NUBA',
  baseURL: 'https://sa3dny.onrender.com',
  clientID: 'Z0PMtBkK7GPZA8LSdw13AHTkrxanfrsw',
  issuerBaseURL: 'https://dev-gs3esnediwuf4xzz.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/state', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

app.use(express.static(path.join(__dirname , './build')))

app.get('/' , (req , res)=>{
    try{
        res.sendFile(path.join(__dirname , './build' , 'index.html'))
    }catch(err){
        res.send(err)
    }   
})
app.get('/form' , (req , res)=>{
    try{
        res.sendFile(path.join(__dirname , './build' , 'index.html'))
    }catch(err){
        res.send(err)
    }   
})

app.get('/items' ,requiresAuth(), async (req , res)=>{
    try{
        const allData = await Data.find()
        res.json(allData)
    }catch(err){
        res.send(err)
    }   
})
app.post('/items' ,requiresAuth(), async(req , res)=>{
    try{
        const newItem = new Data()

        const Name = req.body.Name
        const HighPrice = req.body.HighPrice
        const LowPrice = req.body.LowPrice
        const Qr = req.body.Qr

    
        newItem.Name = Name
        newItem.HighPrice = HighPrice
        newItem.LowPrice = LowPrice
        newItem.Qr = Qr
    
        await newItem.save()
        res.json(newItem)
    }catch(err){
        res.send(err)
    }
})
app.get('/item/:id' ,requiresAuth(), async(req , res)=>{
    try{
        const id = req.params.id

        const item = await Data.findOne({Qr: id})

        res.json(item)
    }catch(err){
        res.send(err)
    }

})
app.put('/item/:id' ,requiresAuth(), async(req , res)=>{
    try{
        const id = req.params.id

        const Name = req.body.Name
        const HighPrice = req.body.HighPrice
        const LowPrice = req.body.LowPrice
        const Qr = req.body.Qr
    
        const message = await Data.findOneAndUpdate({Qr : id} , {
            Name : Name ,
            HighPrice : HighPrice , 
            LowPrice : LowPrice
        })
    
        res.json(message)
    }catch(err){
        res.send(err)
    }
})
app.delete('/item/:id' ,requiresAuth(), async(req , res)=>{
    try{
        const id = req.params.id

        const item = await Data.findOneAndDelete({Qr : id})

        res.json(item)
    }catch(err){
        res.send(err)
    }
})

app.listen(Url | 5000 , ()=>{
    console.log("Server is running !")
})


const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://HOoBs:HOoBs@hoobs.pgvx1or.mongodb.net/?retryWrites=true&w=majority&appName=HOoBs").then(() => console.log('DataBase is running !')).catch((err)=>{
    console.log("DataBase isn't running !")
})

const Schema = mongoose.Schema;

const Products =  new Schema({
    Name : String,
    HighPrice : Number,
    LowPrice : Number,
    Qr : Number
})

const Messages = mongoose.model('Product', Products);
module.exports = Messages
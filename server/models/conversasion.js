const mongoose = require('../config/connectDB');
const Schema = mongoose.Schema;


const ConversationSchema = new Schema({
    idUser : String,
    nameCOnversation : String,
    lastMessage : String,
    createAt : {
        type : Number,
        default : Date.now,
    },   
},{
    collection : 'conversation'
});



const ConversatioinModel = mongoose.model('conversation',ConversationSchema);
module.exports = ConversatioinModel;


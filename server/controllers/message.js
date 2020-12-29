

const MessageModel = require('../models/message');
const ConversitionModel = require('../models/conversasion');


module.exports = {
    // lấy tin nhắn theo conversation

    getMessageByConversation : (req,res)=>{
        ConversitionModel.findOne({
            $or : [
                {idUser : req.query.idUser},
                {_id: req.query.idConversation},
            ]
        }).then( (user)=>{
            if(!user){
                console.log('chua co convesation');
                return;
            }else{
                MessageModel.find({
                    idConversation : user._id,
                }).populate('idConversation').exec( (err,message)=>{
                    if(!message){
                        return res.status(400).json({
                            message : 'that bai',
                        })
                    }else{
                        return res.status(200).json({
                            messageList : message,
                        })
                    }
                } )
            }
        } )

    },
    postSaveMessage : (req,res)=>{
        const {
            idConversation,
            sender,
            message
        }= req.body;
        const messagee = new MessageModel({
            sender,
            message,
            idConversation
        });
        messagee.save()
                .then( result =>{
                    res.status(201).json({
                        data : result,
                    })
                } )
                .catch(err=>{
                    res.status(500).json({
                        error : err,
                    })
                })
    }
}


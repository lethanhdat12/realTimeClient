

const express = require('express');
const router = express.Router();
const {getMessageByConversation , postSaveMessage} = require('../controllers/message');

//tạo router cho phương thức lấy tin nhắn
router.get('/',getMessageByConversation);


//tạo router cho phương thức lưu tin nhắn
router.post('/',postSaveMessage);


module.exports = router;


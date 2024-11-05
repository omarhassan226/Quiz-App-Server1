const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnnouncementSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    subject:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model('Announcements', AnnouncementSchema);

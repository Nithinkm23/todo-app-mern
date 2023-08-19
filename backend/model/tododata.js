const mongoose = require('mongoose');
const todoSchema = mongoose.Schema({
    
    eventname: {
        type: String,
        required: true,
        
    },
    status: {
        type: String,
        required: true,
        enum: ['COMPLETED', 'ONGOING']
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});
const todoModel = mongoose.model('todolist', todoSchema);
module.exports = todoModel;
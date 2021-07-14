const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const Todo = mongoose.model('Todo', toDoSchema);

exports.ToDo = Todo;
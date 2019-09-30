const mongoose = require('mongoose');

var formSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    email: {
        type: String,
    },
    form: {
        type: String,
    },
});

module.exports = mongoose.model('Forms', formSchema);
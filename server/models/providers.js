const mongoose = require('mongoose');

const providerSchema = mongoose.Schema({
    name: { type: String }
},
{ versionKey: false });

module.exports = mongoose.model('providers', providerSchema);
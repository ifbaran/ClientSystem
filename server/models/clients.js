const mongoose = require('mongoose');
const Schema = mongoose.Schema;
Schema.versionKey = false;

const clientSchema = new mongoose.Schema({
    clientId : { type : Number },
    clientName: { type: String },
    clientEmail: { type: String },
    clientPhone: { type: String },
    providers:[{   
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'providers' 
    }]
}, { versionKey : false });

module.exports = mongoose.model('clients', clientSchema);
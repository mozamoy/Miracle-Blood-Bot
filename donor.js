var mongoose = require('mongoose');
//Defining Schema
var donorSchema = mongoose.Schema({


    name: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },

    mobile: {
        type: String,
        required: true
    },
     altmobile: {
        type: String,
        required: true
    },
    
    bloodgroup: {
        type: String,
        required: true
    }

   
});

var donor= module.exports = mongoose.model('donor', donorSchema); //Binding schema 

module.exports.addDonor= function(data, callback) {
    donor.create(data, callback);
}
module.exports.getDonorByField = function(ret, callback) {
    donor.find({name:ret}, callback);
}
module.exports.updateProduct = function(name, data, options, callback) {
    var query = {
        name: name
    };
    var update = {
        name: data.name,
        type: data.type,
        cost: data.cost,
        supplier: data.supplier,
        avail: data.avail
    }
    donor.findOneAndUpdate(query, update, options, callback);
}
module.exports.removeDonor = function (name, callback) {
    var query = {
        name: name
    };
    donor.remove(query, callback);
}
module.exports.getDonorDetails = function(callback) {
    donor.find(callback);
}


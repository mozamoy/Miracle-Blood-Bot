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
    },
    id: {
        type: String,
        required: true
    }
    

   
});

var donor= module.exports = mongoose.model('donor', donorSchema); //Binding schema 

module.exports.addDonor= function(data, callback) {
    donor.create(data, callback);
}
module.exports.getDonorByField = function(ret, callback) {
    donor.find({id:ret}, callback);
}
module.exports.updateDonorData = function(name, data, options, callback) {
    var query = {
        id: id
    };
    var update = {
         name:data.name,
              gender:data.gender,
              location:data.location,
              age:data.age,
              mobile:data.mobile,
              altmobile:data.altmobile,
              bloodgroup:data.bloodgroup,
              id:data.sender
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


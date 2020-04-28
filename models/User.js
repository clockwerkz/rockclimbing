const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required : true,
        unique : true
    },
    password: {
        type: String,
        required : true
    },
    climbRating: {
        type: String
    },
    desiredLocations: {
        type: [Number]
    },
    desiredTripDates: {
        type: [String]
    },
    token: {
        type: String
    }
});


const User = mongoose.model('user', UserSchema);

module.exports = User;




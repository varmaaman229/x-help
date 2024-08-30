const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FreelancerSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        minlength: [1, 'Username must be at least 1 character long'],
        maxlength: [50, 'Username must be at most 50 characters long']
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [1, 'Name must be at least 1 character long'],
        maxlength: [50, 'Name must be at most 50 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email is not valid'],
        maxlength: [100, 'Email must be at most 100 characters long']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        maxlength: [128, 'Password must be at most 128 characters long'],
        select: false
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [1, 'Description must be at least 1 character long']
    },
    image: {
        type: String, // Save the image as a base64-encoded string
        required: false
    },
    skills: [{ type: String }],
    portfolio: [{ type: String }]
});

module.exports = mongoose.models.Freelancer || mongoose.model('Freelancer', FreelancerSchema);

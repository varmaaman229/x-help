const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Job title is required'],
        trim: true,
        minlength: [1, 'Job title must be at least 1 character long'],
        maxlength: [100, 'Job title must be at most 100 characters long']
    },
    description: {
        type: String,
        required: [true, 'Job description is required'],
        minlength: [1, 'Job description must be at least 1 character long']
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true,
        minlength: [1, 'Location must be at least 1 character long'],
        maxlength: [100, 'Location must be at most 100 characters long']
    },
    salary: {
        type: String,
        required: [true, 'Salary is required'],
        trim: true,
        minlength: [1, 'Salary must be at least 1 character long'],
        maxlength: [50, 'Salary must be at most 50 characters long']
    },
    companyLogo: { // New field for company logo URL
        type: String,
        required: [true, 'Company logo URL is required']
    },
   jobType: {
        type: String,
        enum: ['Full-Time', 'Part-Time', 'Remote'], // Define valid enum values
        required: [true, 'Job type is required']
    },
    company: { // New field for company name
        type: String,
        required: [true, 'Company name is required'],
        trim: true,
        minlength: [1, 'Company name must be at least 1 character long'],
        maxlength: [100, 'Company name must be at most 100 characters long']
    },
    applicationDeadline: { // New field for application deadline
        type: Date,
        required: [true, 'Application deadline is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.models.Job || mongoose.model('Job', JobSchema);

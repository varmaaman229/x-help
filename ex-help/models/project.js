// models/Project.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minlength: [1, 'Title must be at least 1 character long'],
        maxlength: [100, 'Title must be at most 100 characters long']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [1, 'Description must be at least 1 character long']
    },
    pdf: {
        type: String,
        required: [true, 'PDF file is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Web Development', 'Mobile Development', 'Data Science', 'Machine Learning', 'Others'], // Example categories
        default: 'Others' // Default category if none is provided
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

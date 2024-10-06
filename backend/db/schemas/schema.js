const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    body: String,
    subBody: String,
    date: { type: Date, default: Date.now },
    image: String,
})
module.exports.blogSchema = blogSchema
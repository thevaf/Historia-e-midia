const mongoose = require('mongoose');
const { blogSchema } = require('./schemas/schema');
mongoose.connect('mongodb+srv://xaulim:xaulim@xaulim.ei81iec.mongodb.net/?retryWrites=true&w=majority&appName=Xaulim');

const blog = mongoose.model("blog", blogSchema)
module.exports.blog = blog
const mongoose = require('mongoose');

const TweetSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
    content: String,
    imageUrl: {type: String},
    createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Tweet', TweetSchema);
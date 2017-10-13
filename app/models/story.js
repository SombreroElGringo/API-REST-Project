const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
   title: String
}, { timestamps: true });

const Story = mongoose.model('Story', storySchema);

module.exports = Story;

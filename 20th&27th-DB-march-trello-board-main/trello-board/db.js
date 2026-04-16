const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/my-app');

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
})

const ogranizationSchema = new mongoose.Schema({
    title: String,
    description: String,
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

const boardSchema = new mongoose.Schema({
    title: String,
    organizationId: {type: mongoose.Schema.Types.ObjectId, ref: 'Organization'}
})

const issueSchema = new mongoose.Schema({
    title: String,
    boardId: {type: mongoose.Schema.Types.ObjectId, ref: 'Board'}
})

const User = mongoose.model("User", userSchema);
const Organization = mongoose.model("Organization", ogranizationSchema);
const Board = mongoose.model("Board", boardSchema);
const Issue = mongoose.model("Issue", issueSchema);

module.exports = {User, Organization, Board, Issue}
'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const Schema = mongoose.Schema

const UserSchema = Schema({
    name: String,
    surname: String,
    nick: String,
    email: String,
    password: String,
    role: String,
    picture: String,
    signupDate: { type: Date, default: Date.now()}
})

module.exports = mongoose.model('User', UserSchema)
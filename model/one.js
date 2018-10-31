const mongoose = require('mongoose')

const one = new mongoose.Schema({
    _id: '',
    parentId: "",
    to: '用户id',
    userId: "",
    isParent: '',
    title: '',
    content: ''
})
'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, required: [true, 'Task name is required'] },
  type: { type: String, maxlength: [50, 'Only 50 characters or less is allowed'] },
  options: {type : Object},
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('design', schema);

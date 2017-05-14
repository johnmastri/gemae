'use strict';

const mongoose = require('mongoose');

const option_values_schema = new mongoose.Schema({
        isOpen: {
            type: Boolean
        }
    },{
        strict: false
    }
)

const schema = new mongoose.Schema({
  name: { type: String, required: [true, 'Task name is required'] },
  type: { type: String, maxlength: [50, 'Only 50 characters or less is allowed'] },
  option_values: option_values_schema,//{type : Object},
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  local_id: { type: String },
  position: {type : Object},
  type : {type: String},
  //isOpen : {type : Boolean}
});

module.exports = mongoose.model('design', schema);

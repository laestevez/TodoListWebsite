const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
    trim: true
  },
  items: {
    type: [String],
    required: true,
    validate(value) {
      if (value.length < 1) throw new Error("List cannot be empty.");
    }
  },
  image: {
    type: String
  },
  userUuid: {
    type: String,
    required: true
  },
  priority: {
    type: [String],
    required: true,
    trim: true,
    validate(value) {
      if (value.length < 1) throw new Error("Invalid Task.");
    }
  },
  status: {
    type: [String],
    required: true,
    trim: true,
    validate(value) {
      if (value.length < 1) throw new Error("Invalid Task.");
    }
  },
}, {collection : 'tasks_list'});

//const List = mongoose.model("List", ListSchema);

module.exports = ListSchema;

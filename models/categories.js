const { Schema, model } = require("mongoose");

const CategoriesSchema = Schema({
  name: {
    type: String,
    required: [true, "rol is required"],
    unique: true
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

module.exports = model("Categories", CategoriesSchema);

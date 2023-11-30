const { Schema, model } = require("mongoose");

const RolSchema = Schema({
    rol:{
        type: String,
        required:[true, "rol is required"]
    }
})

module.exports = model("Roles", RolSchema)
const Role = require("../models/role");
const Users = require("../models/user");
const rolValidateDb = async(rol ="")=>{
    const existRol = await Role.findOne({rol});
    if(!existRol){
        throw new Error(`Rol ${rol} does not exist`);
    }
    return true
}

const emailExist = async(email = "")=>{
    const emailResult = await Users.findOne({email});
    if(emailResult){
        throw new Error(`Email ${email} already exists`);
    }
}

const existUserById = async(id)=>{
    const existUser = await Users.findById(id);
    if(!existUser){
        throw new Error(`User ${id} does not exist`);
    }    
}

const collectionsPermited = async(collection="", collections =[])=>{
    const included = collections.includes(collection);
    if(!included){
        throw new Error(`The collection ${collection} is restricted, only: ${collections}`);
    }

    return true;
}

module.exports ={
    rolValidateDb,
    emailExist,
    existUserById,
    collectionsPermited
}
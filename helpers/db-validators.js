const Role = require("../models/role");
const rolValidateDb = async(rol ="")=>{
    const existRol = await Role.findOne({rol});
    if(!existRol){
        throw new Error(`Rol ${rol} does not exist`);
    }
    return true
}




module.exports ={
    rolValidateDb
}
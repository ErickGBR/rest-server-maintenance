const path = require("path");
const { uuid: uuidv4 } = require('uuidv4');
const { response } = require("express");

const uploadFile = async (req, res = response) => {
  // create a new product
  try {    
    
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    // The name of the input field (i.e. "file") is used to retrieve the uploaded file
    const { file } = req.files;
    const extension = file.name.split(".")[1];
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    if(!validExtensions.includes(extension)) {
      return res.status(400).send({
        msg: `Extention file is not valid ${extension}`
      })
    }

    const tempName = `${uuidv4()}.${extension}`;
    uploadPath = path.join(__dirname, '../uploads/' + tempName)
    // Use the mv() method to place the file somewhere on your server
    file.mv(uploadPath, function (err) {
      if (err)
        return res.status(500).send({err});
    });

    return res.status(201).json({ msg: " file uploaded " });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

module.exports = {
  uploadFile
};

const path = require("path");
const { uuid: uuidv4 } = require('uuidv4');

const uploadFile = (files, validExtensions = ['jpg', 'jpeg', 'png', 'gif'], folder = "") => {
  return new Promise((resolve, reject) => {
    // The name of the input field (i.e. "file") is used to retrieve the uploaded file
    const { file } = files;
    const extension = file.name.split(".")[1];

    if (!validExtensions.includes(extension)) {
      reject(`Extention file is not valid - ${extension}`)
    }
    const tempName = `${uuidv4()}.${extension}`;
    const uploadPath = path.join(__dirname, '../uploads/' + folder + tempName)
    // Use the mv() method to place the file somewhere on your server
    file.mv(uploadPath, function (err) {
      if (err)
        reject(err)
    });
    resolve(tempName)

  })
}

module.exports = {
  uploadFile
};
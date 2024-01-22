const { response } = require("express");

const allowCollections = ["categories", "products", "users", "roles"];

const searchUsers = async(term ="", res = response)=>{

}

const search = async (req, res = response) => {
  try {
    const { collection, term } = req.params;

    if (!allowCollections.includes(collection)) {
      return res.status(400).json({
        status: false,
        msg: "Collection not allowed" + allowCollections,
      });
    }

    switch (collection) {
        case "users":

        break;

        case "roles":

        break;

        case "products":

        break;

        default:
            res.status(500).json({
                status: false,
                msg: "Error with the collection",
            })
    }

    res.status(200).json({
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      msg: "GET API - controller",
      error,
    });
  }
};

module.exports = {
  search,
};

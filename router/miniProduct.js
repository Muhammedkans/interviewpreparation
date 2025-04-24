const express = require("express");
const { postMiniProduct,getMiniProduct,updateMiniProduct } = require("../controller/miniProductController");

const miniProductRouter = express.Router();


miniProductRouter.post("/miniproduct",postMiniProduct);
miniProductRouter.get("/miniproduct",getMiniProduct);
miniProductRouter.put("/miniproduct/:id",updateMiniProduct);

module.exports = miniProductRouter;
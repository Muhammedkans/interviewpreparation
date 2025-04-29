const express = require("express");
const { rejisterUser, loginUser, UserAuth, getUser } = require("../controller/userContoller");


const userRouter = express.Router();

userRouter.post("/user/register", rejisterUser);
userRouter.post("/user/login", loginUser);
userRouter.get("/me",UserAuth,getUser);



module.exports = userRouter;



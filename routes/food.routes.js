import express from "express";
import { addFood, deleteFood, getAllFood, getSingleFood, updateFood } from "../controllers/food.controller.js";

// MULTER UPLOAD 
import upload from "../middleware/multer.js";

const router = express.Router();


router.route("/add").post(upload.single("image_url"),addFood)
router.route("/all").get(getAllFood)
router.route("/delete/:id").delete(deleteFood)
router.route("/update/:id").put(upload.single("image_url"),updateFood)
router .route("/:id").get(getSingleFood);



export default router;
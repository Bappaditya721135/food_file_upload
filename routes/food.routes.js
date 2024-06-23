import express from "express";
import { addFood } from "../controllers/food.controller.js";

const router = express.Router();



router.route("/add").post(addFood)



export default router;
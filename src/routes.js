import express from "express";
import multer from "multer";
import { uploadCSV, listProducts, searchProducts } from "./controllers.js";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/upload", upload.single("file"), uploadCSV);
router.get("/products", listProducts);
router.get("/products/search", searchProducts);

export default router;

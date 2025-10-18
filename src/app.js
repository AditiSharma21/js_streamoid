import express from "express";
import router from "./routes.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));

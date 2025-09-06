import express from "express";
import cookieParser from "cookie-parser";
import router from "./src/routes/api.js";
import rateLimit from "express-rate-limit";

const app = express();
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

import cors from "cors";

app.use(cors()); 


// ✅ Cookie parser
app.use(cookieParser());

// ✅ Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);


app.use("/api/v1", router);

export default app;

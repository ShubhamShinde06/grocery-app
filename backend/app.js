import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: [process.env.FRONTEND_URL, process.env.FRONTEND_SHOPKEEPER_URL]
  
  })
);

import shopkeeperRouter from "./routes/shopkeeper.routes.js";
app.use("/api/auth/shopkeeper", shopkeeperRouter);

import userRouter from "./routes/user.routes.js";
app.use("/api/auth/user", userRouter);

import categoryRouter from "./routes/category.routes.js";
app.use("/api/category", categoryRouter);

import subCategoryRouter from "./routes/subCategory.routes.js";
app.use("/api/subcategory", subCategoryRouter);

import productRouter from "./routes/product.routes.js";
app.use("/api/product", productRouter);

import cartRouter from "./routes/cart.routes.js";
app.use("/api/cart", cartRouter);

import orderRouter from "./routes/order.routes.js";
app.use("/api/order", orderRouter);

export default app;

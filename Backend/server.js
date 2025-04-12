import path from "path";
import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import workRoutes from "./routes/work.routes.js";
import csrRoutes from "./routes/csr.routes.js";
import connectToMongoDB from "./DB/connectToMongoDB.js";
import { ExpressAuth } from "@auth/express"
import Google from "@auth/core/providers/google";

config();
const __dirname = path.resolve();
const PORT = process.env.PORT || 8000;

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static(path.join(__dirname, "frontend", "dist")));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/work", workRoutes);
app.use("/api/csr", csrRoutes);

// Auth with Google using @auth/express
app.use("/auth", ExpressAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'openid profile email', // Request necessary scopes
        },
      },
    }),
  ],
  secret: process.env.AUTH_SECRET, // Required secret for signing tokens
}));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
})

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server running on port ${PORT}`);
});

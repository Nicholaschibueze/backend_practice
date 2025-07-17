import express from "express";
 import {createBlog, getBlogs} from "../controller/blog.controller.js";

 const router = express.Router();

    router.post("/", createBlog);

    router.get("/", getBlogs);

    export default router;
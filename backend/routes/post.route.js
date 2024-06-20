import express from "express";
import prisma from "../lib/prisma.js";
import { getKindergardenPosts, getPost, getSchoolPosts, getSocialChildPosts, getSocialTeenagerPosts, savedPost } from "../controllers/post.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();



router.get("/school", getSchoolPosts);
router.get("/school/:id", getPost);
router.get("/kindergarden", getKindergardenPosts);
router.get("/kindergarden/:id", getPost);
router.get("/social-child", getSocialChildPosts);
router.get("/social-child/:id", getPost);
router.get("/social-teenager", getSocialTeenagerPosts);
router.get("/social-teenager/:id", getPost);
router.get("/savedPosts", savedPost)


export default router;
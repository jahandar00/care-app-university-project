import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const savedPost = async (req, res) => {
    const token = req.cookies.token;
    let userId;

    if (!token) {
        userId = null
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) {
            userId = null
        }
        userId = payload.id
    })

    const saved = await prisma.savedPost.findMany({ 
        where: {
            userId
        },
        include: {
            post: true,
        }
    })
    if (saved) {
        res.status(200).json({ ...saved, isSaved: true })
    }
    res.end();
}

export const getPost = async (req, res) => {
    const id = req.params.id;
    let userId;
    try {
        const post = await prisma.post.findUnique({
            where: { id }
        });

        const token = req.cookies.token;
        if (!token) {
            userId = null
        }
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
            if (err) {
                userId = null
            }
            userId = payload.id
        })

        const saved = await prisma.savedPost.findUnique({
            where: {
                userId_postId: {
                    postId: id,
                    userId
                }
            }
        })
        res.status(200).json({ ...post, isSaved: saved ? true : false })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "failed to get post" });
    }
}

export const getSchoolPosts = async (req, res) => {
    try {
        const post = await prisma.post.findMany({
            where: {
                typeOf: "school"
            }
        });
        res.status(200).json(post)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "failed to get post" })
    }
}

export const getKindergardenPosts = async (req, res) => {
    try {
        const post = await prisma.post.findMany({
            where: {
                typeOf: "kindergarden"
            }
        });
        res.status(200).json(post)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "failed to get users" })
    }
}


export const getSocialChildPosts = async (req, res) => {
    try {
        const post = await prisma.post.findMany({
            where: {
                typeOf: "child"
            }
        });
        res.status(200).json(post)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "failed to get users" })
    }
}


export const getSocialTeenagerPosts = async (req, res) => {
    try {
        const post = await prisma.post.findMany({
            where: {
                typeOf: "teenager"
            }
        });
        res.status(200).json(post)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "failed to get users" })
    }
}


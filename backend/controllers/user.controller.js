import { json } from "express";
import prisma from "../lib/prisma.js"
import bcrypt from "bcrypt"

export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "failed to get users" })
    }
}


export const getUser = async (req, res) => {
    const id = req.params.id
    try {
        const user = await prisma.user.findUnique({
            where: { id }
        })
        res.status(200).json(user)

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "failed to get user" })
    }
}



export const updateUser = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    const { password, avatar, ...inputs } = req.body

    // console.log(id)
    // console.log(tokenUserId)
    // console.log(body)
    if (id !== tokenUserId) {
        return res.status(403).json({ message: "Not authorized" })
    }

    let updatedPassword = null
    try {
        if (password) {
            updatedPassword = await bcrypt.hash(password, 10)
        }
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                ...inputs,
                ...(updatedPassword && { password: updatedPassword }),
                ...(avatar && { avatar })
            }
        })

        const { password: userPassword, ...rest } = updatedUser
        res.status(200).json(rest)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "failed to update user" })
    }
}




export const deleteUsers = async (req, res) => {
    const current_id = req.params.id;
    const tokenUserId = req.userId;

    if (current_id != tokenUserId) {
        return res.status(403).json({ message: "Not authorized" })
    }
    try {
        await prisma.savedPost.deleteMany({
            where: { userId: current_id }
        });
        
        await prisma.user.delete({
            where: { id: current_id }
        })
        res.status(200).json({ message: "user deleted" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "failed to delete user" })
    }
}

export const savePost = async (req, res) => {
    const currentPostId = req.body.postId;
    const tokenUserId = req.userId;

    try {
        // Check if the post is already saved
        const savedPost = await prisma.savedPost.findUnique({
            where: {
                userId_postId: {
                    userId: tokenUserId,
                    postId: currentPostId
                }
            }
        });

        if (savedPost) {
            // If it exists, delete it
            await prisma.savedPost.delete({
                where: {
                    userId_postId: {
                        userId: tokenUserId,
                        postId: currentPostId
                    }
                }
            });
            res.status(200).json({ message: "post removed" });
        } else {
            const saved = await prisma.savedPost.findMany({
                where: {
                    userId: tokenUserId
                },
                include: {
                    post: true,
                }
            })
            if (saved.length > 0) {
                res.status(403).json({ message: "You cannot save more than one post!" })
            } else {
                await prisma.savedPost.create({
                    data: {
                        userId: tokenUserId,
                        postId: currentPostId
                    }
                });
                res.status(200).json({ message: "post saved" });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "failed to save and unsave post" });
    }
}





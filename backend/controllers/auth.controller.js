import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
    const { username, email, password, street, plz } = req.body;
    try {
        // //HASH THE PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        //CREATE NEW USER AND SAVE TO DB

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                street,
                plz,
                password: hashedPassword
            }
        })

        res.status(201).json({ message: "Created Successfully" })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to create user" })
    }

}

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // if the user exists or not
        const user = await prisma.user.findUnique({
            where: { username: username },
        });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        // if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

        // generate cookie token and send to the user
        const age = 1000 * 60 * 60 * 24 * 7;

        const token = jwt.sign(
            {
                id: user.id,
                isAdmin: true
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: age }
        );

        const { password: userPassword, ...userInfo } = user

        res.cookie("token", token, {
            // httpOnly: true,
            maxAge: age,
        }).status(200)
            .json(userInfo)

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to login" });
    }
};


export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({ message: "Logout Successful" })
} 
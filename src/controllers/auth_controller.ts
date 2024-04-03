import { Request, Response, NextFunction } from "express";
import User from "../models/user_model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    if (email === undefined || password === undefined) {
        return res.status(400).send("Email and password are required");
    }
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).send("User already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({ email: email, password: hashedPassword });
        return res.send(newUser);
    } catch (err) {
        return res.status(400).send(err.message);
    }
}

const login = async (req: Request, res: Response) => {
    // get email & pwd
    const email = req.body.email;
    const password = req.body.password;
    if (email === undefined || password === undefined) {
        return res.status(400).send("Email and password are required");
    }

    // get user from DB
    try {
        const user = await User.findOne({ email: email });
        if (user == null) {
            return res.status(400).send("User doesnot exists");
        }
        // compare pwd
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("Invalid credentials");
        }
        // generate token
        const token = jwt.sign({ "_id": user._id }, process.env.TOKEN_SECRET, { expiresIn: "1h" });
        return res.status(200).send({ "token": token });
    } catch (err) {
        return res.status(400).send(err.message);
    }
}

const logout = async (req: Request, res: Response) => {
    res.send("logout");
}

export type AuthRequest = Request & { user: { _id: string } };

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, data: jwt.JwtPayload) => {
        if (err) {
            return res.sendStatus(401);
        }
        const id = data._id;
        req.user = { _id: id };
        return next();
    });// as { _id: string };


}



export default { register, login, logout, authMiddleware }

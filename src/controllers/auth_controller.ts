import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/user_model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Document } from "mongoose";

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

const generateTokens = async (user: Document<unknown, object, IUser> & IUser & Required<{
    _id: string;
}>): Promise<{ "accessToken": string, "refreshToken": string }> => {
    // generate token
    const accessToken = jwt.sign({ "_id": user._id }, process.env.TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION });
    const random = Math.floor(Math.random() * 1000000).toString();
    const refreshToken = jwt.sign({ "_id": user._id, "random": random }, process.env.TOKEN_SECRET, {});
    if (user.tokens == null) {
        user.tokens = [];
    }
    user.tokens.push(refreshToken);
    try {
        await user.save();
        return {
            "accessToken": accessToken,
            "refreshToken": refreshToken
        };
    } catch (err) {
        return null;
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
        const tokens = await generateTokens(user);
        if (tokens == null) {
            return res.status(400).send("Error generating tokens");
        }
        return res.status(200).send(tokens);
    } catch (err) {
        return res.status(400).send(err.message);
    }
}


const refresh = async (req: Request, res: Response) => {
    const refreshToken = extractToken(req);
    if (refreshToken == null) {
        return res.sendStatus(401);
    }
    try {
        jwt.verify(refreshToken, process.env.TOKEN_SECRET, async (err, data: jwt.JwtPayload) => {
            if (err) {
                return res.sendStatus(403);
            }
            const user = await User.findOne({ _id: data._id });
            if (user == null) {
                return res.sendStatus(403);
            }
            if (!user.tokens.includes(refreshToken)) {
                user.tokens = [];
                await user.save();
                return res.sendStatus(403);
            }
            user.tokens = user.tokens.filter((token) => token !== refreshToken);
            const tokens = await generateTokens(user);
            if (tokens == null) {
                return res.status(400).send("Error generating tokens");
            }
            return res.status(200).send(tokens);
        });
    } catch (err) {
        return res.status(400).send(err.message);
    }
}

const extractToken = (req: Request): string => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    return token;
}

const logout = async (req: Request, res: Response) => {
    const refreshToken = extractToken(req);
    if (refreshToken == null) {
        return res.sendStatus(401);
    }
    try {
        jwt.verify(refreshToken, process.env.TOKEN_SECRET, async (err, data: jwt.JwtPayload) => {
            if (err) {
                return res.sendStatus(403);
            }
            const user = await User.findOne({ _id: data._id });
            if (user == null) {
                return res.sendStatus(403);
            }
            if (!user.tokens.includes(refreshToken)) {
                user.tokens = [];
                await user.save();
                return res.sendStatus(403);
            }
            user.tokens = user.tokens.filter((token) => token !== refreshToken);
            await user.save();
            return res.status(200).send();
        });
    } catch (err) {
        return res.status(400).send(err.message);
    }
    res.send("logout");
}

export type AuthRequest = Request & { user: { _id: string } };

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = extractToken(req);
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



export default { register, login, logout, authMiddleware, refresh }

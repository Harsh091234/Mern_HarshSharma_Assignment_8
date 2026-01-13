import User from "../models/user.model.js";
import RefreshToken from "../models/refreshToken.model.js"
import jwt from "jsonwebtoken"
import { generateAccessTokenAndSetCookie, generateRefreshTokenAndSetCookie } from "../utils/generateTokensAndSetCookies.js";
import { storeRefreshToken } from "../utils/storeRefreshToken.js";



export const register = async (req, res) => {
    const { email, password, name } = req.body;
    try {

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        const user = await User.create({
            name,
            email,
            password,
        });
        console.log("hi")
      
        const refreshToken = generateRefreshTokenAndSetCookie(user._id, res);
        await storeRefreshToken(user._id, refreshToken);
        generateAccessTokenAndSetCookie(user._id, res)



        res.status(201).json({ success: true, message: "User created successfully", user });
    } catch (error) {

        console.log("Error in signup controller", error.message);

        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};



export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await user.comparePassword(password))) {


            const refreshToken = generateRefreshTokenAndSetCookie(user._id, res);
            await storeRefreshToken(user._id, refreshToken);
            generateAccessTokenAndSetCookie(user._id, res)

            res.json({
                success: true, message: "User logined success",
                user
            });
        } else {
            res.status(400).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refresh_token;

        if (refreshToken) {
            const decoded = jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET
            );
            await RefreshToken.findOneAndDelete({
                user: decoded.userId
            })

        }

        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        res.json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ success: true, message: "Internal Server Error" });
    }
};



export const getProfile = async (req, res) => {
    try {
        res.status(200).json({success: true, user: req.user});
    } catch (error) {
        console.error("Error in getProfile:", error.message);
        res.status(500).json({ error: "Server error, please try again later." });
    }
};



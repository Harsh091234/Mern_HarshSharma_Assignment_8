import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import RefreshToken from "../models/refreshToken.model.js";
import bcrypt from "bcryptjs";

export async function protectRoute(req, res, next) {
    try {
        const accessToken = req.cookies.access_token;

        if (!accessToken) {
            return handleRefreshToken(req, res, next);
        }

        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in protect middleware (outer catch):", error.message);
        return res.status(500).json({
            message: "Error in protect middleware",
            error: error.message,
        });
    }

}

export const handleRefreshToken = async (req, res, next) => {
    const refreshToken = req.cookies.refresh_token;


    if (!refreshToken) {
        return res.status(401).json({
            authenticated: false,
            message: "Not logged in",
        });
    }

    try {
    
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        if (!decoded) return;
     
        const storedRefreshToken = await RefreshToken.findOne({
            user: decoded.userId,
        });
      
        if (!storedRefreshToken) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }
        
        const isValid = await bcrypt.compare(
            refreshToken,
            storedRefreshToken.token
        );
        
        if (!isValid) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }
        const userId = decoded.userId;
        const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "15m",
        });
        
        res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 15 * 60 * 1000,
        });

        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;

        next();
    } catch (err) {
        return res.status(401).json({
            message: "Refresh token expired or invalid",
        });
    }
};

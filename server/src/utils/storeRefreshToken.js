import RefreshToken from "../models/refreshToken.model.js";


export const storeRefreshToken = async (userId, refreshToken) => {
    await RefreshToken.create({
        user: userId,
        token: refreshToken,
    });
    return
};

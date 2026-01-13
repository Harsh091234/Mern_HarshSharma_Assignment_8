import bcrypt from "bcryptjs";
import {  Schema, model } from "mongoose";



const refreshTokenSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        token: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
);

refreshTokenSchema.pre(
    "save",
    async function () {
        if (!this.isModified("token")) return;


        this.token = await bcrypt.hash(this.token, 10);
        return;
    }
);

refreshTokenSchema.index(
    {
        createdAt: 1,
    },
    {
        expireAfterSeconds: 900,
    }
);

 const RefreshToken = model("RefreshToken", refreshTokenSchema);
 export default RefreshToken;
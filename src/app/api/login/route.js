import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { ConnectDB } from "@/config/connectDb";

export async function POST(req) {
ConnectDB()
    try {

        let {email,password } = await req.json()

        let user = await User.findOne({email})

        if(!user){
            return NextResponse.json({
                success:false,
                message : "Invalid Credentials"
            },{status:400})
        }

        let comparepassword = await bcrypt.compare(password, user.password)

        if(!comparepassword){
            return NextResponse.json({
                success:false,
                message : "Invalid Credentials"
            },{status:400})
        }

        let AccessToken = await new SignJWT({id : user._id})
        .setProtectedHeader({alg : "HS256"}).setIssuedAt().setExpirationTime("20m").sign(new TextEncoder().encode(process.env.JWT_PRIVATE_KEY))


        await cookies().set("token", AccessToken)

        return NextResponse.json({
            success:true,
            message : "User Logged In"
        })






        
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({
            success:false,
            message : "Error in logging in"
        },{status:400})
    }
    
}
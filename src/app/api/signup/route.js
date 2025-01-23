import { ConnectDB } from "@/config/connectDb"
import User from "@/models/User"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(req) {
ConnectDB()
    try {

        let {name,password,email} = await req.json()

        let hashedPassword = await bcrypt.hash(password,10)

        let user = await User.create({name,email,password : hashedPassword})

        return NextResponse.json({
            message : "User created successfully!",
            user
        },{status:200})


        
    } catch (error) {
        log
        return NextResponse.json({
            message : "Error in creating user!",
        },{status:400})
    }
    
}
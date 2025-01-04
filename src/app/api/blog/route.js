import { ConnectDB } from "@/config/connectDb";
import Blog from "@/models/Blogs";
import { NextResponse } from "next/server";


export async function POST(req) {

    ConnectDB()

    try {

        let body = await req.json()

        let newBlog = await Blog.create(body)

        return NextResponse.json({
            success:true,
            message : newBlog
        },{status:201})

        
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({
            success:false,
            message : error
        },{status:400})
    }
    
}


export async function GET() {
    ConnectDB()
    try {

        let blogs = await Blog.find()

        return NextResponse.json({
            success:true,
            blogs
        },{status:200})
        
    } catch (error) {
        return NextResponse.json({
            success:false,
            message : error
        },{status:400})
    }
    
}


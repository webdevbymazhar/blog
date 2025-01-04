import Blog from "@/models/Blogs";
import { NextResponse } from "next/server";

export async function GET(req,{params}) {

    try {

        let id = params.id

        let blog = await Blog.findById(id)
         
        return NextResponse.json({
            success:true,
            blog
        },{status:200})

        
    } catch (error) {
        return NextResponse.json({
            success:false,
            message : "Error in getting blog data"
        },{status:400})
    }
    
}


export async function DELETE(req,{params}) {

    try {

        let id = params.id

        await Blog.findByIdAndDelete(id)

        return NextResponse.json({
            success:true,
            message : "Blog Deleted Successfully"
        },{status:200})
        
    } catch (error) {
        return NextResponse.json({
            success:false,
            message : "Error in deleting blog data"
        },{status:400})
    }
    
}


export async function PATCH(req,{params}) {

    try {

        let id = params.id
        let data = await req.json()

        let updatedBlog = await Blog.findByIdAndUpdate(id,data,{new:true})

        return NextResponse.json({
            success:true,
            blog:updatedBlog
        },{status:200})
        
    } catch (error) {
        return NextResponse.json({
            success:false,
            message : "Error in updating blog data"
        },{status:400})
    }
    
}
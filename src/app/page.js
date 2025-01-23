"use client"
import BlogCard from "@/components/Card";
import axios from "axios";
import { useEffect, useState } from "react";


export default function Home() {

  let [blogs,setblogs] = useState([])


  let fetchData = async () =>{

    try {
      
      let response = await axios.get("/api/blog")
      setblogs(response.data.blogs);
      

    } catch (error) {
      console.log(error);
      
    }

  }

  useEffect(()=>{
        fetchData()
  },[])

  return (
    <div className="flex justify-between items-center flex-wrap ">

      {
        blogs.map((blog, index)=>{
          return <BlogCard id = {blog._id} image={blog.image} description={blog.description} category={blog.category} title={blog.title} />
        })
      }
      
    </div>
  );
}

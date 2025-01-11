"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Page = ({params}) => {

    let [blog,setblog] = useState(null)

    let id = params.id

    let fetchData = async () =>{
        try {

            let response = await axios.get(`/api/blog/${id}`)
            console.log(response);
            
            setblog(response.data.blog);
            

            
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

  return (
    <div>

       {
        blog ? <div>
             <img className='w-[400px] h-[auto] object-cover' src={blog.image} alt="" />
        <h1 className='text-2xl '>{blog.title}</h1>
        <h2 >{blog.category}</h2>
        <div dangerouslySetInnerHTML={{__html:blog.description}}></div>
        </div> : "loading"
       }
      
    </div>
  )
}

export default Page

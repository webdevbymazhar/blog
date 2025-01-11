"use client"
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Table = () => {

    let [data,setdata] = useState([])

  let fetchData = async () =>{
    try {
      let res = await axios.get("/api/blog")
      setdata(res.data.blogs);
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    fetchData()
  },[])

  let DeleteBlog = async (id) =>{

    try {

      let response = await axios.delete(`/api/blog/${id}`)

      if(response.data.success){
        toast.success("Blog Deleted Successfully!")
        fetchData()
      }
      
      
    } catch (error) {
      console.log(error);
      
    }

  }



  return (
    <div className="overflow-x-auto p-3">
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Title</th>
            <th className="py-3 px-6 text-left">Category</th>
            <th className="py-3 px-6 text-center">Image</th>
            <th className="py-3 px-6 text-center">Option</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
         {data.map((item) => (
            <tr
              key={item.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">{item.title}</td>
              <td className="py-3 px-6 text-left">{item.category}</td>
              <td className="py-3 px-6 text-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-12 h-12 object-cover rounded-full mx-auto"
                />
              </td>
              <td className="py-3 px-6 text-center">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600">
                  <Link href={`/admin/update/${item._id}`}>Update</Link>
                </button>
                <button onClick={()=>DeleteBlog(item._id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))} 
        </tbody>
      </table>
    </div>
  );
};

export default Table;






  

  
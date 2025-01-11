"use client"
import axios from 'axios';
import { CldUploadWidget } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function UpdateForm({params}) {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState("");
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const categories = ['Cars', 'Technology', 'Fashion', ]; 

  let id = params.id

  let router = useRouter()

  let fetchData = async () =>{
    try {
        let res = await axios.get(`/api/blog/${id}`)
        console.log(res);
        setTitle(res.data.blog.title)
        setCategory(res.data.blog.category)
        setDescription(res.data.blog.description)
        setImage(res.data.blog.image)


        
    } catch (error) {
        console.log(error);
        
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = { title, image, category, description };
    try {

      let res = await axios.patch(`/api/blog/${id}`,formData)
      if(res.data.success){
        toast.success("Blog Updated Successfully!")
        router.push("/admin/blogs")

      }
      
      
    } catch (error) {
        toast.error("Error in Updating blog")
      console.log(error);
      
    }
    
  };

  useEffect(()=>{
   fetchData()
  },[])

  return (
    <div className="min-h-screen ">
      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded-lg  w-full max-w-xl"
      >
        <h1 className="text-2xl font-bold mb-4">Create a Post</h1>

        {/* Title Field */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block  w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            placeholder="Enter title"
            required
          />
        </div>

        {/* Image Upload Field */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image
          </label>
          
          <CldUploadWidget
                    cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                    onSuccess={(results) => {
                      if (results.info?.secure_url && results.event === "success") {
                        setImage(results.info.secure_url);
                      }
                    }}
                  >
                    {({ open }) => (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          open();
                        }}
                        className="bg-white border border-black  rounded-md  p-3 mt-5 mb-5 w-16 h-16 flex gap-3 justify-center items-center "
                      >
                        <span className="flex flex-col justify-center items-center text-sm ">+<span >Upload</span></span>
                      </button>
                    )}
                  </CldUploadWidget>
                  {
            image === "" ? "no image" : <img className='h-[50px] w-[50px] object-cover' src={image} alt="" />
          }
        </div>

        {/* Categories Dropdown */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <ReactQuill className='h-[30vh] w-[100%]'  theme="snow" value={description} onChange={setDescription} />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-12 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}

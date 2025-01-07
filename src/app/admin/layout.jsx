import Link from 'next/link'
import React from 'react'

const Layout = ({children}) => {
  return (
    <div className='flex '>
       <div className='w-[20%] py-3 bg-black h-[100vh] flex flex-col justify-between items-center'>
        
        <h1 className='text-white text-3xl text-center'>Blog App</h1>

        <ul className='flex flex-col gap-4 justify-center text-2xl items-center text-white'>
          <li><Link href={"/admin"}>Dashboard</Link></li>
          <li><Link href={"/admin/blogs"}>Blogs</Link></li>
          <li><Link href={"/admin/create"}>Create</Link></li>
          <li>Setting</li>
        </ul>


        <button className='text-white'>Log Out</button>


        

</div>
<div className='w-[80%]  h-[100vh] '>
{children}
</div>
    </div>
  )
}

export default Layout

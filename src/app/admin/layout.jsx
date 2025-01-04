import React from 'react'

const Layout = ({children}) => {
  return (
    <div className='flex '>
       <div className='w-[20%] bg-black h-[100vh]'>

</div>
<div className='w-[80%]  h-[100vh] '>
{children}
</div>
    </div>
  )
}

export default Layout

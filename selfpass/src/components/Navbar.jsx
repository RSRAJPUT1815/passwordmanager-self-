import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-black text-cyan-500 font-bold text-xl flex justify-between items-center px-5 h-14 border-b-2'>
      <div className="logo w-12"><img src="lock.png" alt="" /></div>
      <div className="github border border-white py-2 px-4 cursor-pointer rounded-lg"><a href="https://github.com/RSRAJPUT1815/passop" target='_blank'>Github</a></div>
    </div>
  )
}

export default Navbar

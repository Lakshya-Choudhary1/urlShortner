import React, { useState } from 'react'
import PostUrlShortFree from '@/components/form/UrlForm.jsx'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className='w-screen h-screen bg-gray-100'>

      {/* Navbar */}
      <nav className='w-full  shadow-md '>
        <div className='flex items-center justify-between h-full'>

          {/* Logo */}
          <h1 className=' font-bold ml-4 text-gray-800 text-xl md:text-2xl'>
            Short
            <span className='text-blue-600'>Link</span>
          </h1>

          {/* Desktop Menu */}
          <div className='hidden md:flex items-center gap-6 font-medium text-gray-700 h-full'>
            <Link className='hover:text-black transition duration-300' to='/'>Home</Link>
            <Link className='hover:text-black transition duration-300' to='/contact'>Contact</Link>
            <Link className='hover:text-black transition duration-300' to='/login'>Login</Link>
            <Link className='bg-black text-white hover:bg-gray-800 transition duration-300 h-full p-4' to='/dashboard'>
              Dashboard
            </Link>
          </div>

          {/* Burger Button */}
          <button
            className='md:hidden text-blue-600 transition-transform duration-300 hover:scale-110 focus:outline-none'
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className='transition-all p-4 duration-500 ease-in-out'>
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </div>
          </button>
        </div>

        {/* Animated Mobile Menu */}
        <div
          className={`
            md:hidden overflow-hidden transition-all duration-500 ease-in-out
            ${menuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}
          `}
        >
          <div className='flex flex-col gap-4 font-medium text-gray-700 border-t border-gray-300 pt-4'>

            <Link
              onClick={() => setMenuOpen(false)}
              className='hover:translate-x-2 hover:text-blue-600 transition duration-300'
              to='/'
            >
              Home
            </Link>

            <Link
              onClick={() => setMenuOpen(false)}
              className='hover:translate-x-2 hover:text-blue-600 transition duration-300'
              to='/contact'
            >
              Contact
            </Link>

            <Link
              onClick={() => setMenuOpen(false)}
              className='hover:translate-x-2 hover:text-blue-600 transition duration-300'
              to='/login'
            >
              Login
            </Link>

            <Link
              onClick={() => setMenuOpen(false)}
              className='hover:translate-x-2 hover:text-blue-600 transition duration-300'
              to='/dashboard'
            >
              Dashboard
            </Link>

          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className='flex justify-center items-center mt-10 px-4'>
        <PostUrlShortFree />
      </div>
    </div>
  )
}

export default Home
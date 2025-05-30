import React, { useState, useEffect } from 'react';
import { FaBars, FaChevronDown, FaTimes } from 'react-icons/fa';
import { LuNotebookPen } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const Navbar = () => {
        const name = localStorage.getItem('username');
        console.log(name)


  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isAuthenticated = !!localStorage.getItem('token');
  const navigate = useNavigate();


  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50); // Change 50 to control when it triggers
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  // Toggle dropdown visibility
  const toggleProductsDropdown = () => {
    setIsProductsOpen(!isProductsOpen);
  };
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`focus:bg-amber-50 flex items-center justify-between px-3 py-2  fixed top-0 right-0 left-0 z-1 pl-20 pr-20 ${scrolled ? ' shadow-md backdrop-blur-lg' : 'bg-transparent'}`}>
      <div className="text-2xl font-medium text-blue-900 py-2 drop-shadow ">
        <h1>ACEDEMIX</h1>
      </div>

      <div className='md:hidden'>
        <button onClick={toggleMenu} className=''>
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

      </div>

      {/* Nav Items Section */}
      <div className=" hidden md:flex items-center space-x-8 text-blue-900 ">
        <ul className="flex space-x-6">
          <Link to='/'>
            <li className="text-base font-medium hover:text-blue-500 cursor-pointer">Home</li>

          </Link>
          <li
            className="text-base font-medium hover:text-blue-500 cursor-pointer flex items-center relative"
            onClick={toggleProductsDropdown}
          >
            Products
            <FaChevronDown className="ml-2" />
            {/* Dropdown Menu */}
            {isProductsOpen && (
              <div className="absolute top-full left-0 bg-white shadow-lg rounded mt-2 py-2 w-48">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer hover:text-red-500 ">Text Extractor</li>
                  <Link to="/liveCol">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Live note</li>
                  </Link>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Stiky notes</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Acedemic reminder</li>
                </ul>
              </div>
            )}
          </li>
          {isAuthenticated && (
            <Link to="/my-notes">
              <li className="text-base font-medium hover:text-blue-500 cursor-pointer">My Notes</li>
            </Link>
          )}
          <li className="text-base font-medium hover:text-blue-500 cursor-pointer">About Us</li>
        </ul>

      </div>

      {
        isMenuOpen && (
          <div className='md:hidden bg-white shadow-lg'>
            <div className='px-6 py-4 flex flex-col space-y-4'>
              <Link to='/' className='text-gray-800 hover:text-blue-500'>
                Home
              </Link>
              <Link to='/products' className='text-gray-800 hover:text-blue-500'>
                Products
              </Link>
              <Link to='/notes' className='text-gray-800 hover:text-blue-500'>
                Notes
              </Link>
              <Link to='/about' className='text-gray-800 hover:text-blue-500'>
                About Us
              </Link>
            </div>
          </div>
        )
      }

      <div className='flex space-x-3'>

        {!isAuthenticated ?
          <div>

            <button className='btn-primary flex  text-4xl'
              onClick={() => { navigate('/myNotes') }}>note
            </button>

            <button className='btn-primary flex  text-4xl gap-2'
              onClick={() => { navigate('/login') }}>login
            </button>
            Start Note
            <LuNotebookPen
              size={20} />


          </div>
          :
          <div className="text-base font-medium text-gray-800">


            <button
              className="text-base font-medium hover:text-blue-500 cursor-pointer"
              onClick={() => {
                localStorage.removeItem('token');
                navigate('/login')
              }}>Logout</button>
              
          </div>

        }

      </div>
    </div>

  );
};

export default Navbar;
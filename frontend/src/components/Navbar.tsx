import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import useAppContext from '../hooks/useAppContext'
import { useRef, useState } from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { BiLogOut, BiUser } from 'react-icons/bi'


const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false)

    const navigate = useNavigate()

    const { userDetails, handleLogout } = useAppContext()

    const menuRef = useRef(null)

    const toggleMenu = () => setMenuOpen(prev => !prev)


    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">

            <div className="flex items-center justify-between px-4 py-3 md:px-8 max-w-7xl mx-auto">

                {/* Logo */}
                <div
                    onClick={() => navigate('/')}
                    className="flex items-center gap-0 cursor-pointer">

                    <div className="w-10 h-10 rounded-xl overflow-hidden">
                        <img src={logo} alt="Logo" />

                    </div>
                    <span className='text-xl text-gray-900 font-[550] font-serif'>
                        حسابدار
                        <span className=' text-gray-700'>
                            شخصی
                        </span>
                    </span>

                </div>

                {/* if user present */}
                {userDetails && (
                    <div className="relative" ref={menuRef}>
                        <button onClick={toggleMenu} className='flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors'>

                            <div className=' relative'>
                                <div className='w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-teal-600 to-cyan-500 text-white font-bold text-lg'>
                                    {userDetails.name[0]}
                                </div>
                                <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white'></div>
                            </div>

                            <div className='text-left hidden md:block'>

                                <p className='text-sm font-medium text-gray-800 truncate max-w-[120px]'>
                                    {userDetails.name}
                                </p>
                                <p className='text-xs text-gray-500 truncate max-w-[120px]'>
                                    {userDetails.email}
                                </p>

                            </div>

                            <MdOutlineKeyboardArrowDown className={`w-4 h-4 text-gray-500 transition-transform ${menuOpen ? "rotate-180" : ""}`} />

                        </button>

                        {/* drop down */}
                        {menuOpen && (
                            <div className="absolute top-14 right-0 w-56 bg-white rounded-xl shadow-lg border border-gray-100 z-50">

                                <div className='px-4 py-3 border-b border-gray-100'>

                                    <div className=' flex items-center gap-3'>

                                        <div className='w-10 h-10 rounded-full bg-gradient-to-br from-teal-600 to-cyan-500 flex items-center justify-center text-white font-bold text-lg'>

                                            {userDetails.name[0]}
                                        </div>

                                        <div>

                                            <div className='text-sm text-gray-800'>
                                                {userDetails.name}
                                            </div>
                                            <div className='text-xs text-gray-500'>
                                                {userDetails.email}
                                            </div>

                                        </div>

                                    </div>

                                </div>

                                {/* Menu item container */}
                                <div className='p-1.5'>

                                    <button
                                        onClick={() => {
                                            setMenuOpen(false)
                                            navigate('/profile')
                                        }}
                                        className='w-full px-4 py-3 text-left hover:bg-gray-50 text-sm text-gray-700 flex items-center gap-3 rounded-lg'>

                                        <BiUser className='w-4 h-4' />
                                        <span>
                                            پروفایل من
                                        </span>
                                    </button>
                                </div>

                                <div className='p-1.5 border-t border-gray-100'>
                                    <button
                                        onClick={handleLogout}
                                        className='flex w-full items-center  gap-3 px-4 py-3 text-sm hover:bg-red-50 text-red-600 rounded-lg'>

                                        <BiLogOut className=' w-4 h-4' />
                                        <span className=' font-bold -translate-y-[2px]'>
                                            خروج
                                        </span>
                                    </button>

                                </div>

                            </div>
                        )}

                    </div>
                )}

            </div>

        </header >
    )
}

export default Navbar
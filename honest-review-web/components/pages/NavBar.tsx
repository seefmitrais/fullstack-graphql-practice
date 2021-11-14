export const NavBar: React.FC = () => {
    return ( 
        <nav className="bg-gray-100">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between">

                <div className="flex space-x-4">
                    {/* <!-- logo --> */}
                    <div>
                        <a href="#" className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
                            <img src="logo-honest-review.png" className="h-6 w-6 mr-1"  />
                            <span className="font-bold">Honest Review</span>
                        </a>
                    </div>

                    {/* <!-- primary nav --> */}
                    <div className="hidden md:flex items-center space-x-1">
                        <a href="#" className="py-5 px-3 text-gray-700 hover:text-gray-900">Reviews</a>
                        <a href="#" className="py-5 px-3 text-gray-700 hover:text-gray-900">Movies/Series</a>
                    </div>
                </div>

                {/* <!-- secondary nav --> */}
                <div className="hidden md:flex items-center space-x-1">
                    <a href="" className="py-5 px-3">Login</a>
                    <a href="" className="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300">Register</a>
                </div>

                {/* <!-- mobile button goes here --> */}
                <div className="md:hidden flex items-center">
                    <button className="mobile-menu-button">
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    </button>
                </div>

                </div>
            </div>

            {/* <!-- mobile menu --> */}
            <div className="mobile-menu hidden md:hidden">
                <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">Reviews</a>
                <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">Movies/Series</a>
            </div>
        </nav>
    )
}
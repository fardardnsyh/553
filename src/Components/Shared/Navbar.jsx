import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import logo from '../../assets/Untitled design (2)-Photoroom.png'
import { GlobalStateContext } from "../../Providers/GlobalStateProvider";

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext)
    const { notifications } = useContext(GlobalStateContext);
    const handleLogOut = () => {
        logOut()
            .then()
            .catch()
    }

    return (
        <div>

            <div className="navbar bg-base-100 font-poppins">
                <div className="flex-1 mx-4">
                    <Link to='/' className='flex gap-2 items-center'>
                        <img className='w-auto h-7' src={logo} alt='' />
                        <span className='font-bold text-lg'>EchoChamber</span>
                    </Link>
                </div>
                <div className="flex-none">

                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/membership'>Membership</Link>
                        </li>
                    </ul>

                    <button className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                            <span className="badge badge-xs w-full h-full badge-primary indicator-item">{notifications.length}</span>
                        </div>

                    </button>

                    {
                        user?.uid ?
                            <>
                                <div className="dropdown dropdown-end px-4">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                        <li>
                                            <a className="justify-between">
                                                {user?.displayName}
                                                <span className="badge">New</span>
                                            </a>
                                        </li>
                                        <li>
                                            <Link to='/dashboard'>Dashboard</Link>
                                        </li>
                                        <li onClick={handleLogOut}><a>Logout</a></li>
                                    </ul>
                                </div>
                            </>
                            :
                            <>
                                <Link to='/login' className="btn btn-ghost normal-case">Join Us</Link>
                            </>
                    }

                </div>
            </div>

        </div>
    );
};

export default Navbar;
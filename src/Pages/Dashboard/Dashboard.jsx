import { MdAdminPanelSettings, MdManageAccounts, MdOutlinePostAdd } from "react-icons/md";
import { BsFileEarmarkPost } from "react-icons/bs";
import { FaHome, FaUserCircle } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { GrAnnounce } from "react-icons/gr";
import { TbReport } from "react-icons/tb";
import UseAdmin from "../../Hooks/UseAdmin";
import logo from '../../assets/Untitled design (2)-Photoroom.png'
import useAuth from "../../Hooks/useAuth";

const Dashboard = () => {

    //TODO: get isAdmin value from database
    const [isAdmin] = UseAdmin();
    const { user } = useAuth()

    return (
        <div className="flex">

            <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
                <a href="#" className="mx-auto">
                    <img className="w-20 h-20" src={logo} alt="" />
                </a>

                <div className="flex flex-col items-center mt-6 -mx-2">
                    <img className="object-cover w-20 h-20 mx-2 rounded-full" src={user?.photoURL} alt="avatar" />
                    <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">{user?.displayName}</h4>
                    <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">{user?.email}</p>
                </div>

                <div className="flex flex-col justify-between flex-1 mt-6">
                    <nav>
                        <a className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-200" href="#">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="currentColor" />
                            </svg>

                            <span className="mx-4 font-medium">Dashboard</span>
                        </a>
                        {
                            isAdmin ? <>
                                <NavLink to='/dashboard/adminProfile'>
                                    <a className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">

                                        <MdAdminPanelSettings className="text-xl" />
                                        <span className="mx-4 font-medium">Admin Profile</span>
                                    </a>
                                </NavLink>

                                <NavLink to='/dashboard/manageUsers'>
                                    <a className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">

                                        <MdManageAccounts className="text-2xl" />
                                        <span className="mx-4 font-medium">Manage Users</span>
                                    </a>
                                </NavLink>

                                <NavLink to='/dashboard/reportedComment'>
                                    <a className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">

                                        <TbReport className="text-2xl" />
                                        <span className="mx-4 font-medium">Reported Comments</span>
                                    </a>
                                </NavLink>
                                <NavLink to='/dashboard/makeAnnouncement'>
                                    <a className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">

                                        <GrAnnounce className="text-2xl" />
                                        <span className="mx-4 font-medium">Make Announcement</span>
                                    </a>
                                </NavLink>
                            </> : <>
                                <NavLink to='/dashboard/profile'>
                                    <a className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">

                                        <FaUserCircle className="text-xl" />
                                        <span className="mx-4 font-medium">My Profile</span>
                                    </a>
                                </NavLink>

                                <NavLink to='/dashboard/addpost'>
                                    <a className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">

                                        <MdOutlinePostAdd className="text-2xl" />
                                        <span className="mx-4 font-medium">Add Post</span>
                                    </a>
                                </NavLink>

                                <NavLink to='/dashboard/mypost'>
                                    <a className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">

                                        <BsFileEarmarkPost className="text-xl" />
                                        <span className="mx-4 font-medium">My Posts</span>
                                    </a>
                                </NavLink>
                            </>
                        }

                        <div className='divider'></div>

                        {/* Shared nav links */}
                        <NavLink to='/'>
                            <a className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">

                                <FaHome className="text-2xl" />
                                <span className="mx-4 font-medium">Home</span>
                            </a>
                        </NavLink>
                    </nav>

                </div>

            </aside>


            <div className="flex-1 m-20">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
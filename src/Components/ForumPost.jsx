import { FaRegComments } from "react-icons/fa";
import { MdHowToVote } from "react-icons/md";
import { FaRegCalendarTimes } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GlobalStateContext } from "../Providers/GlobalStateProvider";

const ForumPost = () => {

    const [dsc, setDsc] = useState(true)

    const [postPerPage, setPostPerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [count, setCount] = useState(0)
    // const [posts, setPosts] = useState([])
    const { posts, getPosts, setPosts } = useContext(GlobalStateContext)

    const numberOfPages = Math.ceil(count / postPerPage)
    const pages = [...Array(numberOfPages).keys()].map(element => element + 1);

    useEffect(() => {
        getPosts(null, dsc ? 'dsc' : 'asc')
    }, [dsc])

    // Pagination Starts
    useEffect(() => {
        const getPost = async () => {
            const { data } = await axios(`https://b9a12-forum-server.vercel.app/all-posts?page=${currentPage}&size=${postPerPage}`)

            setPosts(data)
        }
        getPost()

    }, [currentPage, postPerPage])

    useEffect(() => {
        const getCount = async () => {

            const { data } = await axios(`https://b9a12-forum-server.vercel.app/post-count`)

            setCount(data.count)
        }
        getCount()

    }, [])

    //console.log(count)

    const handlePagination = (page) => {
        setCurrentPage(page)
    }


    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length) {
            setCurrentPage(currentPage + 1)
        }
    }

    //Pagination Ends

    return (
        <div>

            <button onClick={() => setDsc(!dsc)} className="btn btn-primary font-poppins my-20 w-full">
                {dsc ? 'Post: Low to High' : 'Post: High to Low'}
            </button>

            <div>
                {posts.map(post => <div key={post._id}>
                    <Link to={`details/${post._id}`}>
                        <article className="rounded-xl border-2 border-gray-100 bg-white max-w-3xl mx-auto font-poppins my-10">
                            <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
                                <a href="#" className="block shrink-0">
                                    <img
                                        alt=""
                                        src={post.author_image || post.image}
                                        className="size-14 rounded-lg object-cover"
                                    />
                                </a>

                                <div>
                                    <h3 className="font-medium sm:text-lg">
                                        <a href="#" className="hover:underline"> {post.post_title || post.title} </a>
                                    </h3>

                                    <p className="line-clamp-2 text-sm text-gray-700">
                                        {post.tag}
                                    </p>

                                    <div className="mt-4 sm:flex sm:items-center sm:gap-2">
                                        <div className="flex items-center gap-1 text-gray-500 bg-[#D1CAFF] p-1 rounded-full">
                                            <FaRegComments />

                                            <p className="text-xs">14 comments</p>
                                        </div>
                                        <div className="flex items-center gap-1 text-gray-500 bg-blue-200 p-1 rounded-full">
                                            <MdHowToVote />

                                            <p className="text-xs">{post.voteDifference}</p>
                                        </div>

                                        <div className="flex items-center gap-1 text-gray-500 ml-2 bg-[#9AB78D] rounded-full p-1">
                                            <FaRegCalendarTimes />

                                            <p className="text-xs">{post.post_time}</p>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end">

                                <span className="hidden sm:block" aria-hidden="true">&middot;</span>

                                <p className="hidden sm:block sm:text-xs sm:text-gray-500 mr-4">
                                    Posted by
                                    <a href="#" className="font-medium underline hover:text-gray-700"> {post.author_name} </a>
                                </p>
                            </div>
                        </article>
                    </Link>
                </div>)}

            </div>

            {/* Pagination */}
            <div disabled={currentPage === 1} onClick={handlePrevPage} className="flex justify-center m-20">
                <button href="#" className="flex items-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200">
                    previous
                </button>

                {
                    pages.map(page => <button onClick={() => handlePagination(page)}
                        key={page} href="#" className={`hidden
                            ${currentPage === page ? 'bg-[#0152A8]' : ''} px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200`}>
                        {page}
                    </button>)
                }

                <button href="#" disabled={currentPage === numberOfPages} onClick={handleNextPage} className="flex items-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200">
                    Next
                </button>
            </div>
        </div>
    );
};

export default ForumPost;
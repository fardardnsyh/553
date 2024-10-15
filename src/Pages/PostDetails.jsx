import { useContext, useEffect, useState } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { FaRegCalendarTimes, FaRegCommentDots } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
//import { comment } from "postcss";
import Swal from "sweetalert2";


const PostDetails = () => {
    let post = useLoaderData();

    const { _id, author_name, author_image, post_title, post_description, tag, post_time, upvote, downvote } = post;


    const { user } = useContext(AuthContext)
    const [comments, setComments] = useState([])


    const handleAddComment = (e) => {
        e.preventDefault();

        const form = e.target;
        const comment = form.comment.value;

        const newComment = {
            comment,
            post_title
        }
        //console.log(newComment)

        //send data to the server
        fetch('https://b9a12-forum-server.vercel.app/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComment)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Comment Added Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }

            }).catch(err => console.log(err))
    }


    const handleUpVote = async () => {
        fetch(`https://b9a12-forum-server.vercel.app/posts/upVote/${_id}`, { method: "PATCH" })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                //todo:call a function to refetch the post details
            })
    }

    useEffect(() => {
        fetch('https://b9a12-forum-server.vercel.app/comments')
            .then(res => res.json())
            .then(data => setComments(data))
    }, [])


    return (
        <div>
            <div className="w-full max-w-md px-8 py-4 mx-20 mt-20 border bg-white shadow-lg dark:bg-gray-800 font-poppins">
                <div className="flex -mt-16">
                    <img className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400" alt="Testimonial avatar" src={author_image} />
                </div>

                <h2 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">{post_title}</h2>

                <p className="mt-2 text-xs text-gray-600 dark:text-gray-200 opacity-50">Posted by</p>

                <div className="flex justify-between mt-4">
                    <a href="#" className="text-lg font-medium text-blue-600 dark:text-blue-300" role="link">{author_name}</a>
                    <div className="flex items-center gap-1 text-gray-500 ml-2">
                        <FaRegCalendarTimes />

                        <p className="text-xs">{post_time}</p>
                    </div>
                </div>
            </div>

            <div className="card bg-base-100 shadow-xl mx-20 border font-poppins rounded-l-none rounded-r-none">
                <div className="card-body">
                    <h2 className="card-title">{tag}</h2>
                    <p>{post_description}</p>

                    <div className="card-actions justify-between items-center">
                        <div className="flex items-center gap-4 text-xl mt-4">

                            <button className="btn rounded-full border-red-100"><BiDownvote />
                            </button>
                            <h2>{downvote}</h2>

                            <button className="btn rounded-full border-red-100" onClick={handleUpVote}><BiUpvote /></button>
                            <h2>{upvote}</h2>
                        </div>
                        <button className="btn btn-primary">Share</button>
                    </div>
                </div>
            </div>

            {/* Comment input Section */}

            <form onSubmit={handleAddComment} className="mx-20 font-poppins my-10">
                <div className="label flex justify-start items-center gap-2 mt-10 md-2">
                    <img className="h-10 w-10 rounded-full" src={user?.photoURL} />
                    <span className="label-text text-lg">{user?.displayName}</span>
                </div>

                <div className="form-control">
                    <textarea placeholder="What are your comments ?" name="comment" className="textarea textarea-bordered resize-none textarea-md w-full max-w-full border-x-0 border-t-0 " ></textarea>
                </div>

                <div className="card-actions justify-end mt-4">
                    <button className="btn w-20 bg-[#D1CAFF] text-black ml-4"><FaRegCommentDots className="text-xl" /></button>
                </div>
            </form>

            {/* Comment output Section */}
            <div className="mx-20">
                <hr />

                {
                    comments.map(item => <div key={item._id} className="card bg-base-100 border shadow-xl my-10 mx-20">
                        <div className="card-body ">
                            <div className="card-title flex justify-start items-center gap-2">
                                <img className="h-10 w-10 rounded-full" src={user?.photoURL} />
                                <span className="label-text text-lg">{user?.displayName}</span>
                            </div>
                            <p>{item.comment}</p>
                            <div className="flex items-center justify-end gap-4 text-xl mt-4">

                                <button className="btn rounded-full border-red-100"><BiDownvote />
                                </button>
                                <button className="btn rounded-full border-red-100"><BiUpvote /></button>

                            </div>
                        </div>
                    </div>)
                }

                <hr />
            </div>
        </div>
    );
};

export default PostDetails;
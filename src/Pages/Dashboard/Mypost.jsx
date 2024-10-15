import { useEffect, useState } from "react";
import { FaCommentDots } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Mypost = () => {

    const { user } = useAuth();
    const [posts, setPosts] = useState([])
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        fetch(`https://b9a12-forum-server.vercel.app/posts?email=${user.email}`)
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.log("noti error", err))
    }, [])


    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/posts/${id}`)
                    .then(res => {
                        if (res.data.deleteCount > 0) {
                            //refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>
            <h2 className="text-3xl font-semibold font-poppins my-10">My Post</h2>


            <div>

                <div className="overflow-x-auto font-poppins">
                    <table className="table w-full  bg-white text-left text-gray-500">
                        {/* head */}
                        <thead className="bg-gray-50 text-black">
                            <tr>
                                <th></th>
                                <th>Post Title</th>
                                <th>No. of Votes</th>
                                <th>Comment</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                posts.map(item => <tr key={item._id}>
                                    <th>1</th>
                                    <td>{item.title}
                                    </td>
                                    <td>{item.voteDifference}</td>
                                    <Link to={`/dashboard/allComments/${item._id}`}>
                                        <td className="">
                                            <button className="btn bg-white border-none"><FaCommentDots className="text-2xl" /></button>
                                        </td>
                                    </Link>
                                    <td><button onClick={() => handleDelete(item._id)} className="btn bg-white border-none"><RiDeleteBin6Line className="text-2xl" /></button></td>
                                </tr>)
                            }


                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default Mypost;
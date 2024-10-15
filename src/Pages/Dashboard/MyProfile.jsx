import { FaMedal } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import { useEffect, useState } from "react";
// import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
//import { useQuery } from "@tanstack/react-query";

const MyProfile = () => {

    const { user } = useAuth();
    const [posts, setPosts] = useState([])
    const [payments, setPayments] = useState([])
    const axiosSecure = useAxiosSecure()


    useEffect(() => {
        fetch(`https://b9a12-forum-server.vercel.app/posts?email=${user.email}`)
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.log("noti error", err))
    }, [])


    useEffect(() => {
        fetch('https://b9a12-forum-server.vercel.app/payments')
            .then(res => res.json())
            .then(data => setPayments(data))
            .catch(err => console.log("noti error", err))
    }, [])



    return (
        <div>
            <h2 className="my-10 text-3xl font-semibold font-poppins">My Profile</h2>

            <article className="rounded-xl border border-gray-700 bg-gray-800 p-4 font-poppins">
                <div className="flex gap-4">
                    <img
                        src={user?.photoURL}
                        className="size-16 rounded-full object-cover"
                    />

                    <div>
                        <h3 className="text-lg font-medium text-white">{user?.displayName}</h3>

                        <div className="flow-root">
                            {user?.email}
                        </div>

                        <div className="my-2 flex gap-2">
                            {payments.map(payment => (
                                <div key={payment.id} className="my-2 flex gap-2">
                                    {/* Conditionally render the badge based on whether the user's email is found in the payments */}
                                    {payment.email === user?.email ? <div className="badge bg-yellow-500 text-black badge-lg"><FaMedal /></div> : <div className="badge bg-amber-900 badge-lg"><FaMedal /></div>}

                                    <div className="badge bg-amber-900 badge-lg"><FaMedal /></div>
                                </div>
                            ))}

                            {/* <div className="badge bg-yellow-500 text-black badge-lg"><FaMedal /></div> */}

                            {/* <div className="badge bg-amber-900 badge-lg"><FaMedal /></div> */}
                        </div>
                    </div>
                </div>

                <h2 className="my-10 text-xl font-semibold text-sky-300">Recent Posts</h2>

                <ul className="mt-4 space-y-2">
                    {
                        posts.map(item => <li key={item._id}>
                            <a href="#" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
                                <strong className="font-medium text-white">{item.title}</strong>
                                <p>{item.tag}</p>
                                <p className="mt-4 text-xs font-medium text-gray-300">
                                    {item.description}
                                </p>
                            </a>
                        </li>)
                    }

                </ul>
            </article>
        </div>
    );
};

export default MyProfile;
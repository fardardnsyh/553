import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";


const ManageUsers = () => {

    const axiosSecure = useAxiosSecure()
    const [payments, setPayments] = useState([])

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    const handleMakeAdmin = (user) => {
        console.log(user)

        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an admin now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }


    useEffect(() => {
        fetch('https://b9a12-forum-server.vercel.app/payments')
            .then(res => res.json())
            .then(data => setPayments(data))
            .catch(err => console.log("noti error", err))
    }, [])

    return (
        <div>
            <div className="overflow-x-auto font-poppins">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Make Admin</th>
                            <th>Subscription Status(Membership)</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>

                                <td>
                                    {
                                        user.role === 'admin' ? 'Admin' :
                                            <button onClick={() => handleMakeAdmin(user)} className="btn btn-outline">
                                                <FaUsers className="text-white text-2xl" />
                                            </button>
                                    }
                                </td>
                                <td>
                                    {payments.map(item => <div key={item._id}>
                                        {item.email === user?.email ? <h2>Yes</h2> : <h2>No</h2>}
                                    </div>)}
                                </td>
                            </tr>)
                        }
                        {/* row 1 */}


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
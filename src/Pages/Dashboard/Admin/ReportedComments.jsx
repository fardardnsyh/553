import { FaDeleteLeft } from "react-icons/fa6";
import { FcDeleteRow } from "react-icons/fc";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { FaComments } from "react-icons/fa";


const ReportedComments = () => {

    const axiosSecure = useAxiosSecure()
    const [reports, setReports] = useState([])

    useEffect(() => {
        fetch('https://b9a12-forum-server.vercel.app/reports')
            .then(res => res.json())
            .then(data => setReports(data))
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

                axiosSecure.delete(`/reports/${id}`)
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

            <div role="alert" className="alert font-poppins my-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>{reports.length} reported comments. Check below.</span>
            </div>

            <div className="overflow-x-auto font-poppins">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Title</th>
                            <th>Selected Feedback</th>
                            <th>Reported Comment</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            reports.map(item => <tr key={item._id} className="bg-base-200">
                                <th>{item.email}</th>
                                <td>Cy Ganderton</td>
                                <td>Quality Control Specialist</td>
                                <td><button onClick={() => handleDelete(item._id)} className="btn border-white"><FaComments className="text-2xl" /></button></td>
                                <td><button onClick={() => handleDelete(item._id)} className="btn border-white"><FcDeleteRow className="text-2xl" /></button></td>

                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportedComments;
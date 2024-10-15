import { useEffect, useState } from "react";
import { GoReport } from "react-icons/go";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllComments = () => {

    const posts = useLoaderData();

    const [selectedFeedback, setSelectedFeedback] = useState('');
    const [reportDisabled, setReportDisabled] = useState(true);
    //const axiosSecure = useAxiosSecure()
    const [comments, setComments] = useState([])
    const [title, setTitle] = useState('');



    const handleFeedbackChange = (event) => {
        const feedback = event.target.value;
        setSelectedFeedback(feedback);
        setReportDisabled(false); // Enable the Report button
    };

    const handleReportClick = (e) => {
        // Handle report submission here
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const comment = form.comment.value;
        const feedback = form.feedback.value;

        const newReport = {
            email,
            comment,
            feedback
        }

        //send data to the server
        fetch('https://b9a12-forum-server.vercel.app/reports', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newReport)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Reported Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
            }).catch(err => console.log(err))


        setReportDisabled(true); // Disable the Report button after submission
    };


    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`https://b9a12-forum-server.vercel.app/comments/${title}`);
                const data = await response.json();
                setComments(data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [title]);





    return (
        <div>
            <form onSubmit={handleReportClick} className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Email</th>
                            <th>Comments</th>
                            <th>Feedback</th>
                            <th>Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>

                            <td className="input" name='email'>{posts.postMaker.postMaker_email}</td>
                            <td className="input" name='comment'>{comments.map(item => <div key={item.key}>{item.comment}</div>)}</td>

                            <td className="input" name='feedback'>
                                <select className="select select-bordered w-full max-w-xs"
                                    value={selectedFeedback}
                                    onChange={handleFeedbackChange}>
                                    <option disabled selected>Choose your feedback</option>
                                    <option>Offensive</option>
                                    <option>Misbehave</option>
                                    <option>Violation</option>
                                    <option>Spam</option>
                                </select>
                            </td>
                            <td><button
                                disabled={reportDisabled} className="btn brn-sm border-white"><GoReport className="text-lg" /></button></td>
                        </tr>

                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default AllComments;
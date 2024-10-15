import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import { FaTags } from "react-icons/fa";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AdminProfile = () => {

    const { user } = useAuth()
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        console.log(data)
        // image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            // now send the announcement list data to the server with the image url
            const tagList = {
                name: data.name,
                image: res.data.data.display_url
            }
            // 
            const announceRes = await axiosSecure.post('/tags', tagList);
            console.log(announceRes.data)

            if (announceRes.data.insertedId) {
                // show success popup
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} Tags`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log('with image url', res.data);
    }


    const { data: chartData = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    const pieChartData = [
        { name: 'Users', value: chartData.users },
        { name: 'Posts', value: chartData.posts },
        { name: 'Comments', value: chartData.comments },

    ];


    // custom shape for the pie chart
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };


    return (
        <div>
            <div className="flex justify-center items-center font-poppins bg-gray-100 text-gray-800">
                <div className="rounded-lg bg-white shadow-lg w-full p-8">
                    <h1 className="text-2xl font-semibold mb-1">Admin Profile</h1>
                    <p className="text-gray-400">Keep your basic details updated at all times</p>

                    <div className="grid grid-cols-4 grid-rows-2 gap-2 items-center p-4 rounded-lg border border-gray-200 bg-gray-50 mt-2">
                        <img src={user?.photoURL} alt="Profile picture" className="rounded-lg row-span-2" />

                        <button className="p-2 border border-blue-500 bg-blue-50 text-blue-500 rounded-md col-span-2 hover:bg-blue-500 hover:text-white transition-colors">Update Profile Picture</button>

                        <button className="p-2 border border-red-500 bg-red-50 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors">Remove</button>

                        <p className="col-span-3 text-xs text-gray-500">We recommend uploading at a higher resolution, ideally 1000 x 1000 pixels or above.</p>
                    </div>
                    <div className="m-2">
                        <h2 className="card-title">{user?.displayName}</h2>
                        <p className="text-sm">{user?.email}</p>
                    </div>

                </div>
            </div>


            {/* PIE Chart */}
            <div className="w-1/2">
                <PieChart width={400} height={400}>
                    <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend></Legend>
                </PieChart>
            </div>


            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                    <Pie
                        dataKey="value"
                        startAngle={180}
                        endAngle={0}
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                    />
                    <Legend></Legend>
                </PieChart>

            </ResponsiveContainer>

            <form onSubmit={handleSubmit(onSubmit)} className="font-poppins">
                {/* tag */}
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Tag Name*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="name"
                        {...register('name', { required: true })}
                        required
                        className="input input-bordered w-full" />
                </div>

                {/* Image */}
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Add Icon</span>
                    </label>
                    <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                </div>

                <button className="btn btn-outline w-full">
                    Add Tag <FaTags className="ml-2 text-lg"></FaTags>
                </button>
            </form>

        </div>
    );
};

export default AdminProfile;
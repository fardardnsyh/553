import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { MdAddAlert } from "react-icons/md";
import { useContext } from "react";
import { GlobalStateContext } from "../../../Providers/GlobalStateProvider";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const MakeAnnouncement = () => {

    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { getNotifications } = useContext(GlobalStateContext)

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
            const announcementList = {
                name: data.name,
                title: data.title,
                description: data.description,
                image: res.data.data.display_url
            }
            // 
            const announceRes = await axiosSecure.post('/announcements', announcementList);
            console.log(announceRes.data)

            if (announceRes.data.insertedId) {
                getNotifications();
                // show success popup
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added to Announcement`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log('with image url', res.data);
    }
    return (
        <div>
            <div className="font-poppins">
                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* name */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Author Name*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Name"
                            {...register('name', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>

                    {/* title */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Title*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Title"
                            {...register('title', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>

                    {/* Description */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea {...register('description')} className="textarea textarea-bordered h-24" placeholder="Type Here"></textarea>
                    </div>

                    {/* Image */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Author Image</span>
                        </label>
                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                    </div>

                    <button className="btn btn-outline w-full">
                        Add To Announcement <MdAddAlert className="ml-2 text-lg"></MdAddAlert>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MakeAnnouncement;
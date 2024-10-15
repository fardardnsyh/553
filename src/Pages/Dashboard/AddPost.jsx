import { useState } from 'react';
import Select from 'react-select';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';

const options = [
    { value: 'React', label: 'React' },
    { value: 'MongoDB', label: 'MongoDB' },
    { value: 'Authentication', label: 'Authentication' },
    { value: 'Typescript', label: 'Typescript' },
    { value: 'Javascript', label: 'Javascript' },
    { value: 'Express', label: 'Express' },
];

const AddPost = () => {

    const [selectedOption, setSelectedOption] = useState(null);
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth();

    const handleAddPost = async (e) => {
        e.preventDefault();

        const form = e.target;

        const name = form.name.value;
        const image = form.image.value;
        const email = form.email.value;
        const title = form.title.value;
        const description = form.description.value;
        const tag = selectedOption.value;
        const upvote = form.upvote.value;
        const downvote = form.downvote.value;

        const newPost = {
            name,
            image,
            email,
            title,
            description,
            tag,
            upvote,
            downvote,
            postMaker: {
                postMaker_name: user?.displayName,
                postMaker_image: user?.photoURL,
                postMaker_email: user?.email
            }
        }
        console.log(newPost);

        //send data to the server
        fetch('https://b9a12-forum-server.vercel.app/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Item Added Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
            }).catch(err => console.log(err))
    }

    return (
        <div>

            <section className="max-w-full p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 font-poppins">
                <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Add Post</h2>

                <form onSubmit={handleAddPost}>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">

                        <div className='form-control'>
                            <label className=" dark:text-gray-200">Author Name</label>
                            <input placeholder='Name' name="name" type="text" className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>

                        <div className="form-control">
                            <label className=" dark:text-gray-200">Author Image</label>
                            <input type="url" placeholder='image_url' name="image" className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>

                        <div className='form-control'>
                            <label className=" dark:text-gray-200">Author Email</label>
                            <input placeholder='Email' name="email" type="email" className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>

                        <div className='form-control'>
                            <label className=" dark:text-gray-200">Post Title</label>
                            <input placeholder='Title' name="title" type="text" className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>

                        <div className="form-control w-full">
                            <label className="block text-gray-500 dark:text-gray-300">Post Description</label>

                            <textarea placeholder='Description' name="description" className="block  mt-2 w-full  placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5  focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"></textarea>
                        </div>

                        <div className='form-control'>
                            <label className=" dark:text-gray-200">Tag</label>
                            <div className='block text-black w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring'>
                                <label className='input-group' name="tag">
                                    <Select
                                        defaultValue={selectedOption}
                                        onChange={setSelectedOption}
                                        options={options}
                                    />
                                </label>
                            </div>
                        </div>

                        <div className='form-control'>
                            <label className=" dark:text-gray-200">Up Vote</label>
                            <input placeholder='Up vote' name="upvote" type="number" className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>
                        <div className='form-control'>
                            <label className=" dark:text-gray-200">Down Vote</label>
                            <input placeholder='Down vote' name="downvote" type="number" className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>

                        <div className="form-control">
                            <label className=" dark:text-gray-200">Post Maker Name</label>
                            <input type="text" placeholder='name' name="postMaker_name" defaultValue={user?.displayName} className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>

                        <div className='form-control'>
                            <label className=" dark:text-gray-200">Post Maker Email</label>
                            <input placeholder='email' name="postMaker_email" type="email" defaultValue={user?.email} className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>

                        <div className="form-control">
                            <label className=" dark:text-gray-200">Image URL</label>
                            <input type="url" placeholder='image_url' name="postMaker_image" defaultValue={user?.photoURL} className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Add</button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default AddPost;
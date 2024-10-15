import { Link, useNavigate } from 'react-router-dom';
import background from '../assets/6247730.jpg'
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import logo from '../assets/Untitled design (2)-Photoroom.png'
import { toast } from 'react-toastify';
import axios from 'axios';


const SignUp = () => {

    const { createUser, setLoading, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate();


    //Google signIn
    const handleGoogleSignIn = async () => {

        signInWithGoogle()
            .then(result => {
                console.log(result)
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data)
                        navigate('/')
                    })
            })
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        const form = e.target

        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const image = form.image.files[0]
        const formData = new FormData()
        formData.append('image', image)

        try {
            setLoading(true)
            /// 1. Upload image and get image url
            const { data } = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY
                }`,
                formData
            )
            console.log(data.data.display_url)
            //2. User Registration
            const result = await createUser(email, password)
            console.log(result)

            // 3. Save username and photo in firebase
            await updateUserProfile(name, password)
            navigate('/')
            toast.success('SignUp Successful')
        } catch (err) {
            console.log(err)
            toast.error(err.message)
        }
    }

    return (
        <div>
            <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
                <div className="hidden bg-cover lg:block lg:w-1/2" style={{
                    backgroundImage: `url(${background})`,
                }}></div>

                <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">

                    <img className="w-auto h-7 sm:h-8" src={logo} alt="" />

                    <h1 className="mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl dark:text-white">Sign Up</h1>


                    <div onClick={handleGoogleSignIn} href="#" className="flex items-center justify-center cursor-pointer px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <svg className="w-6 h-6 mx-2" viewBox="0 0 40 40">
                            <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                            <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                            <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                            <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                        </svg>

                        <span className="mx-2">Sign Up with Google</span>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                        <a href="#" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">or Sign Up
                            with email</a>

                        <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                    </div>

                    <form onSubmit={handleSignUp} className="w-full max-w-md">

                        <div className=" relative flex items-center mt-8">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </span>

                            <input type="text" name='name' className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Username" />
                        </div>

                        <div className=" relative flex items-center mt-8">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </span>

                            <input type="email" name='email' className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" />
                        </div>

                        <div className="relative flex items-center mt-4">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </span>

                            <input type="password" name='password' className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" />
                        </div>

                        <div>
                            <label htmlFor='image' className='block mt-4 mb-2 text-sm'>
                                Select Image:
                            </label>
                            <input
                                required
                                type='file'
                                id='image'
                                name='image'
                                accept='image/*'
                            />
                        </div>

                        <div className="mt-6">
                            <button type='submit' className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                Sign Up
                            </button>

                            <Link to='/login'>
                                <div className="mt-6 text-center ">
                                    <a href="#" className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                                        Have an account? Login!
                                    </a>
                                </div>
                            </Link>
                        </div>
                    </form>


                </div>
            </div>
        </div>
    );
};

export default SignUp;
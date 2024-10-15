import { useEffect, useState } from 'react';
//import img1 from '../assets/drew-hays-agGIKYs4mYs-unsplash.jpg'

const Announcement = () => {

    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {

        fetch('https://b9a12-forum-server.vercel.app/announcements')
            .then(res => res.json())
            .then(data => setAnnouncements(data))
    }, [])

    return (
        <div>

            <div className="space-y-6 mx-10 mt-16 font-poppins">
                <h2 className='text-center text-xl font-semibold'>Announcements</h2>
                {
                    announcements.map(item => <div key={item._id} className="relative mx-auto max-w-[400px] rounded-xl border border-secondary-50 bg-white p-4 text-sm shadow-lg">
                        <button className="ttop-4 absolute right-4 ml-auto text-secondary-500 hover:text-secondary-900">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                            </svg>
                        </button>
                        <div className="flex space-x-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-500">
                                <img className='object-cover w-10 h-10 rounded-full' src={item.image} alt="" />
                            </div>
                            <div className="flex-1">
                                <h4 className="pr-6 font-medium text-black">{item.title}</h4>

                                <p className="text-xs mt-2">By {item.name}</p>
                                <h2 className='mt-2 link text-primary'>{item.description}</h2>
                            </div>
                        </div>
                    </div>)
                }


            </div>

        </div>
    );
};

export default Announcement;
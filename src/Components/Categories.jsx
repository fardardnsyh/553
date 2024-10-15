import { useEffect, useState } from "react";
import { FaReact } from "react-icons/fa";


const Categories = () => {

    const [tags, setTags] = useState([])

    useEffect(() => {
        fetch('https://b9a12-forum-server.vercel.app/tags')
            .then(res => res.json())
            .then(data => {
                //console.log(data)
                setTags(data)
            })
    }, [])


    return (
        <div>
            <div className="flex justify-center items-center w-full min-h-screen text-gray-800 font-poppins">
                <div className="rounded-xl bg-white w-72 shadow-md overflow-hidden">
                    <h1 className="text-lg font-semibold mb-2 p-6 pb-4 flex justify-between items-center border-b-2"><span>Popular Tags</span> <button><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                    </svg></button></h1>
                    <ul className="px-4 mt-2 mb-4">

                        {
                            tags.map(tag => <li key={tag._id} className="p-2 mt-8 h-full border border-gray-700 hover:border-pink-600 flex items-center transition-colors cursor-pointer bg-slate-100 rounded text-black shadow-xl flex gap-2">

                                <img src={tag.image} className="h-6 w-6" />

                                <span>{tag.name}</span></li>)
                        }

                    </ul>
                </div>
            </div>

        </div>
    );
};

export default Categories;
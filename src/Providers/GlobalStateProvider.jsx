/* eslint-disable react/prop-types */


import { createContext, useEffect, useState } from "react"

/*
1. move useeffect from forum post component to globalStatProvider component
2.const [posts, setPosts] = useState([])  move this line from forum post
2.const [posts, setPosts] = useState([])  move this line from forum post
3. 
*/

export const GlobalStateContext = createContext(null)
// const auth = getAuth(app)


const GlobalStateProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [posts, setPosts] = useState([])

    //get notifications
    const getNotifications = () => {
        fetch('https://b9a12-forum-server.vercel.app/announcements')
            .then(res => res.json())
            .then(data => setNotifications(data))
            .catch(err => console.log('err', err))
    }


    //get posts
    const getPosts = async (searchText, sort) => {

        let url = `https://b9a12-forum-server.vercel.app/posts`;
        if (searchText && sort) {
            url += `?search=${searchText}&sort=${sort}`;
        }
        else if (searchText) {
            url += `?search=${searchText}`;
        }
        else if (sort) {
            url += `?sort=${sort}`;
        }

        fetch(url)
            .then(res => res.json())
            .then(data => setPosts(data))
    }

    //loading initial data
    useEffect(() => {
        getNotifications();
        getPosts();
    }, [])



    const globalState = {
        notifications,
        getNotifications,
        posts,
        getPosts,
        setPosts
    }
    //console.log('notification', notifications)
    return (
        <GlobalStateContext.Provider value={globalState}>{children}</GlobalStateContext.Provider>
    )
}

export default GlobalStateProvider;

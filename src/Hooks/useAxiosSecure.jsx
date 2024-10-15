import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
//import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'https://b9a12-forum-server.vercel.app'
})

const useAxiosSecure = () => {
    const navigate = useNavigate()
    const { logOut } = useContext(AuthContext)

    //Request interceptor to add authorization header for every secure call to the api
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`;
        return config;

    }, function (error) {
        //DO something with request error
        return Promise.reject(error)
    })

    //Intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        console.log('status error in the interceptor', status);

        if (status === 401 || status === 403) {
            await logOut();
            navigate('/login')
        }
        return Promise.reject(error)
    })
    return axiosSecure
};

export default useAxiosSecure;
import { useContext } from "react";
import UseAdmin from "../Hooks/UseAdmin";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const AdminRoute = ({ children }) => {

    const [isAdmin, isAdminLoading] = UseAdmin()
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()

    if (loading || isAdminLoading) {
        return <span className="loading loading-spinner loading-lg"></span>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to='/' state={location.pathname} replace={true}></Navigate>
};

export default AdminRoute;
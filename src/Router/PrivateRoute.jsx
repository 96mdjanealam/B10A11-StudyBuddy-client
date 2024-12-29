import React, { useContext } from 'react'
import { AuthContext } from '../Provider/AuthProvider'
import Loading from '../Components/Loading';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({children}) {
    const {user, loading} = useContext(AuthContext);
    

    if(loading){
        return <Loading></Loading>
    }

    if(user&& user?.email){
        return children;
    }else{
        return <Navigate to="/login"></Navigate>
    }
}

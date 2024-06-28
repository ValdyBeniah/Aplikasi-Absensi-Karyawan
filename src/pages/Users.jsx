import React, {useEffect} from 'react'
import Layout from './Layout'
import Userlist from '../component/Userlist'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../features/authSlice'

const Users = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if(isError){
            navigate("/");
        }
        if(user && user.role !== "hrd"){
            navigate("/dashboard");
        };
    }, [isError, user, navigate]);

  return (
    <div>
      <Layout>
        <Userlist />
      </Layout>
    </div>
  )
}

export default Users

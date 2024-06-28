import React, {useEffect} from 'react'
import Layout from './Layout'
import FormAddWfh from '../component/FormAddWfh'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../features/authSlice'

const AddAbsensi = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if(isError){
        navigate("/");
        }
    }, [isError, navigate]);

  return (
    <div>
      <Layout>
        <FormAddWfh />
      </Layout>
    </div>
  )
}

export default AddAbsensi

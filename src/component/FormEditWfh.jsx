// import React from 'react'

// const FormEditWfh = () => {
//   return (
//     <div>
//       <h1 className='title'>Absensi</h1>
//       <h2 className='subtitle'>Edit Data Absensi WFH</h2>
//       <div className="card is-shadowless">
//         <div className="card-content">
//             <div className="content">
//             <form>
//                 <div className="field">
//                     <label className='label'>Name</label>
//                     <div className="control">
//                         <input type="text" className='input' placeholder='Name'/>
//                     </div>
//                 </div>
//                 <div className="field">
//                     <label className='label'>Date</label>
//                     <div className="control">
//                         <input type="date" className='input' placeholder='Date'/>
//                     </div>
//                 </div>
//                 <div className="field">
//                     <label className='label'>Photo</label>
//                     <div className="control">
//                         <input type="file" className='input' accept=".png, .jpg, .jpeg"/>
//                     </div>
//                 </div>
//                 <div className="field">
//                     <div className="control">
//                         <button className='button is-success'>Update</button>
//                     </div>
//                 </div>
//             </form>
//             </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default FormEditWfh

//////////

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const FormEditWfh = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [photo, setPhoto] = useState(null);
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getWfhById();
    }, []);

    const getWfhById = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/wfh/${id}`);
            setName(response.data.name);
            setDate(new Date(response.data.date).toISOString().substring(0, 10)); // format date to yyyy-mm-dd
            setPhoto(response.data.photo);
        } catch (error) {
            if (error.response && typeof error.response.data.msg === 'string') {
                setMsg(error.response.data.msg);
            } else {
                setMsg('An error occurred');
            }
        }
    }

    const updateWfh = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('date', date);
        if (photo instanceof File) {
            formData.append('photo', photo);
        }

        try {
            await axios.patch(`http://localhost:5000/wfh/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/wfh');
        } catch (error) {
            if (error.response && typeof error.response.data.msg === 'string') {
                setMsg(error.response.data.msg);
            } else {
                setMsg('An error occurred');
            }
        }
    }

    return (
        <div>
            <h1 className='title'>Absensi</h1>
            <h2 className='subtitle'>Edit Data Absensi WFH</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updateWfh}>
                            <p className='has-text-centered'>{msg}</p>
                            <div className="field">
                                <label className='label'>Name</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className='input'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder='Name'
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className='label'>Date</label>
                                <div className="control">
                                    <input
                                        type="date"
                                        className='input'
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        placeholder='Date'
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className='label'>Photo</label>
                                <div className="control">
                                    <input
                                        type="file"
                                        className='input'
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        accept=".png, .jpg, .jpeg"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button type='submit' className='button is-success'>Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormEditWfh



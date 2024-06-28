import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const FormEditUsers = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [role, setRole] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getUserById = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/users/${id}`
                );
                setName(response.data.name);
                setEmail(response.data.email);
                setRole(response.data.role);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getUserById();
    }, [id]);

    const updateUser = async (e) => {
        e.preventDefault();
        console.log("Submitting form with data:", {
            name,
            email,
            password,
            confPassword,
            role
        });
        try {
            const response = await axios.patch(`http://localhost:5000/users/${id}`, {
                name,
                email,
                password,
                confPassword,
                role
            });
            console.log("Response from server:", response.data);
            navigate("/users");
        } catch (error) {
            console.error("Error response from server:", error);
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

  return (
    <div>
      <h1 className='title'>Users</h1>
      <h2 className='subtitle'>Update User</h2>
      <div className="card is-shadowless">
        <div className="card-content">
            <div className="content">
            <form onSubmit={updateUser}>
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
                        <label className='label'>Email</label>
                        <div className="control">
                            <input
                                type="text"
                                className='input'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Email' />
                        </div>
                    </div>
                    <div className="field">
                    <label className='label'>Password</label>
                        <div className="control">
                            <input
                                type="password"
                                className='input'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='*****' />
                        </div>
                    </div>
                    <div className="field">
                        <label className='label'>Confirm Password</label>
                        <div className="control">
                            <input
                                type="password"
                                className='input'
                                value={confPassword}
                                onChange={(e) => setConfPassword(e.target.value)}
                                placeholder='*****'
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className='label'>Role</label>
                            <div className="control">
                                <div className="select is-fullwidth">
                                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                                        <option value="">Select Role</option>
                                        <option value="hrd">HRD</option>
                                        <option value="karyawan">Karyawan</option>
                                    </select>
                                </div>
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

export default FormEditUsers

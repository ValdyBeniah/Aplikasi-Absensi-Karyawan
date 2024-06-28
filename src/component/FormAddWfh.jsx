// import React, {useState} from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

// const FormAddWfh = () => {
//     const [name, setName] = useState("");
//     const [date, setDate] = useState("");
//     const [photo, setPhoto] = useState("");
//     const [msg, setMsg] = useState("");
//     const navigate = useNavigate();

//     const saveWfh = async(e) => {
//         e.preventDefault();
//         try {
//             await axios.post('http://localhost:5000/wfh', {
//                 name: name,
//                 date: date,
//                 photo: photo
//             });
//             navigate("/wfh");
//         } catch (error) {
//             if(error.response) {
//                 setMsg(error.response.data.msg);
//             }
//         }
//     }

//   return (
//     <div>
//       <h1 className='title'>Absensi</h1>
//       <h2 className='subtitle'>Input Data Absensi WFH</h2>
//       <div className="card is-shadowless">
//         <div className="card-content">
//             <div className="content">
//             <form onSubmit={saveWfh}>
//                 <p className='has-text-centered'>{msg}</p>
//                 <div className="field">
//                     <label className='label'>Name</label>
//                     <div className="control">
//                         <input 
//                             type="text" 
//                             className='input' 
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             placeholder='Name'
//                         />
//                     </div>
//                 </div>
//                 <div className="field">
//                     <label className='label'>Date</label>
//                     <div className="control">
//                         <input 
//                             type="date" 
//                             className='input'
//                             value={date}
//                             onChange={(e) => setDate(e.target.value)}
//                             placeholder='Date'
//                         />
//                     </div>
//                 </div>
//                 <div className="field">
//                     <label className='label'>Photo</label>
//                     <div className="control">
//                         <input 
//                             type="file" 
//                             className='input'
//                             value={photo}
//                             onChange={(e) => setPhoto(e.target.value)}
//                             accept=".png, .jpg, .jpeg"/>
//                     </div>
//                 </div>
//                 <div className="field">
//                     <div className="control">
//                         <button type='submit' className='button is-success'>Save</button>
//                     </div>
//                 </div>
//             </form>
//             </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default FormAddWfh

import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FormAddWfh = () => {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [photo, setPhoto] = useState(null); // Ubah ini ke null untuk file
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const saveWfh = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('date', date);
        formData.append('photo', photo);

        try {
            await axios.post('http://localhost:5000/wfh', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate("/wfh");
        } catch (error) {
            if(error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

  return (
    <div>
      <h1 className='title'>Absensi</h1>
      <h2 className='subtitle'>Input Data Absensi WFH</h2>
      <div className="card is-shadowless">
        <div className="card-content">
            <div className="content">
            <form onSubmit={saveWfh}>
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
                            onChange={(e) => setPhoto(e.target.files[0])} // Ubah ini untuk file upload
                            accept=".png, .jpg, .jpeg"/>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <button type='submit' className='button is-success'>Save</button>
                    </div>
                </div>
            </form>
            </div>
        </div>
      </div>
    </div>
  )
}

export default FormAddWfh

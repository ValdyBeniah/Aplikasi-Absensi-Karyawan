// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const Wfh = () => {
//     const [wfh, setWfh] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filteredWfh, setFilteredWfh] = useState([]);

//     useEffect(() => {
//         getWfh();
//     }, []);

//     useEffect(() => {
//         setFilteredWfh(
//             wfh.filter(item =>
//                 item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 new Date(item.date).toLocaleDateString().includes(searchTerm)
//             )
//         );
//     }, [searchTerm, wfh]);

//     const getWfh = async () => {
//         const response = await axios.get('http://localhost:5000/wfh');
//         setWfh(response.data);
//     };

//     const deleteWfh = async (wfhId) => {
//         await axios.delete(`http://localhost:5000/wfh/${wfhId}`);
//         getWfh();
//     };

//     return (
//         <div>
//             <h1 className='title'>WFH</h1>
//             <h2 className='subtitle'>Absensi WFH</h2>

//             <nav className="level">
//                 <div className="level-left">
//                     <div className="level-item">
//                         <div className="field has-addons">
//                             <p className="control">
//                                 <input
//                                     className="input"
//                                     type="text"
//                                     placeholder="Find by name or date"
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                 />
//                             </p>
//                             <p className="control">
//                                 <button className="button" onClick={getWfh}>Search</button>
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </nav>

//             <Link to="/wfh/add" className='button is-primary mb-2'>Add New</Link>
//             <table className='table is-striped is-fullwidth'>
//                 <thead>
//                     <tr>
//                         <th>No</th>
//                         <th>Name</th>
//                         <th>Date</th>
//                         <th>Photo</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredWfh.map((wfh, index) => (
//                         <tr key={wfh.uuid}>
//                             <td>{index + 1}</td>
//                             <td>{wfh.name}</td>
//                             <td>{new Date(wfh.date).toLocaleDateString()}</td>
//                             <td>
//                                 {wfh.photo && <img src={wfh.photo} alt={wfh.name} style={{ width: '100px', height: 'auto' }} />}
//                             </td>
//                             <td>
//                                 <Link to={`/wfh/edit/${wfh.uuid}`} className='button is-small is-info'>Edit</Link>
//                                 <button onClick={() => deleteWfh(wfh.uuid)} className='button is-small is-danger'>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Wfh;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Wfh = () => {
    const [wfh, setWfh] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredWfh, setFilteredWfh] = useState([]);
    const [role, setRole] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Jumlah item per halaman

    useEffect(() => {
        getWfh();
        getUserRole();
    }, []);

    useEffect(() => {
        setFilteredWfh(
            wfh.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                new Date(item.date).toLocaleDateString().includes(searchTerm)
            )
        );
    }, [searchTerm, wfh]);

    const getWfh = async () => {
        const response = await axios.get('http://localhost:5000/wfh');
        setWfh(response.data);
    };

    const getUserRole = async () => {
        try {
            const response = await axios.get('http://localhost:5000/user-role');
            setRole(response.data.role);
        } catch (error) {
            console.error("Error getting user role:", error);
        }
    };

    const deleteWfh = async (wfhId) => {
        await axios.delete(`http://localhost:5000/wfh/${wfhId}`);
        getWfh();
    };

    // Logika untuk pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredWfh.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            <h1 className='title'>WFH</h1>
            <h2 className='subtitle'>Absensi WFH</h2>

            <nav className="level">
                <div className="level-left">
                    <div className="level-item">
                        <div className="field has-addons">
                            <p className="control">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Find by name or date"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </p>
                            <p className="control">
                                <button className="button" onClick={getWfh}>Search</button>
                            </p>
                        </div>
                    </div>
                </div>
            </nav>

            {role === 'karyawan' && (
                <Link to="/wfh/add" className='button is-primary mb-2'>Add New</Link>
            )}
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Photo</th>
                        {role === 'karyawan' && <th>Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((wfh, index) => (
                        <tr key={wfh.uuid}>
                            <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                            <td>{wfh.name}</td>
                            <td>{new Date(wfh.date).toLocaleDateString()}</td>
                            <td>
                                {wfh.photo && <img src={wfh.photo} alt={wfh.name} style={{ width: '100px', height: 'auto' }} />}
                            </td>
                            {role === 'karyawan' && (
                                <td>
                                    <Link to={`/wfh/edit/${wfh.uuid}`} className='button is-small is-info mr-2'>Edit</Link>
                                    <button onClick={() => deleteWfh(wfh.uuid)} className='button is-small is-danger'>Delete</button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav className="pagination" role="navigation" aria-label="pagination">
                <a className="pagination-previous" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</a>
                <a className="pagination-next" onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredWfh.length / itemsPerPage)}>Next page</a>
                <ul className="pagination-list">
                    {Array.from({ length: Math.ceil(filteredWfh.length / itemsPerPage) }, (_, i) => (
                        <li key={i}>
                            <a
                                onClick={() => paginate(i + 1)}
                                className={`pagination-link ${currentPage === i + 1 ? 'is-current' : ''}`}
                                aria-label={`Goto page ${i + 1}`}
                            >
                                {i + 1}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Wfh;



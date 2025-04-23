import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'datatables.net';
import $ from "jquery";
import 'datatables.net-dt/css/dataTables.dataTables.css';
import { useNavigate } from 'react-router-dom';
import '../../../styles/UserManagementHover.css'
 



function UserManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate=useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8082/getUser');
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleLock = (firstName) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) => {
              if (user.firstName === firstName) {
               toast.success(`${user.firstName} lock successfully.`);    
                return { ...user, isLocked: true };
              }
              return user;
            })
          );
        }

    const handleUnlock = (lastName) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) => {
              if (user.lastName === lastName) {
             toast.success(`${user.lastName} unlocked successfully.`);
                return { ...user, isLocked: false };
              }
              return user;
            })
          );
        };

        const handleBackToHome = () => {
            navigate('/'); // Navigate to the home route
        };

    useEffect(()=>{
      if(users.length >0) {
      $('#userTable').DataTable()   ;
      }
      return () =>{
        if($.fn.DataTable.isDataTable('#userTable')) {
          $('#userTable').DataTable().destroy();
        }
      }
    },[users]);

    if (loading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <p>Loading users...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>
                <p>Error loading users: {error.message}</p>
            </div>
        );
    }

    if (users.length === 0) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <p>No users found.</p>
            </div>
        );
    }

    return (
        <div className='userManagementBackgroundImage'>
        <div className='' style={{ padding: '20px' }}>
            <ToastContainer />
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>User Management</h2>
            <button className="btn btn-danger" onClick={handleBackToHome} style={{float:'right',marginBottom:'10px'}}>Back to Home</button>
            <table id="userTable" className='table table-striped table-bordered' style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <th style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>NAME</th>
                        <th style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Email</th>
                        <th style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Role</th>
                        <th style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} style={{ borderBottom: '1px solid #ddd' }}>
                            <td className='text-center' style={{ padding: '10px' }}>{user.firstName}</td>
                            {/* <td className='text-center' style={{ padding: '10px' }}>{user._id}</td> */}
                            <td className='text-center' style={{ padding: '10px' }}>{user.email}</td>
                            <td className='text-center' style={{ padding: '10px' }}>{user.role}</td>
                            <td>
                              {user.isLocked ? (
                               <button className="btn btn-danger p-2 m-2" onClick={() => handleUnlock(user.lastName)}>Unlock</button>
                                ) : (
                                 <button className="btn btn-success p-2 m-2" onClick={() => handleLock(user.firstName)}>Lock</button>
                                   )}
                                  </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
}

export default UserManagement;


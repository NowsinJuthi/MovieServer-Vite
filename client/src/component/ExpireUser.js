import axios from 'axios';
import React, { useEffect, useState } from 'react';



function ShowUserData() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/api/v1/user-data");
                setUsers(res.data);
            } catch (error) {
                alert(error.response?.data?.message || "Fetch failed");
            }
        };

        fetchData();
    }, []);


    const deleteHandler = async (id) => {

        const confirmDelete = window.confirm("Are you want to delete this user?");
        if (!confirmDelete) return;


        try {
            await axios.delete(`/api/v1/delete-user/${id}`)
            setUsers(preUser => preUser.filter(user => user._id !== id))
        } catch (error) {
            alert(error.response?.data?.message || "Something wrong");
        }
    };

    return (
        <div className="p-4">
            <table className="table-auto border border-collapse border-gray-300 w-full">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">UserName</th>
                        <th className="border p-2">Password</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">StartDate</th>
                        <th className="border p-2">ExpireDate</th>
                        <th className="border p-2">Permanently deleted</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user) => (
                            <tr className="text-center">
                                <td className="border p-2">{user.username}</td>
                                <td className="border p-2">{user.password}</td>
                                <td className="border p-2">{user.email}</td>
                                <td className="border p-2">{new Date(user.startAt).toLocaleDateString()}</td>
                                <td className="border p-2">{new Date(user.expiresAt).toLocaleDateString()}</td>
                                <td className='border hover:bg-red-400 cursor-pointer' onClick={() => deleteHandler(user._id)}>Delete</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>


           
        </div>
    );
}

export default ShowUserData;

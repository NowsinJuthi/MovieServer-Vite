import axios from 'axios';
import React, { useEffect, useState } from 'react';


function ExpireUser() {
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


    return (
        <div className="p-4">
            <table className="table-auto border border-collapse border-gray-300 w-full text-center">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">UserName</th>
                        <th className="border p-2">Password</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">StartDate</th>
                        <th className="border p-2">ExpireDate</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user) => {
                            const isExpired = new Date(user.expiresAt) < new Date();

                            return (
                                <tr className={isExpired ? "bg-red-200 text-red-800" : ""}>
                                    <td className="border p-2">{user.username}</td>
                                    <td className="border p-2">{user.password}</td>
                                    <td className="border p-2">{user.email}</td>
                                    <td className="border p-2">{new Date(user.startAt).toLocaleDateString()}</td>
                                    <td className="border p-2">{new Date(user.expiresAt).toLocaleDateString()}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>

        </div>
    );
}

export default ExpireUser;

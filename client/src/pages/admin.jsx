import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/admin.css'; // Custom styles if needed
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';


export default function Admin() {
  const [users, setUsers] = useState([]);   // All users from the database
  const [searchQuery, setSearchQuery] = useState('');  // Search input value
  const [filteredUsers, setFilteredUsers] = useState([]);  // Filtered users

  useEffect(() => {
    // Fetch users from the backend
    axios.get('http://localhost:5000/admin')  // Adjust API path as necessary
      .then(response => {
        setUsers(response.data);
        setFilteredUsers(response.data); // Initialize filteredUsers with all users
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  // Handle input change and update the filtered users based on the search query
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered); // Update the filtered users
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/admin/deleteUser?id=${id}`);
        // Remove the deleted user from the state
        setUsers(users.filter(user => user._id !== id));
        setFilteredUsers(filteredUsers.filter(user => user._id !== id));
        toast.success('User deleted successfully');
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Failed to delete user');
      }
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />

      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/loadEditUser?id=${user._id}`}><button>Edit</button></Link>
                <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

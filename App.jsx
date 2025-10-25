  import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", age: "", address: "" });
  const [editingId, setEditingId] = useState(null);

  // Fetch users
  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3000/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create user
  const createUser = async () => {
    await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setFormData({ name: "", age: "", address: "" });
    fetchUsers();
  };

  // Update user
  const updateUser = async () => {
    await fetch(`http://localhost:3000/update/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setFormData({ name: "", age: "", address: "" });
    setEditingId(null);
    fetchUsers();
  };

  // Delete user
  const deleteUser = async (id) => {
    await fetch(`http://localhost:3000/delete/${id}`, {
      method: "DELETE",
    });
    fetchUsers();
  };

  // Edit mode
  const startEdit = (user) => {
    setEditingId(user._id);
    setFormData({ name: user.name, age: user.age, address: user.address });
  };

  return (
  <div>
    <h1>TODO Application</h1>

    <div className="form-container">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
      />

      {editingId ? (
        <button onClick={updateUser} className="buttonU">Update</button>
      ) : (
        <button onClick={createUser} className="buttonC">Create</button>
      )}
    </div>

    <h2 style={{ textAlign: "center",color:"white" }}>TODO List</h2>
    <div className="user-list">
      {users.map((user) => (
        <div key={user._id} className="user-card">
          <h3>{user.name}</h3>
          <p>Age: {user.age}</p>
          <p>Address: {user.address}</p>
          <button onClick={() => startEdit(user)} className="buttonE">Edit</button>
          <button onClick={() => deleteUser(user._id)}className="buttonD">Delete</button>
        </div>
      ))}
    </div>
  </div>
);
}

export default App;
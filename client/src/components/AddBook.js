import React, { useState } from "react";
import "../CSS/AddBook.css";

const AddBook = () => {
  const [formData, setFormData] = useState({
    "Book Name": "",
    Author: "",
    Description: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/admin/add-book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      alert("✅ Book added successfully");
      setFormData({ "Book Name": "", Author: "", Description: "", category: "" });
    } else {
      alert("❌ Failed to add book: " + data.message);
    }
  };

  return (
    <div className="add-book-container">
      <h2>Add New Book</h2>
      <form className="add-book-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="Book Name"
          placeholder="Book Name"
          value={formData["Book Name"]}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Author"
          placeholder="Author"
          value={formData.Author}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Description"
          placeholder="Description"
          value={formData.Description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;

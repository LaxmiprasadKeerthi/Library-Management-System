import React, { useState, useEffect } from "react";
import "../CSS/SearchBar.css";
import axios from "axios";

const SearchBar = () => {
  const [bookData, setBookData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [result, setResult] = useState(null);

  // Fetch all books from the backend on mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/books"); // << your route
        setBookData(res.data);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };

    fetchBooks();
  }, []);

  const handleSearchQueryChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const filtered = bookData.filter((book) =>
        book["Book Name"].toLowerCase().startsWith(query.toLowerCase())
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks([]);
    }
  };

  const handleBookSelection = (book) => {
    setSelectedBook(book);
    setSearchQuery(book["Book Name"]);
    setFilteredBooks([]);
  };

  const handleSearch = () => {
    if (selectedBook) {
      setResult({
        title: selectedBook["Book Name"],
        description: selectedBook.Description || "No description provided.",
      });
    } else {
      setResult({
        title: "Not Found",
        description: "Please select a book from the list.",
      });
    }
  };

  useEffect(() => {
    if (result) {
      const timer = setTimeout(() => {
        setResult(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [result]);

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          placeholder="Search for a book..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {searchQuery && filteredBooks.length > 0 && (
        <ul className="dropdown-list">
          {filteredBooks.map((book, idx) => (
            <li
              key={idx}
              className="dropdown-item"
              onClick={() => handleBookSelection(book)}
            >
              {book["Book Name"]}
            </li>
          ))}
        </ul>
      )}

      {result && (
        <div className="book-info">
          <h4>{result.title}</h4>
          <p>{result.description}</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

import "../CSS/Books.css";
import tech1 from "../assets/books/technical1.jpg";
import tech2 from "../assets/books/technical2.jpg";
import tech3 from "../assets/books/technical3.jpg";
import nontech1 from "../assets/books/nontechnical1.jpg";
import nontech2 from "../assets/books/nontechnical2.jpg";
import nontech3 from "../assets/books/nontechnical3.jpg";

const Books = () => {
  return (
    <div className="books">
      <h2>Explore Our Book Collection</h2>

      <div className="category">
        <h3>Technical Books</h3>
        <div className="book-grid">
          <img src={tech1} alt="Technical Book 1" />
          <img src={tech2} alt="Technical Book 2" />
          <img src={tech3} alt="Technical Book 3" />
        </div>
      </div>

      <div className="category">
        <h3>Non-Technical Books</h3>
        <div className="book-grid">
          <img src={nontech1} alt="Non-Technical Book 1" />
          <img src={nontech2} alt="Non-Technical Book 2" />
          <img src={nontech3} alt="Non-Technical Book 3" />
        </div>
      </div>
    </div>
  );
};

export default Books;

import "../CSS/Contact.css";
import librarianImg from "../assets/librarian.jpg";
import callIcon from "../assets/call.png"; // small icon for phone

const Contact = () => {
  return (
    <div className="contact">
      <h2>Contact Us</h2>
      <div className="contact-card">
        <img src={librarianImg} alt="Librarian" className="librarian-img" />
        <div className="contact-info">
          <h3>Mr.Rakesh Kumar</h3>
          <p>Librarian & Book Coordinator</p>
          <div className="phone">
            <img src={callIcon} alt="Phone Icon" className="call-icon" />
            <span>+12345678910</span>
          </div>
          <p>Email: <a href="mailto:librarian@library.edu">librarian@xyzlibrary.edu</a></p>
        </div>
      </div>
    </div>
  );
};

export default Contact;

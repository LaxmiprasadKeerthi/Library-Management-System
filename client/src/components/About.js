import "../CSS/About.css";
import libraryImg from "../assets/library.jpg";
import studyImg from "../assets/study.jpg";

const About = () => {
  return (
    <div className="about">
      <h2>About Our Library</h2>
      <div className="about-section">
        <div className="about-text">
          <p>
            <strong>Welcome to our state-of-the-art Library Management System!</strong> We aim to provide seamless access to a wide range of books, journals, and digital resources for students, faculty, and staff.
          </p>
          <p>
            <strong>Our library is equipped</strong> with modern infrastructure, a comfortable reading environment, and thousands of curated titles in technical and non-technical domains. Whether you're researching, studying, or simply reading for pleasure, we’ve got a spot for you.
          </p>
          <p>
            <strong>We believe in empowering knowledge seekers</strong> by simplifying the process of borrowing, searching, and pre-booking books—anytime, anywhere.
          </p>
        </div>
        <div className="about-images">
          <img src={libraryImg} alt="Library" />
          <img src={studyImg} alt="Students studying" />
        </div>
      </div>
    </div>
  );
};

export default About;

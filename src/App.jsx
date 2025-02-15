import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./header.css";
import "./footer.css";
import "./home.css";
import "./buttons.css";
import "./cards.css";
import "./experience.css";
import "./about.css";
import "./projects.css";
import "./contact.css";

// Custom Card Component
const Card = ({ children }) => (
  <div className="card">
    <div className="card-content">{children}</div>
  </div>
);

// Custom Button Component
const Button = ({ children, onClick, className }) => (
  <button onClick={onClick} className={`button ${className}`}>
    {children}
  </button>
);

/*Header Section*/
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the menu on/off
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  // Close menu if clicked outside
  const closeMenuIfClickedOutside = (e) => {
    if (e.target.classList.contains("overlay")) {
      setIsMenuOpen(false);
    }
  };

  // Disable/Enable scrolling when menu is open/closed
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overlay-active");
    } else {
      document.body.classList.remove("overlay-active");
    }

    // Adding event listener for clicking outside the overlay
    document.addEventListener("click", closeMenuIfClickedOutside);

    // Clean up on component unmount
    return () => {
      document.removeEventListener("click", closeMenuIfClickedOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Portfolio
        </Link>

        {/* Mobile Menu Button - Hamburger or X depending on state */}
        <div
          className={`nav-toggle ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>

      {/* Transparent overlay */}
      <div className={`overlay ${isMenuOpen ? "active" : ""}`}></div>

      {/* Navigation Menu */}
      <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
        <li className="nav-item">
          <Link
            to="/"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/about"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/projects"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Projects
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/experience"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Experience
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/contact"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </li>
      </ul>
    </header>
  );
};

// Footer Component
const Footer = () => (
  <footer className="footer">
    <p>&copy; 2025 Sayandip Saha. All rights reserved.</p>
    <div className="footer-links">
      <a
        href="https://www.linkedin.com/in/sayandipsaha"
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
      <a
        href="
https://github.com/sayandip007"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
      <a
        href="https://leetcode.com/u/Sayandip007/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Leetcode
      </a>
      <a
        href="https://www.geeksforgeeks.org/user/sayandip007/"
        target="_blank"
        rel="noopener noreferrer"
      >
        GeeksforGeeks
      </a>
      <a
        href="https://mail.google.com/mail/?view=cm&fs=1&to=sayandiplynn@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Contact
      </a>
    </div>
  </footer>
);

// Home Component
const Home = () => {
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [imageSource, setImageSource] = useState("");

  // Function to handle image click
  const handleImageClick = (src) => {
    setImageSource(src);
    setIsOverlayActive(true);
  };

  // Function to handle overlay click to close
  const handleOverlayClick = () => {
    setIsOverlayActive(false);
    setImageSource("");
  };

  // Function to handle resume download
    const handleDownloadResume = () => {
    const resumeUrl = "/resume.pdf";
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.setAttribute("download", "Resume.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  return (
    <section className="home">
      <div className="home-image-section">
        <div
          className="home-image-card"
          onClick={() => handleImageClick("image.jpg")}
        >
          <img src="image.jpg" alt="Sayandip" className="home-image" />
        </div>
      </div>

      <div className="home-canvas">
        {/* Add your 3D content here (or remove this if you don’t want a canvas) */}
      </div>

      <div className="home-content">
        <h2>Hi, I'm Sayandip</h2>
        <p>
          Future Software Engineer | Future Web Developer | Modern Interface
          Expert | Future DSA Expert
        </p>
        <button className="home-button" onClick={handleDownloadResume}>
          Download Resume
        </button>
      </div>

      {/* Overlay and Enlarged Image */}
      {isOverlayActive && (
        <div className="overlay" onClick={handleOverlayClick}>
          <img
            src={imageSource}
            alt="Enlarged Profile"
            className="enlarged-img"
          />
        </div>
      )}
    </section>
  );
};

// About Component
const About = () => (
  <section className="about">
    <h2>About Me</h2>
    <div className="about-content">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
        consectetur magnam aut perferendis, repellat esse, fuga quam hic
        sapiente consequuntur dicta. Sunt possimus iure et repellendus atque
        doloremque ratione consequatur, praesentium, quibusdam eligendi
        obcaecati, maiores odit adipisci! Assumenda blanditiis ab quaerat quam
        non aliquid sunt nesciunt quasi id doloribus est quia labore dolorem
        eaque pariatur enim dolor in delectus nostrum libero similique, neque
        architecto accusamus error? Vitae veritatis.
      </p>
    </div>
    <div className="about-cards">
      <Card>
        <h3>Education</h3>
        <p>
          Bachelor's Degree in Computer Science from XYZ University.
          Specialization in Artificial Intelligence.
        </p>
      </Card>
      <Card>
        <h3>Languages & Tools</h3>
        <ul>
          <li>JavaScript, React, HTML, CSS</li>
          <li>Python, C, Java</li>
          <li>MongoDB, Node.js</li>
        </ul>
      </Card>

      <Card>
        <h3>Experience</h3>
        <p>
          Worked on high-profile projects leveraging cutting-edge tools to solve
          complex technical challenges.
        </p>
      </Card>
      <Card>
        <h3>Achievements</h3>
        <ul>
          <li>
            Participant of Smart India Hackathon 2024 in the 'Fitness and
            Sports' category.
          </li>
          <li>Certified in ChatGPT from SAYANDIP SAHA Institute.</li>
        </ul>
      </Card>
      <Card>
        <h3>Hobbies</h3>
        <ul>
          <li>Listening to Music</li>
          <li>Playing Games</li>
          <li>Motivating Others</li>
        </ul>
      </Card>
    </div>
  </section>
);

// My Experience Component
const experiences = [
  {
    date: "Jan 2023 - Present",
    details:
      "Working as a Software Engineer, specializing in front-end development and user experience design.",
  },
  {
    date: "Jan 2023 - Present",
    details:
      "Working as a Software Engineer, specializing in front-end development and user experience design.",
  },
  {
    date: "Jan 2023 - Present",
    details:
      "Working as a Software Engineer, specializing in front-end development and user experience design.",
  },
  {
    date: "Aug 2021 - Dec 2022",
    details:
      "Contributed to an open-source project that involved integrating machine learning models into web platforms.",
  },
  {
    date: "Mar 2020 - Jul 2021",
    details:
      "Interned at a tech startup, helping develop a chatbot for customer support automation.",
  },
];

const MyExperience = () => {
  return (
    <div className="my-experience">
      <h1 className="experience-header">My Experiences</h1>
      <div className="experience-cards">
        {experiences.map((experience, index) => (
          <div key={index} className="experience-card">
            <h2 className="experience-date">{experience.date}</h2>
            <p className="experience-details">{experience.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Projects Component
const Projects = () => (
  <section className="projects">
    <h2>Projects</h2>
    <div className="projects-grid">
      {[
        "Interactive 3D Portfolio",
        "AI-Driven Analytics App",
        "Virtual Reality Tour Guide",
        "Real-Time Chat App",
        "Real-Time Chat App",
      ].map((project, index) => (
        <div key={index} className="project-card">
          <h3>{project}</h3>
          <p>
            An advanced project featuring cutting-edge technologies designed to
            deliver outstanding user experiences.
          </p>
        </div>
      ))}
    </div>
  </section>
);

// Contact Component
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [statusMessage, setStatusMessage] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation (you can expand this based on your needs)
    if (!formData.name || !formData.email || !formData.message) {
      setStatusMessage({ type: 'error', message: 'All fields are required.' });
      return;
    }

    // Simulate successful form submission
    setStatusMessage({
      type: 'success',
      message: 'Your message has been sent successfully!',
    });

    // Reset form data (optional)
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <section className="contact-page">
      <div className="contact-container">
        {/* Left Section */}
        <div className="contact-info">
          <h3>Name</h3>
          <p>User 1234</p>

          <h3>Address</h3>
          <p>123 Street, City, Country</p>

          <h3>Phone</h3>
          <p>+91 12345 67890</p>

          <h3>Email</h3>
          <p>User1234@gmail.com</p>
        </div>

        {/* Right Section */}
        <div className="contact-form-section">
          <h2>Contact US</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Comment or Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here"
              ></textarea>
            </div>

            {statusMessage.message && (
              <div
                className={`status-message ${
                  statusMessage.type === 'success' ? 'success' : 'error'
                }`}
              >
                {statusMessage.message}
              </div>
            )}

            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const App = () => (
  <Router>
    <div className="app">
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<MyExperience />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </Router>
);

export default App;

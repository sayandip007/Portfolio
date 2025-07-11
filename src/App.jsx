import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./header.css";
import "./footer.css";
import "./home.css";
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
  const [isLaptop, setIsLaptop] = useState(window.innerWidth >= 1024);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "enabled"
  );

  // Toggle the menu on/off
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  // Check if the device is a laptop
  useEffect(() => {
    const handleResize = () => {
      setIsLaptop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

    document.addEventListener("click", closeMenuIfClickedOutside);
    return () => {
      document.removeEventListener("click", closeMenuIfClickedOutside);
    };
  }, [isMenuOpen]);

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    }
  }, [darkMode]);

  return (
    <header className="navbar primary secondary">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Portfolio
        </Link>
        {/* Show menu inline for laptops */}
        {isLaptop ? (
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/projects" className="nav-link">
                Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/experience" className="nav-link">
                Experience
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </li>
          </ul>
        ) : (
          <>
            <div
              className={`nav-toggle ${isMenuOpen ? "open" : ""}`}
              onClick={toggleMenu}
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
            <div className={`overlay ${isMenuOpen ? "active" : ""}`}></div>
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
          </>
        )}
        {/* Dark mode toggle button */}
        <button
          className="dark-mode-button"
          onClick={() => setDarkMode((prevMode) => !prevMode)}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
};

// Footer Component
const Footer = () => {
  const handleContactClick = (event) => {
    event.preventDefault();

    const email = "sayandiplynn@gmail.com";
    const mobileLink = `mailto:${email}`;
    const desktopLink = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${email}`;

    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.location.href = mobileLink;
    } else {
      window.open(desktopLink, "_blank");
    }
  };

  return (
    <footer className="footer">
      <p>&copy; 2025 Sayandip Saha. All rights reserved.</p>
      <div className="footer-links">
        <a
          href="https://www.linkedin.com/in/sayandip007/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/sayandip007"
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
        <a href="#" onClick={handleContactClick} style={{}}>
          Contact
        </a>
      </div>
    </footer>
  );
};

// Home Component

const Home = () => {
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [imageSource, setImageSource] = useState("");
  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = ["Code", "Build", "Innovate"];
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const delayBetweenPhrases = 1500;

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting && charIndex < currentPhrase.length) {
      setTimeout(() => {
        setTypedText((prev) => prev + currentPhrase[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
      setTimeout(() => {
        setTypedText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      }, deletingSpeed);
    } else if (!isDeleting && charIndex === currentPhrase.length) {
      setTimeout(() => setIsDeleting(true), delayBetweenPhrases);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }
  }, [charIndex, isDeleting]);

  const handleImageClick = (src) => {
    setImageSource(src);
    setIsOverlayActive(true);
  };

  const handleOverlayClick = () => {
    setIsOverlayActive(false);
    setImageSource("");
  };

  const handleDownloadResume = () => {
    const resumeUrl = "/resume.pdf";
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.setAttribute("download", "Resume.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isDarkMode = document.body.classList.contains("dark-mode");

  return (
    <section className={`home primary secondary ${isDarkMode ? "dark" : ""}`}>
      <div className="home-image-section">
        <div
          className="home-image-card"
          onClick={() => handleImageClick("image.jpg")}
        >
          <img src="image.jpg" alt="Sayandip" className="home-image" />
        </div>
      </div>

      <div className="home-content">
        <h2 className="aurora-text">Hi, I'm Sayandip</h2>

        {/* Typing Animation */}
        <p className="typing-text">
          {typedText}
          <span className="cursor">|</span>
        </p>

        <button className="home-button" onClick={handleDownloadResume}>
          Download Resume
        </button>
      </div>

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
const About = ({ isDarkMode }) => (
  <section className={`about ${isDarkMode ? "dark-mode" : ""}`}>
    <h2>About Me</h2>
    <div className="about-content">
      <p>
        Hey there! I’m Sayandip Saha, a passionate and curious full-stack
        developer with a love for building sleek, scalable, and impactful
        digital experiences. Whether it’s crafting interactive UIs with React,
        securing servers with Node.js, or modeling smart databases with MongoDB,
        I thrive at every step of the development journey. I’ve worked on
        exciting projects like an Online Voting System, a Real-Time Weather
        Dashboard — blending creativity, technology, and purpose. Alongside
        development, I’ve solved 250+ coding problems on LeetCode and GFG,
        sharpening my DSA skills one line of logic at a time. Currently, I'm
        actively exploring opportunities to grow as a developer, collaborate on
        meaningful projects, and bring fresh ideas to life. When I’m not coding,
        you’ll probably find me playing games, or vibing to music while dreaming
        up my next big idea! Let’s build something amazing together!
      </p>
    </div>
    <div className="about-cards">
      <Card>
        <h3>Education</h3>
        <p>
          B.Tech in Information Technology from Maghnad Saha Institute of
          Technology. Secured an overall CGPA of 7.61 till now.
        </p>
      </Card>
      <Card>
        <h3>Technologies</h3>
        <ul>
          <li>JavaScript, React.js, Tailwind CSS</li>
          <li>Node.js, Express.js</li>
          <li>MongoDB</li>
          <li>Java</li>
        </ul>
      </Card>
      <Card>
        <h3>Achievements</h3>
        <ul>
          <li>
            Participant of Smart India Hackathon 2024 in the 'Fitness and
            Sports' category.
          </li>
          <li>
            Solved 250+ DSA Problems across LeetCpde and GFG (Arrays, Linked
            List, Stacks, etc.)
          </li>
          <li>
            Earned Internship & Simulation Certificates from industry-recognized
            platforms.
          </li>
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
    date: "July 2025",
    title: "Deloitte Australia Data Analytics Job Simulation on Forage",
    details:
      "I successfully completed a Deloitte job simulation focused on data analysis and forensic technology, gaining hands-on experience with real-world business scenarios. As part of the simulation, I built a dynamic data dashboard using Tableau to visualize trends and insights. Additionally, I utilized Microsoft Excel to organize, classify, and interpret large datasets—drawing meaningful business conclusions and showcasing my analytical thinking and attention to detail.",
  },
  {
    date: "June 2025",
    title: "Web Development Intern – Pinnacle Labs",
    details:
      "Focused on strengthening frontend development skills by working on multiple internal projects. Gained hands-on experience with React.js, Tailwind CSS, and modern development practices while building responsive and user-friendly web interfaces.",
  },
];

const MyExperience = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`my-experience ${isDarkMode ? "dark-mode" : ""}`}>
      <h1 className="experience-header">My Experiences</h1>
      <div className="experience-cards">
        {experiences.map((experience, index) => (
          <div key={index} className="experience-card">
            <h2 className="experience-date">{experience.date}</h2>
            <h3 className="experience-title">{experience.title}</h3>
            <p className="experience-details">{experience.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Projects Component
const projectsData = [
  {
    title: "Online Voting System",
    description:
      "A secure and user-friendly voting platform that allows users to cast votes online with authentication and result transparency.",
    techStack: ["HTML", "CSS", "Javascript"],
    liveDemo: "https://voting-software.netlify.app/",
    image: "/ovs.png",
  },
  {
    title: "Weather Web App",
    description:
      "A modern real-time weather dashboard with animated UI and live weather data using OpenWeatherMap API.",
    techStack: ["React", "Tailwind CSS", "OpenWeatherMap API"],
    liveDemo: "https://weather-web-dashboard.netlify.app/",
    image: "/wwa.png",
  },
  {
    title: "To-Do List App",
    description:
      "A lightweight and clean productivity app to manage daily tasks with add/edit/delete and completion tracking features.",
    techStack: ["React", "Tailwind CSS"],
    liveDemo: "https://todo-listcreate.netlify.app/",
    image: "/tdl.png",
  },
  {
    title: "Uber Clone (Work In Progress)",
    description:
      "Developing a ride-hailing application inspired by Uber with real-time ride booking and location tracking features.",
    techStack: [],
    liveDemo: "#",
    image: "/uc.png",
  },
];

const Projects = ({ darkMode }) => (
  <section className={`projects ${darkMode ? "dark-mode" : ""}`}>
    <h2>Projects</h2>

    <div className="projects-grid">
      {projectsData.map((project, index) => (
        <div key={index} className="project-card">
          <h3>{project.title}</h3>
          <img
            src={project.image}
            alt={`${project.title} Screenshot`}
            className="project-image"
          />
          <p>
            <em>{project.category}</em>
          </p>
          <p>{project.description}</p>
          <p>
            <strong>Tech Stack:</strong> {project.techStack.join(", ")}
          </p>
          <div className="project-links">
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Demo
            </a>
          </div>
        </div>
      ))}
    </div>
  </section>
);

// Contact Component
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [statusMessage, setStatusMessage] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatusMessage({ type: "error", message: "All fields are required." });
      return;
    }
    setStatusMessage({
      type: "success",
      message: "Your message has been sent successfully!",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="contact-section">
      <h2 className="contact-header">Contact Us</h2>
      <div className="contact-container">
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
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            className="contact-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
          />
          <input
            className="contact-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
          />
          <textarea
            className="contact-textarea"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
          ></textarea>
          <button className="contact-button" type="submit">
            Send Message
          </button>
          {statusMessage.message && (
            <p className={`status-message ${statusMessage.type}`}>
              {statusMessage.message}
            </p>
          )}
        </form>
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

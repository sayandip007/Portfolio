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
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/projects" className="nav-link">Projects</Link>
            </li>
            <li className="nav-item">
              <Link to="/experience" className="nav-link">Experience</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">Contact</Link>
            </li>
          </ul>
        ) : (
          <>
            <div className={`nav-toggle ${isMenuOpen ? "open" : ""}`} onClick={toggleMenu}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
            <div className={`overlay ${isMenuOpen ? "active" : ""}`}></div>
            <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
              <li className="nav-item">
                <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About</Link>
              </li>
              <li className="nav-item">
                <Link to="/projects" className="nav-link" onClick={() => setIsMenuOpen(false)}>Projects</Link>
              </li>
              <li className="nav-item">
                <Link to="/experience" className="nav-link" onClick={() => setIsMenuOpen(false)}>Experience</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contact</Link>
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
        <a href="https://www.linkedin.com/in/sayandipsaha" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href="https://github.com/sayandip007" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="https://leetcode.com/u/Sayandip007/" target="_blank" rel="noopener noreferrer">
          Leetcode
        </a>
        <a href="https://www.geeksforgeeks.org/user/sayandip007/" target="_blank" rel="noopener noreferrer">
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

  const phrases = [
    "Future Software Engineer",
    "Future Web Developer",
    "Modern Interface Expert",
    "Future DSA Expert",
  ];
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
    <section className={`home primary secondary ${isDarkMode ? 'dark' : ''}`}>
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

        {/* Static Tagline */}
        <p className="static-tagline">Code. Build. Innovate. 🚀</p>

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
  <section className={`about ${isDarkMode ? 'dark-mode' : ''}`}>
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
    title: "Interactive 3D Portfolio",
    category: "Web",
    description: "A stunning 3D web portfolio using Three.js and React.",
    techStack: ["React", "Three.js", "GSAP"],
    liveDemo: "#",
    github: "#",
  },
  {
    title: "AI-Driven Analytics App",
    category: "AI",
    description: "AI-powered insights for business intelligence.",
    techStack: ["Python", "TensorFlow", "Flask"],
    liveDemo: "#",
    github: "#",
  },
  {
    title: "Virtual Reality Tour Guide",
    category: "Mobile Apps",
    description:
      "A VR-powered application for interactive tourism experiences.",
    techStack: ["Unity", "C#", "VR SDKs"],
    liveDemo: "#",
    github: "#",
  },
  {
    title: "Real-Time Chat App",
    category: "Web",
    description: "A scalable chat application with real-time messaging.",
    techStack: ["React", "Node.js", "Socket.io"],
    liveDemo: "#",
    github: "#",
  },
];

const Projects = ({ darkMode }) => (
  <section className={`projects ${darkMode ? 'dark-mode' : ''}`}>
    <h2>Projects</h2>

    <div className="projects-grid">
      {projectsData.map((project, index) => (
        <div key={index} className="project-card">
          <h3>{project.title}</h3>
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
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>
      ))}
    </div>
  </section>
);

// Contact Component
const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [statusMessage, setStatusMessage] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatusMessage({ type: 'error', message: 'All fields are required.' });
      return;
    }
    setStatusMessage({ type: 'success', message: 'Your message has been sent successfully!' });
    setFormData({ name: '', email: '', message: '' });
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
            <p className={`status-message ${statusMessage.type}`}>{statusMessage.message}</p>
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

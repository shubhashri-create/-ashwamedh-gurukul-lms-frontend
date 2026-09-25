import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { api, login, logout } from "./api";

// Translations dictionary for English & Marathi
const TRANSLATIONS = {
  en: {
    brand: "Ashwamedh Gurukul Foundation",
    location: "Parbhani",
    tagline: "Tradition + Technology",
    dashboard: "Dashboard",
    courses: "All Courses",
    myLearning: "My Learning",
    login: "Login",
    register: "Register",
    logout: "Logout",
    heroTitle: "Learn with values. Grow with modern skills.",
    heroSubtitle: "A Learning Management System combining Gurukul-oriented learning with modern education and technology.",
    gurukulTitle: "Gurukul Education",
    gurukulDesc: "Yoga, Samskriti, Vedic Mathematics, discipline, and moral values.",
    modernTitle: "Modern Education",
    modernDesc: "Python, Web Development, AI, Cybersecurity, and Data Science.",
    explore: "Explore Courses",
    welcome: "Welcome",
    footerText: "Ashwamedh Gurukul Foundation, Parbhani. All Rights Reserved."
  },
  mr: {
    brand: "अश्वमेध गुरुकुल फाउंडेशन",
    location: "परभणी",
    tagline: "संस्कार + आधुनिक तंत्रज्ञान",
    dashboard: "डॅशबोर्ड",
    courses: "सर्व अभ्यासक्रम",
    myLearning: "माझे शिक्षण",
    login: "लॉगिन",
    register: "नोंदणी",
    logout: "लॉगआउट",
    heroTitle: "संस्कारयुक्त शिक्षण आणि आधुनिक कौशल्यांचा संगम.",
    heroSubtitle: "गुरुकुल परंपरा, वैदिक मूल्ये आणि संगणकीय तंत्रज्ञान शिकण्याचे व्यासपीठ.",
    gurukulTitle: "गुरुकुल शिक्षण",
    gurukulDesc: "योग, संस्कृती, वैदिक गणित, शिस्त आणि नैतिक मूल्ये.",
    modernTitle: "आधुनिक शिक्षण",
    modernDesc: "पायथन, वेब डेव्हलपमेंट, एआय आणि सायबर सुरक्षा.",
    explore: "अभ्यासक्रम पहा",
    welcome: "सुस्वागतम",
    footerText: "अश्वमेध गुरुकुल फाउंडेशन, परभणी. सर्व हक्क सुरक्षित."
  }
};

// Default course catalog fallback if API returns empty list
const ALL_COURSES = [
  {
    id: 1,
    title: "Python Full Stack Development",
    category: "modern",
    description: "Master Python, Django, REST APIs, MySQL, and React frontend integration.",
    level: "Intermediate",
    duration: "12 Weeks",
    lessons_count: 24,
    instructor: "Shubhashri"
  },
  {
    id: 2,
    title: "Vedic Mathematics & Mental Math",
    category: "gurukul",
    description: "Learn ancient Indian mathematical shortcuts to perform rapid mental calculations.",
    level: "Beginner to Advanced",
    duration: "6 Weeks",
    lessons_count: 12,
    instructor: "Gurukul Acharya"
  },
  {
    id: 3,
    title: "Web Development Fundamentals (HTML/CSS/JS)",
    category: "modern",
    description: "Build modern, responsive websites using HTML5, CSS3, JavaScript, and Bootstrap.",
    level: "Beginner",
    duration: "8 Weeks",
    lessons_count: 16,
    instructor: "Tech Mentor"
  },
  {
    id: 4,
    title: "Yoga, Pranayama & Moral Values",
    category: "gurukul",
    description: "Daily practices for mental clarity, physical health, self-discipline, and ethics.",
    level: "All Levels",
    duration: "4 Weeks",
    lessons_count: 10,
    instructor: "Yogacharya"
  },
  {
    id: 5,
    title: "Data Structures & System Design in Python",
    category: "modern",
    description: "Prepare for technical interviews with modular architecture, OOPs, and problem-solving.",
    level: "Advanced",
    duration: "10 Weeks",
    lessons_count: 20,
    instructor: "Senior Developer"
  },
  {
    id: 6,
    title: "Samskriti & Vedic Heritage Studies",
    category: "gurukul",
    description: "Understand foundational Sanskrit slokas, Indian cultural heritage, and values.",
    level: "Beginner",
    duration: "6 Weeks",
    lessons_count: 12,
    instructor: "Sanskrit Scholar"
  }
];

function Layout({ children, lang, setLang }) {
  const navigate = useNavigate();
  const loggedIn = Boolean(localStorage.getItem("access"));
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [imgError, setImgError] = useState(false);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <>
      {/* Parbhani Top Announcement Banner */}
      <div style={{ background: "#5c0000", color: "#fef08a", textAlign: "center", padding: "6px 12px", fontSize: "0.85rem", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
        <img
          src="/assets/header-logo.png"
          alt="Header Logo"
          style={{ height: "20px", width: "auto", objectFit: "contain" }}
          onError={(e) => {
            if (e.target.src.includes("/assets/header-logo.png")) {
              e.target.src = "/logo.png";
            } else {
              e.target.style.display = "none";
            }
          }}
        />
        <span>{t.brand} ({t.location}) — {t.tagline}</span>
      </div>

      <header className="navbar">
        {/* Brand Link with correct public path */}
        <Link to="/" className="brand" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          {!imgError ? (
            <img
              src="/assets/header-logo.png"
              alt="Ashwamedh Gurukul Foundation"
              style={{ height: "48px", width: "auto", objectFit: "contain" }}
              onError={(e) => {
                if (e.target.src.includes("/assets/header-logo.png")) {
                  e.target.src = "/logo.png";
                } else {
                  setImgError(true);
                }
              }}
            />
          ) : (
            <span style={{ fontSize: "1.8rem" }}>🚩</span>
          )}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#8b0000", lineHeight: "1.1" }}>{t.brand}</span>
            <small style={{ fontSize: "0.75rem", color: "#6b7280" }}>{t.location}</small>
          </div>
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link to="/">{t.dashboard}</Link>
          <Link to="/courses">{t.courses}</Link>
          {loggedIn ? (
            <>
              <Link to="/my-courses">{t.myLearning}</Link>
              <button className="link-button" onClick={handleLogout}>{t.logout}</button>
            </>
          ) : (
            <>
              <Link to="/login">{t.login}</Link>
              <Link to="/register">{t.register}</Link>
            </>
          )}

          {/* Language Toggle Button */}
          <div style={{ marginLeft: "10px", display: "flex", gap: "4px" }}>
            <button
              onClick={() => setLang("en")}
              style={{ padding: "3px 8px", cursor: "pointer", borderRadius: "4px", border: "1px solid #ccc", background: lang === "en" ? "#8b0000" : "#fff", color: lang === "en" ? "#fff" : "#000" }}
            >
              EN
            </button>
            <button
              onClick={() => setLang("mr")}
              style={{ padding: "3px 8px", cursor: "pointer", borderRadius: "4px", border: "1px solid #ccc", background: lang === "mr" ? "#8b0000" : "#fff", color: lang === "mr" ? "#fff" : "#000" }}
            >
              मराठी
            </button>
          </div>
        </nav>
      </header>

      <main className="container">{children}</main>

      <footer style={{ marginTop: "3rem", background: "#1f2937", color: "#9ca3af", padding: "1.5rem", textAlign: "center", fontSize: "0.85rem" }}>
        <p>© 2026 {t.footerText}</p>
      </footer>
    </>
  );
}

function Dashboard({ lang }) {
  const username = localStorage.getItem("username") || "Student";
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <div>
      <section className="hero">
        <div>
          <p className="eyebrow">{t.tagline}</p>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroSubtitle}</p>
          <Link className="btn" to="/courses">{t.explore}</Link>
        </div>
      </section>

      <h2>{t.welcome}, {username} 👋</h2>

      <div className="grid two">
        <div className="category-card">
          <span>🧘</span>
          <h3>{t.gurukulTitle}</h3>
          <p>{t.gurukulDesc}</p>
          <Link to="/courses?category=gurukul">{t.explore}</Link>
        </div>
        <div className="category-card">
          <span>💻</span>
          <h3>{t.modernTitle}</h3>
          <p>{t.modernDesc}</p>
          <Link to="/courses?category=modern">{t.explore}</Link>
        </div>
      </div>
    </div>
  );
}

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("demo");
  const [password, setPassword] = useState("Demo@12345");
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("Please fill in both fields.");
      return;
    }
    try {
      await login(username, password);
      navigate("/");
    } catch {
      setError("Invalid username or password.");
    }
  }

  return (
    <div className="auth-card">
      <h2>Student Login</h2>
      <p>Use demo / Demo@12345 after running seed_data.</p>
      {error && <div className="error">{error}</div>}
      <form onSubmit={submit}>
        <label>Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} required />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn full" type="submit">Login</button>
      </form>
      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "", first_name: "", last_name: "", email: "", password: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!form.username || !form.password) {
      setError("Username and password are required.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      await api.post("/auth/register/", form);
      setMessage("Registration successful. Please login.");
      setTimeout(() => navigate("/login"), 800);
    } catch (err) {
      setError(JSON.stringify(err.response?.data || "Registration failed"));
    }
  }

  return (
    <div className="auth-card">
      <h2>Create Student Account</h2>
      {message && <div className="success">{message}</div>}
      {error && <div className="error">{error}</div>}
      <form onSubmit={submit}>
        <input name="username" placeholder="Username *" onChange={update} required />
        <input name="first_name" placeholder="First name" onChange={update} />
        <input name="last_name" placeholder="Last name" onChange={update} />
        <input name="email" type="email" placeholder="Email" onChange={update} />
        <input name="password" type="password" placeholder="Password *" onChange={update} required />
        <button className="btn full" type="submit">Register</button>
      </form>
      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

function Courses() {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    api.get("/courses/", { params: filter ? { category: filter } : {} })
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setCourses(res.data);
        } else {
          const filtered = filter ? ALL_COURSES.filter(c => c.category === filter) : ALL_COURSES;
          setCourses(filtered);
        }
      })
      .catch(() => {
        const filtered = filter ? ALL_COURSES.filter(c => c.category === filter) : ALL_COURSES;
        setCourses(filtered);
      });
  }, [filter]);

  return (
    <div>
      <div className="page-heading">
        <div>
          <p className="eyebrow">LEARNING CATALOG</p>
          <h1>All Courses</h1>
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All Categories</option>
          <option value="gurukul">Gurukul Education</option>
          <option value="modern">Modern Education</option>
        </select>
      </div>

      <div className="grid">
        {courses.map((course) => (
          <div className="course-card" key={course.id}>
            <span className={`badge ${course.category}`}>
              {course.category === "gurukul" ? "Gurukul" : "Modern"}
            </span>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <small>{course.level} · {course.duration} · {course.lessons_count || 12} lessons</small>
            <Link className="btn" to={`/courses/${course.id}`}>View Course</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function CourseDetails() {
  const id = window.location.pathname.split("/").pop();
  const [course, setCourse] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get(`/courses/${id}/`)
      .then((res) => setCourse(res.data))
      .catch(() => {
        const found = ALL_COURSES.find(c => c.id === parseInt(id)) || ALL_COURSES[0];
        setCourse({
          ...found,
          lessons: [
            { id: 101, order: 1, title: "Introduction & Setup", content: "Overview of course goals and foundational principles." },
            { id: 102, order: 2, title: "Core Modules & Practice", content: "In-depth practical concepts and hands-on exercises." }
          ]
        });
      });
  }, [id]);

  async function enroll() {
    if (!localStorage.getItem("access")) {
      window.location.href = "/login";
      return;
    }
    try {
      const res = await api.post(`/courses/${id}/enroll/`);
      setMessage(res.data.message);
    } catch {
      setMessage("Enrolled successfully in demo mode.");
    }
  }

  if (!course) return <p>Loading course details...</p>;

  return (
    <div>
      <div className="detail-card">
        <span className={`badge ${course.category}`}>{course.category}</span>
        <h1>{course.title}</h1>
        <p>{course.description}</p>
        <p><b>Instructor:</b> {course.instructor}</p>
        <p><b>Level:</b> {course.level} &nbsp; <b>Duration:</b> {course.duration}</p>
        <button className="btn" onClick={enroll}>Enroll Now</button>
        {message && <div className="success">{message}</div>}
      </div>

      <h2>Lessons</h2>
      <div className="lessons">
        {(course.lessons || []).map((lesson) => (
          <div className="lesson" key={lesson.id}>
            <span>{lesson.order}</span>
            <div>
              <h3>{lesson.title}</h3>
              <p>{lesson.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MyCourses() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/my-courses/")
      .then((res) => setItems(res.data))
      .catch(() => setError("Please login first."));
  }, []);

  return (
    <div>
      <h1>My Learning</h1>
      {error && <div className="error">{error}</div>}
      {!error && items.length === 0 && <p>You have not enrolled in any course yet.</p>}
      <div className="grid">
        {items.map((item) => (
          <div className="course-card" key={item.id}>
            <h3>{item.course_title}</h3>
            <p>Enrolled on: {new Date(item.enrolled_at || Date.now()).toLocaleDateString()}</p>
            <span className="progress-label">Progress tracking enabled</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotFound() {
  return <div><h1>404</h1><p>Page not found.</p></div>;
}

export default function App() {
  const [lang, setLang] = useState("en");

  return (
    <Layout lang={lang} setLang={setLang}>
      <Routes>
        <Route path="/" element={<Dashboard lang={lang} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
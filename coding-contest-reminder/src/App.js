import React, { useState, useEffect } from "react";
import './style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const contests = [
  { id: 1, title: "LeetCode Weekly Contest", platform: "leetcode", date: "2025-10-19", time: "08:00", duration: "2 hrs" },
  { id: 2, title: "LeetCode Biweekly Contest", platform: "leetcode", date: "2025-10-25", time: "20:00", duration: "2 hrs" },
  { id: 3, title: "CodeChef starters 208", platform: "codechef", date: "2025-10-15", time: "20:00", duration: "2 hrs" },
  { id: 4, title: "HackerRank Weekly Challenge", platform: "hackerrank", date: "2025-10-21", time: "12:00", duration: "1 hr" },
  { id: 5, title: "Codeforces Round 1058", platform: "codeforces", date: "2025-10-12", time: "20:00", duration: "2 hrs" },
  { id: 6, title: "AtCoder Beginner Contest 428", platform: "atcoder", date: "2025-10-18", time: "17:30", duration: "1:30 hrs" },
  { id: 7, title: "Google Kick Start Round H", platform: "kickstart", date: "2025-10-24", time: "13:00", duration: "3 hrs" },
  { id: 8, title: "Codewars Kata Challenge", platform: "codewars", date: "2025-10-27", time: "Anytime", duration: "Ongoing" },
];

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedTime, setSelectedTime] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalContest, setModalContest] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const filterContests = () => {
    return contests.filter(contest => {
      const matchPlatform = selectedPlatform === "all" || contest.platform === selectedPlatform;
      const matchSearch = contest.title.toLowerCase().includes(searchQuery.toLowerCase());

      if (selectedTime === "all") return matchPlatform && matchSearch;

      const today = new Date();
      const contestDate = new Date(contest.date);

      if (selectedTime === "today") return matchPlatform && matchSearch && contestDate.toDateString() === today.toDateString();
      if (selectedTime === "week") {
        const weekEnd = new Date(today);
        weekEnd.setDate(today.getDate() + 7);
        return matchPlatform && matchSearch && contestDate >= today && contestDate <= weekEnd;
      }
      if (selectedTime === "month") {
        const monthEnd = new Date(today);
        monthEnd.setMonth(today.getMonth() + 1);
        return matchPlatform && matchSearch && contestDate >= today && contestDate <= monthEnd;
      }

      return matchPlatform && matchSearch;
    });
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo"><i className="fas fa-code"></i> <h1>Contest Reminder</h1></div>
          <div className="header-controls">
            <button className="theme-toggle" onClick={toggleTheme}><i className={`fas ${theme === "light" ? "fa-moon" : "fa-sun"}`}></i></button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="main">
        <section className="hero">
          <div className="hero-content">
            <h2>Never Miss a Coding Contest</h2>
            <p>Stay updated with upcoming contests from multiple platforms</p>
            <div className="search-bar">
              <input type="text" placeholder="Search contests..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              <i className="fas fa-search"></i>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="filters">
          <div className="filter-group">
            <label>Platform:</label>
            <div className="filter-buttons">
              {["all","leetcode","codechef","hackerrank","codeforces","atcoder","kickstart","codewars"].map(platform => (
                <button key={platform} className={`filter-btn ${selectedPlatform===platform?"active":""}`} onClick={() => setSelectedPlatform(platform)}>{platform.charAt(0).toUpperCase() + platform.slice(1)}</button>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <label>Time Range:</label>
            <div className="filter-buttons">
              {["all","today","week","month"].map(time => (
                <button key={time} className={`filter-btn ${selectedTime===time?"active":""}`} onClick={() => setSelectedTime(time)}>{time.charAt(0).toUpperCase() + time.slice(1)}</button>
              ))}
            </div>
          </div>
        </section>

        {/* Contest Cards */}
        <section className="contests-section">
          <h3>Upcoming Contests</h3>
          <div className="contests-grid">
            {filterContests().map(contest => (
              <div key={contest.id} className={`contest-card platform-${contest.platform}`} onClick={()=>setModalContest(contest)}>
                <h4>{contest.title}</h4>
                <p>{contest.date} | {contest.time}</p>
                <span>{contest.platform}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Modal */}
      {modalContest && (
        <div className="modal" onClick={()=>setModalContest(null)}>
          <div className="modal-content" onClick={e=>e.stopPropagation()}>
            <h3>{modalContest.title}</h3>
            <p>Date: {modalContest.date}</p>
            <p>Time: {modalContest.time}</p>
            <p>Duration: {modalContest.duration}</p>
            <p>Platform: {modalContest.platform}</p>
            <button onClick={()=>setModalContest(null)}>Close</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;

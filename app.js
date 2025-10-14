const { useState, useEffect, useCallback, useMemo } = React;

// Sample contest data - in a real app, this would come from APIs
const sampleContests = [
    {
        id: 1,
        title: "Weekly Contest 365",
        platform: "leetcode",
        startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        duration: 90, // minutes
        difficulty: "Medium",
        participants: 15000,
        url: "https://leetcode.com/contest/weekly-contest-365"
    },
    {
        id: 2,
        title: "Starters 120",
        platform: "codechef",
        startTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
        duration: 120,
        difficulty: "Easy",
        participants: 8500,
        url: "https://www.codechef.com/START120"
    },
    {
        id: 3,
        title: "Codeforces Round 920",
        platform: "codeforces",
        startTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        duration: 135,
        difficulty: "Hard",
        participants: 25000,
        url: "https://codeforces.com/contest/920"
    },
    {
        id: 4,
        title: "HackerRank Weekly Challenge",
        platform: "hackerrank",
        startTime: new Date(Date.now() + 5 * 60 * 60 * 1000), // 5 hours from now
        duration: 60,
        difficulty: "Easy",
        participants: 12000,
        url: "https://www.hackerrank.com/contests/weekly-challenge"
    },
    {
        id: 5,
        title: "Biweekly Contest 120",
        platform: "leetcode",
        startTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        duration: 90,
        difficulty: "Hard",
        participants: 18000,
        url: "https://leetcode.com/contest/biweekly-contest-120"
    },
    {
        id: 6,
        title: "CodeChef Long Challenge",
        platform: "codechef",
        startTime: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
        duration: 10080, // 7 days
        difficulty: "Medium",
        participants: 45000,
        url: "https://www.codechef.com/LONG"
    }
];

// Utility functions
const formatTime = (date) => {
    return date.toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
    return `${Math.floor(minutes / 1440)}d ${Math.floor((minutes % 1440) / 60)}h`;
};

const getTimeRemaining = (targetDate) => {
    const now = new Date().getTime();
    const target = targetDate.getTime();
    const difference = target - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds, total: difference };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
};

// Countdown Timer Component
const CountdownTimer = ({ targetDate, onComplete }) => {
    const [timeLeft, setTimeLeft] = useState(getTimeRemaining(targetDate));

    useEffect(() => {
        const timer = setInterval(() => {
            const newTimeLeft = getTimeRemaining(targetDate);
            setTimeLeft(newTimeLeft);
            
            if (newTimeLeft.total <= 0) {
                onComplete && onComplete();
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate, onComplete]);

    return (
        <div className="countdown">
            <div className="time-unit">
                <span className="time-value">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="time-label">Days</span>
            </div>
            <div className="time-unit">
                <span className="time-value">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="time-label">Hours</span>
            </div>
            <div className="time-unit">
                <span className="time-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="time-label">Minutes</span>
            </div>
            <div className="time-unit">
                <span className="time-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="time-label">Seconds</span>
            </div>
        </div>
    );
};

// Contest Card Component
const ContestCard = ({ contest, view, onCardClick }) => {
    const [timeLeft, setTimeLeft] = useState(getTimeRemaining(contest.startTime));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeRemaining(contest.startTime));
        }, 1000);

        return () => clearInterval(timer);
    }, [contest.startTime]);

    const platformColors = {
        leetcode: 'platform-leetcode',
        codechef: 'platform-codechef',
        hackerrank: 'platform-hackerrank',
        codeforces: 'platform-codeforces'
    };

    return (
        <div 
            className={`contest-card ${view === 'list' ? 'list-view' : ''}`}
            onClick={() => onCardClick(contest)}
        >
            <div className="contest-header">
                <div>
                    <h4 className="contest-title">
                        <a href={contest.url} target="_blank" rel="noreferrer" onClick={(e)=>e.stopPropagation()}>
                            {contest.title}
                        </a>
                    </h4>
                    <span className={`contest-platform ${platformColors[contest.platform]}`}>
                        <i className={`fas fa-${contest.platform === 'leetcode' ? 'code' : contest.platform === 'codechef' ? 'fire' : contest.platform === 'hackerrank' ? 'trophy' : 'star'}`}></i>
                        {contest.platform.charAt(0).toUpperCase() + contest.platform.slice(1)}
                    </span>
                </div>
            </div>
            
            <div className="contest-time">
                <i className="fas fa-calendar"></i>
                <span>{formatTime(contest.startTime)}</span>
            </div>

            {view === 'grid' && (
                <CountdownTimer 
                    targetDate={contest.startTime}
                    onComplete={() => console.log('Contest started!')}
                />
            )}

            <div className="contest-actions">
                <button 
                    className="btn btn-primary"
                    onClick={(e) => {
                        e.stopPropagation();
                        window.open(contest.url, '_blank');
                    }}
                >
                    <i className="fas fa-external-link-alt"></i>
                    Join Contest
                </button>
                <button 
                    className="btn btn-secondary"
                    onClick={(e) => {
                        e.stopPropagation();
                        // Add to calendar functionality
                        addToCalendar(contest);
                    }}
                >
                    <i className="fas fa-calendar-plus"></i>
                    Add to Calendar
                </button>
            </div>
        </div>
    );
};

// Calendar Component
const Calendar = ({ contests, currentDate, onDateClick }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const hasContest = contests.some(contest => 
                contest.startTime.toDateString() === date.toDateString()
            );
            const isToday = date.toDateString() === new Date().toDateString();
            
            days.push({
                date,
                day,
                hasContest,
                isToday
            });
        }

        return days;
    };

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const days = getDaysInMonth(currentMonth);

    const navigateMonth = (direction) => {
        setCurrentMonth(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + direction);
            return newDate;
        });
    };

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button 
                    className="calendar-nav"
                    onClick={() => navigateMonth(-1)}
                >
                    <i className="fas fa-chevron-left"></i>
                </button>
                <h4>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h4>
                <button 
                    className="calendar-nav"
                    onClick={() => navigateMonth(1)}
                >
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>
            
            <div className="calendar">
                {dayNames.map(day => (
                    <div key={day} className="calendar-day" style={{ fontWeight: 'bold' }}>
                        {day}
                    </div>
                ))}
                {days.map((day, index) => (
                    <div
                        key={index}
                        className={`calendar-day ${day?.hasContest ? 'has-contest' : ''} ${day?.isToday ? 'today' : ''}`}
                        onClick={() => day && onDateClick(day.date)}
                    >
                        {day?.day}
                    </div>
                ))}
            </div>
        </div>
    );
};

// Modal Component
const ContestModal = ({ contest, isOpen, onClose }) => {
    if (!isOpen || !contest) return null;

    return (
        <div className={`modal ${isOpen ? 'active' : ''}`} onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 id="modalTitle">{contest.title}</h3>
                    <button className="close-btn" onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="contest-details">
                        <div className="detail-item">
                            <i className="fas fa-calendar"></i>
                            <span id="modalDate">{formatTime(contest.startTime)}</span>
                        </div>
                        <div className="detail-item">
                            <i className="fas fa-clock"></i>
                            <span id="modalTime">{formatDuration(contest.duration)}</span>
                        </div>
                        <div className="detail-item">
                            <i className="fas fa-tag"></i>
                            <span id="modalPlatform">{contest.platform.charAt(0).toUpperCase() + contest.platform.slice(1)}</span>
                        </div>
                        <div className="detail-item">
                            <i className="fas fa-users"></i>
                            <span>{contest.participants.toLocaleString()} participants</span>
                        </div>
                    </div>
                    
                    <div className="countdown-timer">
                        <CountdownTimer 
                            targetDate={contest.startTime}
                            onComplete={() => console.log('Contest started!')}
                        />
                    </div>
                    
                    <div className="modal-actions">
                        <button 
                            className="btn btn-primary"
                            onClick={() => {
                                addToCalendar(contest);
                                showToast('Added to calendar!');
                            }}
                        >
                            <i className="fas fa-calendar-plus"></i>
                            Add to Calendar
                        </button>
                        <button 
                            className="btn btn-secondary"
                            onClick={() => {
                                setReminder(contest);
                                showToast('Reminder set!');
                            }}
                        >
                            <i className="fas fa-bell"></i>
                            Set Reminder
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Utility functions for calendar and notifications
const addToCalendar = (contest) => {
    const startTime = contest.startTime;
    const endTime = new Date(startTime.getTime() + contest.duration * 60 * 1000);
    
    const formatDate = (date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(contest.title)}&dates=${formatDate(startTime)}/${formatDate(endTime)}&details=${encodeURIComponent(`Join the contest at: ${contest.url}`)}`;
    
    window.open(calendarUrl, '_blank');
};

const setReminder = (contest) => {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                const reminderTime = new Date(contest.startTime.getTime() - 30 * 60 * 1000); // 30 minutes before
                const timeUntilReminder = reminderTime.getTime() - Date.now();
                
                if (timeUntilReminder > 0) {
                    setTimeout(() => {
                        new Notification(`Contest Reminder: ${contest.title}`, {
                            body: `The contest starts in 30 minutes!`,
                            icon: '/favicon.ico'
                        });
                    }, timeUntilReminder);
                }
            }
            showToast('Reminder set for 30 minutes before the contest!');
        });
    }
};

const showToast = (message) => {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
};

// Main App Component
const App = () => {
    const [contests, setContests] = useState(sampleContests);
    const [filteredContests, setFilteredContests] = useState(contests);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPlatform, setSelectedPlatform] = useState('all');
    const [selectedTimeRange, setSelectedTimeRange] = useState('all');
    const [viewMode, setViewMode] = useState('grid');
    const [selectedContest, setSelectedContest] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [theme, setTheme] = useState('light');

    // Filter contests based on search and filters
    useEffect(() => {
        let filtered = contests.filter(contest => {
            const matchesSearch = contest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                contest.platform.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesPlatform = selectedPlatform === 'all' || contest.platform === selectedPlatform;
            
            const now = new Date();
            const contestDate = contest.startTime;
            let matchesTimeRange = true;
            
            if (selectedTimeRange === 'today') {
                matchesTimeRange = contestDate.toDateString() === now.toDateString();
            } else if (selectedTimeRange === 'week') {
                const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
                matchesTimeRange = contestDate >= now && contestDate <= weekFromNow;
            } else if (selectedTimeRange === 'month') {
                const monthFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
                matchesTimeRange = contestDate >= now && contestDate <= monthFromNow;
            }
            
            return matchesSearch && matchesPlatform && matchesTimeRange;
        });

        // Sort by start time
        filtered.sort((a, b) => a.startTime - b.startTime);
        
        setFilteredContests(filtered);
    }, [contests, searchTerm, selectedPlatform, selectedTimeRange]);

    // Theme management
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const handleContestClick = (contest) => {
        setSelectedContest(contest);
        setIsModalOpen(true);
    };

    const handleDateClick = (date) => {
        const contestsOnDate = contests.filter(contest => 
            contest.startTime.toDateString() === date.toDateString()
        );
        
        if (contestsOnDate.length > 0) {
            setSelectedContest(contestsOnDate[0]);
            setIsModalOpen(true);
        }
    };

    return (
        <div className="app">
            {/* Header */}
            <header className="header">
                <div className="container">
                    <div className="logo">
                        <i className="fas fa-code"></i>
                        <h1>Contest Reminder</h1>
                    </div>
                    <div className="header-controls">
                        <button className="theme-toggle" onClick={toggleTheme}>
                            <i className={`fas fa-${theme === 'light' ? 'moon' : 'sun'}`}></i>
                        </button>
                        <button className="settings-btn">
                            <i className="fas fa-cog"></i>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="main">
                <div className="container">
                    {/* Hero Section */}
                    <section className="hero">
                        <div className="hero-content">
                            <h2>Never Miss a Coding Contest</h2>
                            <p>Stay updated with upcoming contests from LeetCode, CodeChef, HackerRank, and Codeforces</p>
                            <div className="search-bar">
                                <input 
                                    type="text" 
                                    placeholder="Search contests..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <i className="fas fa-search"></i>
                            </div>
                        </div>
                    </section>

                    {/* Filters */}
                    <section className="filters">
                        <div className="filter-group">
                            <label>Platform:</label>
                            <div className="filter-buttons">
                                {['all', 'leetcode', 'codechef', 'hackerrank', 'codeforces'].map(platform => (
                                    <button
                                        key={platform}
                                        className={`filter-btn ${selectedPlatform === platform ? 'active' : ''}`}
                                        onClick={() => setSelectedPlatform(platform)}
                                    >
                                        {platform === 'all' ? 'All' : platform.charAt(0).toUpperCase() + platform.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="filter-group">
                            <label>Time Range:</label>
                            <div className="filter-buttons">
                                {['all', 'today', 'week', 'month'].map(timeRange => (
                                    <button
                                        key={timeRange}
                                        className={`filter-btn ${selectedTimeRange === timeRange ? 'active' : ''}`}
                                        onClick={() => setSelectedTimeRange(timeRange)}
                                    >
                                        {timeRange === 'all' ? 'All' : 
                                         timeRange === 'today' ? 'Today' :
                                         timeRange === 'week' ? 'This Week' : 'This Month'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Contests Section */}
                    <section className="contests-section">
                        <div className="section-header">
                            <h3>Upcoming Contests ({filteredContests.length})</h3>
                            <div className="view-controls">
                                <button 
                                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                    onClick={() => setViewMode('grid')}
                                >
                                    <i className="fas fa-th"></i>
                                </button>
                                <button 
                                    className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                                    onClick={() => setViewMode('list')}
                                >
                                    <i className="fas fa-list"></i>
                                </button>
                            </div>
                        </div>
                        <div className={`contests-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
                            {filteredContests.map(contest => (
                                <ContestCard
                                    key={contest.id}
                                    contest={contest}
                                    view={viewMode}
                                    onCardClick={handleContestClick}
                                />
                            ))}
                        </div>
                    </section>

                    {/* Calendar Section */}
                    <section className="calendar-section">
                        <h3>Calendar View</h3>
                        <Calendar 
                            contests={contests}
                            currentDate={new Date()}
                            onDateClick={handleDateClick}
                        />
                    </section>
                </div>
            </main>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <p>&copy; 2024 Coding Contest Reminder. Made with ❤️ for developers.</p>
                </div>
            </footer>

            {/* Modal */}
            <ContestModal
                contest={selectedContest}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            {/* Toast */}
            <div className="toast" id="toast">
                <div className="toast-content">
                    <i className="fas fa-check-circle"></i>
                    <span id="toastMessage"></span>
                </div>
            </div>
        </div>
    );
};

// Render the app
ReactDOM.render(<App />, document.getElementById('root'));

# Coding Contest Reminder

A beautiful, interactive React.js application to help developers never miss coding contests from LeetCode, CodeChef, HackerRank, and Codeforces.

## Features

### 🎯 Core Functionality
- **Real-time Countdown Timers** - Live countdown for each contest
- **Multi-Platform Support** - LeetCode, CodeChef, HackerRank, Codeforces
- **Smart Filtering** - Filter by platform, time range, and search
- **Calendar Integration** - Add contests directly to Google Calendar
- **Reminder System** - Browser notifications for upcoming contests

### 🎨 User Experience
- **Dark/Light Theme Toggle** - Automatic theme persistence
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Interactive Animations** - Smooth transitions and micro-interactions
- **Grid/List View** - Switch between different viewing modes
- **Modal Details** - Detailed contest information in popup modals

### 🔧 Technical Features
- **Local Storage** - Saves user preferences and theme
- **Real-time Updates** - Countdown timers update every second
- **Accessibility** - Keyboard navigation and screen reader support
- **Performance Optimized** - Efficient rendering and memory management

## How to Use

### Getting Started
1. Open `index.html` in your web browser
2. The application will load with sample contest data
3. Use the search bar to find specific contests
4. Filter by platform or time range using the filter buttons
5. Click on any contest card to view detailed information

##modules

->Dashboard Module

Displays an overview of all upcoming contests with essential details.

->Contest List Module

Provides a searchable and filterable list of contests based on platform, date, and duration.

->Calendar View Module

Offers a visual calendar representation of contests by month or week.

->Add to Calendar Module

Allows users to add contests directly to their personal calendar (Google, Outlook, etc.) for easy tracking.

->Theme Module

Enables users to toggle between dark and light modes for better visual comfort.
### Key Interactions

#### 🔍 Search & Filter
- **Search Bar**: Type to search contest titles or platforms
- **Platform Filter**: Click "All", "LeetCode", "CodeChef", "HackerRank", or "Codeforces"
- **Time Filter**: Filter by "All", "Today", "This Week", or "This Month"

#### 📅 Calendar Features
- **Calendar View**: See all contests in a monthly calendar
- **Date Navigation**: Use arrow buttons to navigate months
- **Contest Indicators**: Days with contests are highlighted
- **Click Dates**: Click on highlighted dates to view contest details

#### ⏰ Contest Management
- **Add to Calendar**: Click "Add to Calendar" to open Google Calendar
- **Set Reminders**: Get browser notifications 30 minutes before contests
- **Join Contest**: Direct links to contest pages
- **View Details**: Click any contest card for detailed information

#### 🎨 Customization
- **Theme Toggle**: Click the moon/sun icon to switch themes
- **View Modes**: Switch between grid and list views
- **Responsive**: Automatically adapts to your screen size

## File Structure

```
├── index.html          # Main HTML structure
├── styles.css          # Complete CSS styling with animations
├── app.js             # React.js application logic
└── README.md          # This documentation
```

## Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## Features Breakdown

### Contest Data Structure
Each contest includes:
- **Title**: Contest name
- **Platform**: LeetCode, CodeChef, HackerRank, or Codeforces
- **Start Time**: When the contest begins
- **Duration**: How long the contest lasts
- **Difficulty**: Easy, Medium, or Hard
- **Participants**: Expected number of participants
- **URL**: Direct link to join the contest

### Countdown Timer
- Updates every second
- Shows days, hours, minutes, and seconds
- Automatically handles timezone differences
- Stops when contest starts

### Calendar Integration
- **Google Calendar**: Direct integration with Google Calendar
- **Event Details**: Includes contest title, time, and description
- **Automatic Duration**: Calculates end time based on contest duration

### Notification System
- **Browser Permissions**: Requests notification permission
- **Smart Timing**: Reminds 30 minutes before contest
- **Non-intrusive**: Only shows when needed

### Theme System
- **Light Theme**: Clean, professional appearance
- **Dark Theme**: Easy on the eyes for night coding
- **Persistence**: Remembers your theme choice
- **Smooth Transitions**: Animated theme switching

## Customization

### Adding New Contests
Edit the `sampleContests` array in `app.js`:

```javascript
{
    id: 7,
    title: "Your Contest Name",
    platform: "leetcode", // or "codechef", "hackerrank", "codeforces"
    startTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day from now
    duration: 120, // minutes
    difficulty: "Medium",
    participants: 10000,
    url: "https://your-contest-url.com"
}
```

### Styling Customization
Modify CSS variables in `styles.css`:

```css
:root {
    --primary-color: #6366f1;    /* Main brand color */
    --secondary-color: #f59e0b;  /* Accent color */
    --success-color: #10b981;    /* Success messages */
    --danger-color: #ef4444;     /* Error messages */
}
```
##Screenshots
![image alt](https://github.com/Udayteja10/coding-contest-reminder/blob/afacd73c6af00bc5d8f8bfc0aca5cbac2845d3c8/coding%201.png)
![image alt](https://github.com/Udayteja10/coding-contest-reminder/blob/afacd73c6af00bc5d8f8bfc0aca5cbac2845d3c8/coding%202.png)
![image alt](https://github.com/Udayteja10/coding-contest-reminder/blob/a8498f49491a4becb3a007a395c67147cfeb4fa6/add%20to%20calendar.png)
![image alt](https://github.com/Udayteja10/coding-contest-reminder/blob/a8498f49491a4becb3a007a395c67147cfeb4fa6/WhatsApp%20Image%202025-10-26%20at%2011.31.42%20PM%20(1).jpeg)
![image alt](https://github.com/Udayteja10/coding-contest-reminder/blob/a8498f49491a4becb3a007a395c67147cfeb4fa6/WhatsApp%20Image%202025-10-26%20at%2011.31.42%20PM.jpeg)

## Performance Features

- **Efficient Rendering**: Only updates when necessary
- **Memory Management**: Proper cleanup of timers
- **Responsive Images**: Optimized for all screen sizes
- **Fast Loading**: Minimal dependencies and optimized code

## Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Proper ARIA labels and semantic HTML
- **High Contrast**: Support for high contrast mode
- **Reduced Motion**: Respects user's motion preferences

## conclusion 
The Coding Contest Reminder project effectively helps developers stay updated on upcoming programming contests.

It provides a modern, user-friendly interface built with React.

Features like real-time countdowns, search and filter options, calendar view, and theme customization enhance usability and engagement.

The project ensures that programmers never miss important contests, boosting their participation and productivity.

It showcases the capabilities of modern web technologies in creating responsive and interactive applications.

Future enhancements could include:

Personalized contest notifications

Integration of more contest platforms

Mobile app development for greater accessibility and convenience.
## Future Enhancements

Potential features for future versions:
- **API Integration**: Real-time contest data from APIs
- **User Accounts**: Save favorite contests and preferences
- **Email Notifications**: Email reminders for contests
- **Contest History**: Track past contests and performance
- **Social Features**: Share contests with friends
- **Mobile App**: Native mobile application

## Support

For issues or feature requests, please check the code comments in `app.js` for detailed implementation notes.

## License

This project is open source and available under the MIT License.

---

**Made with ❤️ for developers who never want to miss a coding contest!**


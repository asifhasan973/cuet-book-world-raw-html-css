# CUET Book World - Raw HTML/CSS

This is a static, raw HTML and CSS implementation of the CUET Book World website. It includes the homepage, e-book library, profile page, and authentication pages.

## 📂 Project Structure

```
CUET_BOOK_WORLD/
├── index.html              # Homepage
├── ebook.html              # E-book Library
├── profile.html            # User Profile
├── auth.html               # Login / Signup
├── styles/
│   ├── global.css          # Global styles & variables
│   ├── home.css            # Homepage specific styles
│   ├── ebook.css           # E-book page styles
│   ├── profile.css         # Profile page styles
│   └── auth.css            # Auth page styles
└── scripts/
    ├── main.js             # Navbar, mobile menu, animations, toast
    └── profile.js          # Profile page logic
```

## 🚀 Features

### Global
- **Responsive Navbar**: Collapses into a mobile menu on small screens
- **Smooth Animations**: Scroll-triggered reveal animations for sections
- **Toast Notifications**: For user feedback (e.g., "Book added", "Logged in")
- **Scroll-to-Top**: Button for easy navigation
- **Dark Mode**: Toggle between light and dark themes

### Homepage
- Hero section with gradient text and animated background blobs
- Course-wise book categories
- Featured books section
- Trending books section
- Footer with contact information

### E-book Library
- Search and filter functionality
- Filter by topic (Algorithms, Networks, OS, AI, Database)
- E-book cards with cover images and details
- "Read Now" buttons (trigger toast notifications)

### Profile Page
- User information display
- Uploaded books section
- Wishlist section
- Edit profile modal
- Logout functionality

### Authentication Page
- Login form
- Signup form
- Toggle between login and signup
- Password visibility toggle

## 🛠️ How to Run

1. **Clone or download** the repository
2. **Open** any HTML file in your web browser:
   - `index.html` for the homepage
   - `ebook.html` for the e-book library
   - `profile.html` for the user profile
   - `auth.html` for login/signup

## 🎨 Design System

### Colors
- **Primary**: `#6366f1` (Indigo 500)
- **Background**: `#f9fafb` (Gray 50)
- **Text**: `#111827` (Gray 900)
- **Card Background**: `#ffffff` (White)

### Typography
- **Font**: Inter (Google Fonts)
- **Font Sizes**: 14px to 64px
- **Font Weights**: 300 to 800

### Spacing
- **Base Unit**: 4px
- **Common Values**: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px

## 🤝 Contributing

This is a static HTML/CSS implementation. To contribute:
1. Edit the HTML files for structure
2. Update the CSS files in `styles/` for styling
3. Add JavaScript logic in `scripts/` if needed

## 📝 License

This is a personal project for educational purposes. Feel free to use and modify as needed.

## 📞 Support

For issues or questions, please refer to the original project repository or contact the developer.

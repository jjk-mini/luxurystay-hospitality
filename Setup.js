const fs = require("fs");
const path = require("path");

// ─── ALL FILES TO CREATE ───────────────────────────────────────────────────────

const structure = {
  // ── SERVER ──
  "server/config/db.js": `// MongoDB connection
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected: ' + conn.connection.host);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;`,

  "server/config/cloudinary.js": `// Cloudinary configuration
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;`,

  "server/controllers/authController.js": `// Auth controller — login, register, logout`,
  "server/controllers/roomController.js": `// Room controller — CRUD, status update`,
  "server/controllers/bookingController.js": `// Booking controller — create, cancel, check-in, check-out`,
  "server/controllers/billingController.js": `// Billing controller — generate bill, add charges`,
  "server/controllers/housekeepingController.js": `// Housekeeping controller — tasks, room status`,
  "server/controllers/userController.js": `// User controller — manage staff accounts`,
  "server/controllers/feedbackController.js": `// Feedback controller — submit and get reviews`,
  "server/controllers/reportController.js": `// Report controller — occupancy, revenue analytics`,

  "server/models/User.js": `// User schema — roles: admin, manager, receptionist, housekeeping, guest`,
  "server/models/Room.js": `// Room schema — type, price, status enum`,
  "server/models/Booking.js": `// Booking schema — guest, room, dates, status`,
  "server/models/Billing.js": `// Billing schema — itemized charges, tax, payment status`,
  "server/models/Maintenance.js": `// Maintenance schema — issue, status, room`,
  "server/models/Feedback.js": `// Feedback schema — rating, review, guest`,

  "server/routes/authRoutes.js": `// Auth routes — /login /register /logout`,
  "server/routes/roomRoutes.js": `// Room routes — CRUD and filter`,
  "server/routes/bookingRoutes.js": `// Booking routes — create, cancel, check-in, check-out`,
  "server/routes/billingRoutes.js": `// Billing routes — generate bill, get invoice`,
  "server/routes/housekeepingRoutes.js": `// Housekeeping routes — tasks, clean status`,
  "server/routes/userRoutes.js": `// User routes — staff management`,
  "server/routes/feedbackRoutes.js": `// Feedback routes — submit and view reviews`,
  "server/routes/reportRoutes.js": `// Report routes — analytics endpoints`,

  "server/middleware/authMiddleware.js": `// JWT auth middleware — protect routes`,
  "server/middleware/roleMiddleware.js": `// Role-based access control middleware`,
  "server/middleware/errorMiddleware.js": `// Global error handler middleware`,

  "server/utils/generateInvoice.js": `// Utility — generate itemized invoice object`,
  "server/utils/calcBill.js": `// Utility — calculate room rate x nights + extras + tax`,

  "server/server.js": `// Express app entry point
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/rooms', require('./routes/roomRoutes'));
// app.use('/api/bookings', require('./routes/bookingRoutes'));
// app.use('/api/billing', require('./routes/billingRoutes'));
// app.use('/api/housekeeping', require('./routes/housekeepingRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/feedback', require('./routes/feedbackRoutes'));
// app.use('/api/reports', require('./routes/reportRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));`,

  "server/.env": `PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret`,

  "server/.gitignore": `node_modules/
.env`,

  // ── CLIENT ──
  "client/src/hooks/useAuth.js": `// Custom hook — shortcut to use AuthContext anywhere`,

  "client/src/api/authApi.js": `// Axios calls — login, register, logout`,
  "client/src/api/roomApi.js": `// Axios calls — room CRUD and filters`,
  "client/src/api/bookingApi.js": `// Axios calls — bookings management`,
  "client/src/api/billingApi.js": `// Axios calls — billing and invoices`,
  "client/src/api/reportApi.js": `// Axios calls — reports and analytics`,
  "client/src/api/userApi.js": `// Axios calls — staff management`,
  "client/src/api/housekeepingApi.js": `// Axios calls — housekeeping and maintenance`,
  "client/src/api/feedbackApi.js": `// Axios calls — submit and get feedback`,

  "client/src/components/Navbar.jsx": `// Navbar component — logo, links by role, logout`,
  "client/src/components/RoomCard.jsx": `// RoomCard component — room info and status`,
  "client/src/components/BookingForm.jsx": `// BookingForm component — date picker, room selector`,
  "client/src/components/InvoiceView.jsx": `// InvoiceView component — itemized bill display`,
  "client/src/components/StatusBadge.jsx": `// StatusBadge component — colored status pill`,

  "client/src/constants/theme.js": `// LuxuryStay Hospitality — Burgundy & Cream Theme

export const COLORS = {
  // Main brand colors
  PRIMARY: '#5C1A2B',        // Burgundy — navbar, headings, main buttons
  ACCENT: '#D9B26F',         // Gold — highlights, CTA buttons, icons
  CREAM: '#F3E5D8',          // Cream — navbar text, light areas

  // Backgrounds
  BACKGROUND: '#FAF6F1',     // Warm off-white — main page background
  SURFACE: '#FFFFFF',        // White — cards, forms, tables

  // Text
  TEXT_PRIMARY: '#3E2A0E',   // Dark brown — body text, paragraphs
  TEXT_SECONDARY: '#7A6E63', // Medium brown — labels, captions, placeholders

  // Borders
  BORDER: '#E8DCD0',         // Light warm gray — card borders, dividers

  // Status colors
  SUCCESS: '#2D6A4F',        // Dark green — available, paid, confirmed
  ERROR: '#C1121F',          // Deep red — errors, cancelled, alerts
  WARNING: '#BA7517',        // Amber — pending, cleaning, caution
  INFO: '#185FA5',           // Blue — occupied, in-progress, info

  // Extras
  DARK: '#1A1A1A',           // Near black — for high contrast text
  MUTED: '#B0A89E',          // Light muted — disabled states
};

export const FONTS = {
  HEADING: "'Playfair Display', serif",   // For h1, h2, logo, page titles
  BODY: "'Inter', sans-serif",            // For body, buttons, forms, tables
};

export const BORDER_RADIUS = {
  SMALL: '5px',
  MEDIUM: '8px',
  LARGE: '12px',
  PILL: '999px',
};

export const SHADOWS = {
  CARD: '0 1px 4px rgba(92, 26, 43, 0.07)',
  DROPDOWN: '0 4px 16px rgba(92, 26, 43, 0.12)',
};`,

  "client/src/constants/roles.js": `// User role constants — use these everywhere instead of hardcoding strings

export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  RECEPTIONIST: 'receptionist',
  HOUSEKEEPING: 'housekeeping',
  GUEST: 'guest',
};`,

  "client/src/constants/roomStatus.js": `// Room status constants

export const ROOM_STATUS = {
  AVAILABLE: 'available',
  OCCUPIED: 'occupied',
  CLEANING: 'cleaning',
  MAINTENANCE: 'maintenance',
};`,

  "client/src/pages/LoginPage.jsx": `// Login page — email + password form, role-based redirect`,
  "client/src/pages/RegisterPage.jsx": `// Register page — name, email, password form`,
  "client/src/pages/ProfilePage.jsx": `// Profile page — view and edit user info (all roles)`,
  "client/src/pages/AdminDashboard.jsx": `// Admin dashboard — stats, recent bookings`,
  "client/src/pages/StaffManagement.jsx": `// Staff management — list, create, edit, deactivate staff`,
  "client/src/pages/RoomManagement.jsx": `// Room management — grid, status filter, add room`,
  "client/src/pages/BookingPage.jsx": `// Bookings list — all reservations, filter, cancel`,
  "client/src/pages/CheckInOut.jsx": `// Check-in / check-out — process arrivals and departures`,
  "client/src/pages/BillingPage.jsx": `// Billing page — generate bill, add extras, print invoice`,
  "client/src/pages/HousekeepingDashboard.jsx": `// Housekeeping dashboard — task list, mark rooms clean`,
  "client/src/pages/MaintenanceRequestsPage.jsx": `// Maintenance requests — log issues, track status`,
  "client/src/pages/GuestDashboard.jsx": `// Guest dashboard — booking summary, quick actions`,
  "client/src/pages/ReportsPage.jsx": `// Reports page — occupancy and revenue charts`,
  "client/src/pages/FeedbackPage.jsx": `// Feedback page — submit rating, admin views reviews`,
  "client/src/pages/NotFoundPage.jsx": `// 404 page — not found message with link home`,

  "client/src/context/AuthContext.jsx": `// Auth context — stores user, token, role globally`,

  "client/src/utils/PrivateRoute.jsx": `// Private route — redirects to login if not authenticated`,
  "client/src/utils/RoleRoute.jsx": `// Role route — blocks page if user role not allowed`,

  "client/src/App.jsx": `// App.jsx — all routes with PrivateRoute and RoleRoute protection`,
  "client/src/main.jsx": `// main.jsx — React entry point`,

  "client/src/index.css": `/* Global styles — import Google Fonts here */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: #FAF6F1;
  color: #3E2A0E;
}

h1, h2, h3 {
  font-family: 'Playfair Display', serif;
  color: #5C1A2B;
}`,

  "client/.env": `VITE_API_URL=http://localhost:5000/api`,

  "client/.gitignore": `node_modules/
.env
dist/`,

  // ── ROOT ──
  "package.json": JSON.stringify({
    name: "luxurystay-hospitality",
    version: "1.0.0",
    description: "LuxuryStay Hospitality — Hotel Management System (MERN Stack)",
    scripts: {
      server: "cd server && npm run dev",
      client: "cd client && npm run dev",
      dev: "concurrently \"npm run server\" \"npm run client\""
    },
    devDependencies: {
      concurrently: "^8.2.0"
    }
  }, null, 2),

  "README.md": `# LuxuryStay Hospitality 🏨
### Hotel Management System — MERN Stack

## Team
| Member | Module |
|---|---|
| You (Leader) | Auth, App shell, GitHub |
| Abdullah | Admin / Staff |
| Alishba | Rooms |
| Sumaira | Bookings |
| Hooria | Billing |
| Azaan | Reports & Feedback |
| Abdurrehman | Housekeeping |

## Tech Stack
- **Frontend:** React, Vite, React Router, Axios, Recharts
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Auth:** JWT, bcryptjs
- **Storage:** Cloudinary

## Setup Instructions

### 1. Clone the repo
\`\`\`
git clone https://github.com/your-username/luxurystay-hospitality.git
cd luxurystay-hospitality
\`\`\`

### 2. Install backend packages
\`\`\`
cd server
npm install
\`\`\`

### 3. Install frontend packages
\`\`\`
cd ../client
npm install
\`\`\`

### 4. Add your .env variables
Fill in \`server/.env\` with your MongoDB URI, JWT secret, and Cloudinary keys.

### 5. Run the project
\`\`\`
cd ..
npm run dev
\`\`\`

## Color Theme — Burgundy & Cream
| Role | Color | Hex |
|---|---|---|
| Primary | Burgundy | #5C1A2B |
| Accent | Gold | #D9B26F |
| Background | Warm White | #FAF6F1 |
| Surface | White | #FFFFFF |
`
};

// ─── CREATE FILES AND FOLDERS ──────────────────────────────────────────────────

let created = 0;
let skipped = 0;

Object.entries(structure).forEach(([filePath, content]) => {
  const fullPath = path.join(__dirname, filePath);
  const dir = path.dirname(fullPath);

  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Create file if it doesn't exist
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, content, "utf8");
    console.log("✅ Created: " + filePath);
    created++;
  } else {
    console.log("⏭️  Skipped (already exists): " + filePath);
    skipped++;
  }
});

// Create empty assets folder
const assetsPath = path.join(__dirname, "client/src/assets");
if (!fs.existsSync(assetsPath)) {
  fs.mkdirSync(assetsPath, { recursive: true });
  console.log("✅ Created: client/src/assets/");
}

console.log("\n─────────────────────────────────────");
console.log("✅ Done! " + created + " files created, " + skipped + " skipped.");
console.log("─────────────────────────────────────");
console.log("\nNext steps:");
console.log("1. cd server && npm install express mongoose dotenv bcryptjs jsonwebtoken cors cloudinary multer express-async-handler express-rate-limit helmet morgan");
console.log("2. npm install -D nodemon");
console.log("3. cd ../client && npm install axios react-router-dom react-hook-form recharts react-datepicker react-hot-toast react-icons date-fns @tabler/icons-react");
console.log("4. cd .. && npm install -D concurrently");
console.log("5. Fill in your server/.env file with real values");
console.log("6. Run: npm run dev\n");
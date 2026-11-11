# 🚀 QUICKBOOK – Smart Queue & Appointment Management System

**QUICKBOOK** is a web-based Queue and Appointment and Shop Management System designed to simplify customer management, online token booking, and shop operations.

It allows customers to discover shops, check their availability, book tickets or tokens online, and track their queue status without physically waiting in ----> long queues.

At the same time, shop owners can create and manage their shops, control customer tickets, manage notifications, monitor live queue activity, and maintain customer booking history through a dedicated dashboard.

The main goal of Turn is to make traditional queue management smarter, faster, and more convenient for both customers and business owners.

---

## 🌟 Project Overview

Turn provides a centralized platform where customers and shop owners can interact through a role-based system.

Instead of manually managing customers and waiting lists, shop owners can manage their entire queue digitally.

### 🎯 Key Objectives

- Reduce physical waiting time for customers.
- Make token and appointment booking easier.
- Provide real-time shop availability information.
- Simplify customer and ticket management.
- Give shop owners complete control over their shop operations.
- Provide a better and more organized customer experience.

---

## ✨ Key Features

### 👤 1. Customer / User Features

Customers can explore shops, book tickets, and track their queue status.

- **User Registration & Login:** Create an account and securely log in.
- **Secure Authentication:** JWT-based authentication.
- **Browse Shops:** Explore available shops on the platform.
- **Smart Shop Search:** Search shops by shop name and nearby address.
- **Shop Details:** View shop information, owner details, and other relevant information.
- **Shop Availability:** Check whether a shop is currently Open or Closed.
- **Online Token Booking:** Book tickets or tokens without visiting the shop.
- **Booking Confirmation:** Receive confirmation of successful ticket bookings.
- **My Tickets:** View your booked tickets and their details.
- **Live Turn Tracking:** Track your turn and waiting queue after booking.
- **Shop Notifications:** Receive updates and notifications related to shops.
- **Shop Alerts:** Stay informed about important shop announcements.
- **Booking History:** Access your previous booking information.

### 🏪 2. Shop Owner / Shopkeeper Features

Shop owners get a dedicated dashboard to manage their shops and customers.

**Shop Management**
- Create a new shop.
- Update shop details and information.
- Upload and manage shop images.
- View your shop publicly.
- Manage your shop information.
- Control shop opening and closing times.
- Check current shop status.

**Dashboard & Analytics**
- Dedicated shop owner dashboard.
- Track live customer activity.
- View waiting and remaining customers.
- Monitor customer booking history.
- View ticket and booking information.
- Track shop-related activities.

**Ticket Management**
- View all customer tickets.
- Confirm customer tickets.
- Cancel customer tickets.
- Manage customer bookings.
- Monitor the current queue.
- Maintain control over customer ticket operations.

**Notification Management**
- Publish new notices for shop customers.
- Manage shop-related notifications.
- View all previously published notices.
- Inform customers about important shop updates.

**Profile Management**
- Manage shop owner profile.
- View personal and shop-related information.
- Access shop management features from the owner dashboard.

### 🌐 3. General Website Features

- Responsive website interface.
- Home page.
- About Us page.
- Contact Us page.
- Shop discovery and search.
- Role-based accessibility.
- Customer and shop owner dashboards.
- Centralized shop and ticket management.

---

## 📄 Website Pages & Modules

The application contains different pages and modules based on user roles.

### 👤 Customer / User Pages

| Page | Description |
|---|---|
| Home | Explore the Qbook platform |
| Search Shops | Search and discover shops |
| Shop Details | View complete shop information |
| Visit Shop | Explore individual shop details |
| Booking | Book a ticket or token |
| My Tickets | View all booked tickets |
| Ticket Details | Track booking and queue information |
| Notifications | View shop-related notifications |
| Shop Alerts | Receive important shop announcements |

### 🏪 Shop Owner Pages

| Page | Description |
|---|---|
| Profile | Manage owner profile |
| My Tickets | Manage customer tickets |
| Create Shop | Register a new shop |
| Dashboard | Monitor shop activity |
| My Shop | View shop details |
| Send Notice | Publish shop notifications |
| My Notices | View published notices |
| Shop Controls | Manage shop operations |
| Change Shop Time | Update opening and closing times |

### 🌐 General Website Pages

| Page | Description |
|---|---|
| Home | Main landing page |
| About | Information about Turn |
| Contact | Contact and communication form |

---

## 🔐 Role-Based Access Control

Turn follows a role-based system to provide different permissions and functionalities to customers and shop owners.

| Functionality
| Register & Login 
| Browse Shops 
| Search Shops  
| View Shop Details 
| Book Tickets 
| View My Tickets
| Track Queue
| Create Shop 
| Update Shop
| Manage Customer Tickets 
| Confirm / Cancel Tickets 
| Manage Shop Timing 
| Publish Shop Notices 
| View Shop Dashboard 
| Manage Profile

---

## 🛠️ Technology Stack

Turn is developed using modern web technologies and a separate frontend and backend architecture.

### Frontend
- **Next.js** – React-based framework for building the web application.
- **React.js** – Component-based user interface.
- **JavaScript (ES6+)** – Application logic.
- **HTML5** – Website structure.
- **CSS3** – Styling and layouts.
- **Tailwind CSS** – Utility-first styling.

### Backend
- **Node.js** – JavaScript runtime environment.
- **Express.js** – Backend API development.
- **REST API** – Communication between frontend and backend.
- **JWT** – Secure user authentication.
- **Cookie-based Authentication** – HTTP-only authentication cookies.

### Database
- **MongoDB** – NoSQL database.
- **Mongoose** – MongoDB object modeling.

### Third-Party Services & Tools
- **Cloudinary** – Image upload and cloud image management.
- **Algolia** – Fast and efficient shop search.
- **Git & GitHub** – Version control and source code management.
- **Vercel** – Frontend deployment.
- **Render** - Backend deployment .

---

## 🏗️ Project Architecture

Turn uses a separate frontend and backend architecture.

```text
                TURN APPLICATION
                       |
          +------------+------------+
          |                         |
       Frontend                  Backend
          |                         |
       Next.js                  Node.js
       React.js                 Express.js
          |                         |
          +------ REST APIs --------+
                       |
                Authentication
                       |
                  JWT Cookies
                       |
                 MongoDB Database
                       |
          +------------+------------+
          |            |            |
       Cloudinary    Algolia    Other Services
       (Images)      (Search)
```

### Application Workflow

1. Users register or log in to the application.
2. Backend verifies authentication using JWT.
3. Customers browse and search for available shops.
4. Customers visit shop details and check availability.
5. Customers book a ticket or token.
6. Shop owners manage customer tickets through their dashboard.
7. Customers track their queue and receive shop notifications.

---

## 📂 Project Folder Structure

The project is organized into separate frontend and backend directories.

```text
Turn/
│
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── utils/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   └── services/
│   ├── .env.local
│   └── package.json
│
└── README.md
```

*Note: Folder structure may vary depending on the latest project implementation.*

---

## ⚙️ Installation & Setup

Follow these steps to run Turn locally on your computer.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project

```bash
cd Turn
```

### 3. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file inside the Backend directory.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

ALGOLIA_APP_ID=your_algolia_app_id
ALGOLIA_ADMIN_API_KEY=your_algolia_admin_key
ALGOLIA_SEARCH_API_KEY=your_algolia_search_key
```

Start the backend server:

```bash
npm run dev
```

### 4. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env.local` file inside the frontend directory.

```env
NEXT_PUBLIC_FRONTEND_API_URL=http://localhost:5000/api
BACKEND_API_URL=http://localhost:5000/api
```

Add any additional environment variables required by your implementation.

Start the frontend:

```bash
npm run dev
```

### 5. Open the Application

```text
http://localhost:3000
```

**Important:** Never upload `.env` or `.env.local` files containing API keys, passwords, or secret credentials to GitHub.

---

## 🔮 Future Scope & Upcoming Features

Turn has significant potential to become a more advanced and scalable queue management platform.

The following features are planned for future development.

### 1. Advanced Customer Management

- **Guest Customer Booking:** Shop owners will be able to add different customers manually using unique customer IDs without requiring them to register.
- **Multiple Ticket Booking:** A single registered customer will be able to book multiple tickets.
- **Unique Customer Identification:** Each customer will have a unique identification system for better tracking.
- **Customer Feedback & Reviews:** Customers will be able to share their experiences and rate shops.

### 2. Advanced Shop Management

- **Shop Deletion:** Provide shop owners with a secure option to delete their shops.
- **Shop Rejection Reason:** When a shop owner rejects a customer's ticket, the customer will receive the rejection reason.
- **Advanced Shop Controls:** More flexible shop and customer management options.
- **Customer Communication:** Shop owners will be able to communicate directly with customers.

### 3. Notification & Alert System

- **Alert Your Turn:** Notify customers when their turn is approaching.
- **Real-Time Notifications:** Provide instant updates about ticket status and queue changes.
- **Smart Queue Alerts:** Automatically notify customers about delays, cancellations, and important updates.

### 4. Online Payment Integration

- **Online Payment Gateway:** Integrate secure online payment services.
- **Payment Confirmation:** Provide customers with successful payment confirmation.
- **Transaction History:** Allow customers to view their payment records.
- **Digital Receipts:** Generate payment receipts for customers.

### 5. Advanced Analytics Dashboard

- Total customer bookings.
- Daily, weekly, and monthly booking statistics.
- Customer waiting time analysis.
- Shop performance tracking.
- Completed and cancelled ticket reports.
- Customer activity insights.
- Business performance analytics.

### 6. Email & Document Integration

- Send documents directly to customers through their registered email addresses.
- Generate digital booking receipts.
- Send ticket confirmation emails.
- Send cancellation and rejection notifications.
- Provide downloadable booking documents.

---

## 🚀 Future Development Areas

Apart from the planned features, Turn can be extended into a complete business management platform.

| Development Area | Future Possibilities |
|---|---|
| Real-Time System | WebSocket-based live queue updates |
| Mobile Application | Android and iOS applications |
| AI Integration | Smart waiting-time predictions |
| Cloud Infrastructure | Scalable cloud deployment |
| Security | Advanced authentication and authorization |
| Analytics | Business intelligence and reporting |
| Communication | Email, SMS and WhatsApp notifications |
| Multi-Branch Management | Manage multiple shop branches |
| Localization | Multiple language support |
| Customer Experience | Loyalty programs and personalized recommendations |

---

## 🔒 Security Considerations

Security is an important part of the Turn application.

- JWT-based authentication.
- HTTP-only authentication cookies.
- Protected backend routes.
- Role-based access control.
- Environment variables for sensitive credentials.
- Backend request validation.
- Secure API communication.
- Restricted access to shop management operations.

---

## 💡 Why Turn?

Traditional queue management often requires customers to physically visit shops and wait for their turn.

Turn aims to solve this problem by bringing queue management online.

**For Customers:**
- Save time.
- Book tickets from anywhere.
- Avoid unnecessary waiting.
- Track queue status.
- Receive important notifications.

**For Shop Owners:**
- Manage customers digitally.
- Control bookings and tickets.
- Monitor live shop activity.
- Manage shop timings.
- Improve business operations.

---

## 📸 Screenshots & Demo

Screenshots and application demonstrations will be added here.

You can add screenshots of:

- Home Page
- Shop Search Page
- Shop Details Page
- Customer Dashboard
- Ticket Booking Page
- My Tickets Page
- Shop Owner Dashboard
- Shop Management Page
- Notifications Page

---

## 🌍 Live Demo

**Live Website:** YOUR_DEPLOYED_WEBSITE_URL

**GitHub Repository:** YOUR_GITHUB_REPOSITORY_URL

---

## 👨‍💻 Developer

**Developed by:** Dushyant

**Role:** Full Stack Web Developer

**Project:** QUICKBOOK – Smart Queue & Appointment and Turn Management System

**Technologies:** Next.js, React.js, Node.js, Express.js, MongoDB, Cloudinary, Algolia

---

## 🤝 Contributions

Contributions, suggestions, and feature requests are welcome!

If you have ideas to improve Turn, feel free to:

1. Fork this repository.
2. Create a new feature branch.
3. Make your changes.
4. Commit your changes.
5. Submit a Pull Request.

---

## 📄 License

This project is currently available for learning and development purposes.

A formal open-source license can be added when the project licensing terms are finalized.

---

⭐ **If you find Turn interesting, don't forget to star the repository!**

**Turn – Book Smart. Wait Less. Manage Better.** 🚀

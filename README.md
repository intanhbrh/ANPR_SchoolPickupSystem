# 🚗 ANPR School Pickup System

## 📌 Overview
The **ANPR (Automatic Number Plate Recognition) School Pickup System** is a mobile-based application designed to improve the efficiency and safety of student pickup at school.

This system detects vehicle number plates and automatically notifies students when their parent/guardian has arrived at the pickup area.

---

## 🎯 Purpose
The goal of this project is to:
- Reduce congestion during school pickup hours  
- Improve communication between parents and students  
- Automate manual verification processes using technology  

---

## 📱 Features

### 🔐 Authentication
- Login using **school email only**
- Secure user verification system

### 🚗 Live Detection Dashboard
- Displays real-time detected vehicle data  
- Shows:
  - Student Name  
  - Lane ID  
  - Detection Time  

### 🔔 Notifications
- Instant in-app notification when a vehicle is detected  
- Push notification support (Expo)

### 📜 History Log
- Stores recent pickup activity  
- Search and filter functionality  

### ⚙️ Settings
- Dark Mode support 🌙  
- Multi-language support:
  - English  
  - Chinese  
  - Korean  
  - Malay  

### 👤 Profile
- User information management  

---

## 🛠️ Tech Stack

### Frontend (Mobile App)
- React Native (Expo)

### Backend
- Node.js (Express)
- MySQL Database

### Other Tools
- Expo Notifications  
- AsyncStorage  
- Nodemailer (OTP system)  

---

## 🧠 How It Works

1. User logs in using a school email  
2. System verifies user via backend  
3. When a vehicle is detected:
   - Plate number is matched with database  
   - Student is identified  
   - Notification is sent to the mobile app  
4. Activity is recorded in the history log  

---

## 👩‍🏫 Academic Context

This project was developed as part of an **A-Level Computer Science group project**.

- 👥 Developed by a group of **6 students**  
- 📱 Students were responsible for building and demonstrating the **mobile application**  
- 🧑‍💻 The system includes both frontend and backend integration  
- 🎓 Demonstrates:
  - Mobile development  
  - API integration  
  - Database usage  
  - System design  
 
## 📂 Project Structure
### Login Page
![Main menu Page](images/mainmenu.png)

### Menu Page
![notif](images/notif.jpeg)

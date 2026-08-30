# 🌟 Life Organizer

Life Organizer is a React-based productivity application that helps users manage their daily tasks and important notes in one simple place.

## 🚀 Features

### 📝 Task Management
- Add new tasks
- Set due dates
- Mark tasks as completed
- Edit existing tasks
- Delete tasks
- Filter tasks by All, Pending, and Completed
- Tasks are saved using LocalStorage

### 📒 Notes Management
- Create notes
- Add note categories
- Edit notes
- Delete notes
- Search notes
- Display note creation time
- Notes are saved using LocalStorage

### 🏠 Dashboard
- Simple dashboard
- Quick access to Tasks and Notes
- Clean and responsive interface

### 📱 Responsive Design
The application works on:
- Desktop
- Tablet
- Mobile devices

## 🛠️ Technologies Used

- React.js
- JavaScript
- HTML5
- CSS3
- Vite
- LocalStorage

## 📂 Project Structure

```text
src/
├── components/
│   ├── Navbar.jsx
│   ├── Dashboard.jsx
│   │
│   ├── Todo/
│   │   ├── TodoApp.jsx
│   │   ├── TodoForm.jsx
│   │   ├── TodoList.jsx
│   │   └── TodoItem.jsx
│   │
│   └── Notes/
│       ├── NotesApp.jsx
│       ├── NoteForm.jsx
│       ├── NotesList.jsx
│       └── NoteCard.jsx
│
├── App.jsx
├── main.jsx
└── styles.css
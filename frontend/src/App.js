import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import StudentList from "./components/StudentList";
import AddStudentForm from "./components/AddStudentForm";
import DeleteStudent from "./components/DeleteStudent";
import UpdateStudentForm from "./components/UpdateStudentForm"; 
import "./components/styles.css"; // 引入 CSS 樣式


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/add" element={<AddStudentForm />} />
        <Route path="/delete" element={<DeleteStudent />} />
        <Route path="/update" element={<UpdateStudentForm />} />
      </Routes>
    </Router>
  );
}

export default App;
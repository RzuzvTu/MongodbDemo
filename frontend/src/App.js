import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./view/Navbar";
import StudentList from "./view/StudentList";
import AddStudentForm from "./view/AddStudentForm";
import DeleteStudent from "./view/DeleteStudent";
import UpdateStudentForm from "./view/UpdateStudentForm"; 
import "./styles/styles.css"; // 引入 CSS 樣式


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
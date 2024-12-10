import React, { useState } from "react";
import { insertOne } from "../services/api"; // 引入封裝好的 API 方法

const AddStudentForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    name: "",
    department: "",
    grade: "",
    class: "",
    Email: "",
    absences: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("送出資料:", formData);
    try {
      const response = await insertOne(formData); // 呼叫封裝好的 API 方法
      console.log("新增成功:", response);
      setMessage("學生新增成功！");
    } catch (error) {
      if (error.response && error.response.data.message) {
        const errorMessage = error.response.data.message;

        if (errorMessage.includes("座號已存在")) {
          setMessage("座號已存在，請確認後再試！");
        } else {
          setMessage("學生新增失敗，請稍後再試！");
        }
      } else {
        console.error("新增失敗:", error.message);
        setMessage("學生新增失敗，請稍後再試！");
      }
    }
  };

  return (
    <div className="form-container">
      <h2>新增學生</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="userName" placeholder="帳號" onChange={handleChange} required />
        <input type="text" name="name" placeholder="姓名" onChange={handleChange} required />
        <input type="text" name="department" placeholder="院系" onChange={handleChange} required />
        <input type="text" name="grade" placeholder="年級" onChange={handleChange} required />
        <input type="text" name="class" placeholder="班級" onChange={handleChange} required />
        <input type="email" name="Email" placeholder="Email" onChange={handleChange} required />
        <input type="number" name="absences" placeholder="缺席次數" onChange={handleChange} required />
        <button type="submit" className="submit-button">新增</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddStudentForm;
import React, { useEffect, useState } from "react";
import { findAll } from "../services/api";
import "../styles/styles.css";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await findAll();
        const sortedData = Array.isArray(data)
          ? data.sort((a, b) => Number(a.sid) - Number(b.sid))
          : [];
        setStudents(sortedData);
        setFilteredStudents(sortedData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("無法取得資料，請稍後再試！");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // 搜尋
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = students.filter(
      (student) =>
        (student.userName && student.userName.toLowerCase().includes(term)) ||
        (student.name && student.name.toLowerCase().includes(term))
    );

    setFilteredStudents(filtered);
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>學生列表</h2>

      {/* 搜尋輸入框 */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="輸入姓名或帳號關鍵字進行搜尋"
          value={searchTerm}
          onChange={handleSearch}
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            width: "80%",
            maxWidth: "400px",
          }}
        />
      </div>

      {loading && <p style={{ textAlign: "center" }}>資料載入中...</p>}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

      {/* 顯示學生 */}
      <div className="card-container">
        {filteredStudents.map((student) => (
          <div key={student._id} className="card">
            <p>帳號: {student.userName || "未提供"}</p>
            <p>座號: {student.sid || "未提供"}</p>
            <p>姓名: {student.name || "未提供"}</p>
            <p>院系: {student.department || "未提供"}</p>
            <p>年級: {student.grade || "未提供"}</p>
            <p>班級: {student.class || "未提供"}</p>
            <p>Email: {student.Email || "未提供"}</p>
            <p>缺席次數: {student.absences || 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
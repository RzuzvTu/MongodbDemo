import React, { useEffect, useState } from "react";
import { findAll } from "../services/api"; // 引入封裝好的 API 函數
import "../styles/styles.css"; // 引入 CSS 樣式

const StudentList = () => {
  const [students, setStudents] = useState([]); // 儲存學生資料
  const [filteredStudents, setFilteredStudents] = useState([]); // 篩選後的學生資料
  const [searchTerm, setSearchTerm] = useState(""); // 搜尋關鍵字
  const [loading, setLoading] = useState(true); // 載入狀態
  const [error, setError] = useState(null); // 錯誤狀態

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await findAll(); // 呼叫 API 函數
        const sortedData = Array.isArray(data)
          ? data.sort((a, b) => Number(a.sid) - Number(b.sid)) // 根據 sid 升序排序
          : [];
        setStudents(sortedData);
        setFilteredStudents(sortedData); // 初始顯示所有資料
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("無法取得資料，請稍後再試！");
      } finally {
        setLoading(false); // 停止 loading
      }
    };

    fetchStudents(); // 執行 fetch 函數
  }, []);

  // 處理搜尋邏輯：僅能用「姓名」或「帳號」進行搜尋
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase(); // 取得搜尋關鍵字並轉小寫
    setSearchTerm(term);

    const filtered = students.filter(
      (student) =>
        (student.userName && student.userName.toLowerCase().includes(term)) ||
        (student.name && student.name.toLowerCase().includes(term))
    );

    setFilteredStudents(filtered); // 更新篩選後的學生資料
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

      {/* 顯示學生卡片 */}
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
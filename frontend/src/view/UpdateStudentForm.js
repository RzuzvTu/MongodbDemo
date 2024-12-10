import React, { useState } from "react";
import { findBySid, updateStudentById } from "../services/api"; // 引入封裝好的 API 方法
import "../styles/styles.css";

const UpdateStudentForm = () => {
    const [sid, setSid] = useState("");
    const [student, setStudent] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        userName: "",
        sid: "",
        name: "",
        department: "",
        grade: "",
        class: "",
        Email: "",
        absences: "",
    });

    // 查詢學生資料
    const handleQuery = async () => {
        try {
            const data = await findBySid(sid);
            if (data) {
                setStudent(data);
                setFormData({
                    userName: data.userName || "",
                    sid: data.sid || "",
                    name: data.name || "",
                    department: data.department || "",
                    grade: data.grade || "",
                    class: data.class || "",
                    Email: data.Email || "",
                    absences: data.absences || 0,
                });
                setShowPopup(true);
                setMessage("");
            } else {
                setMessage("查無此座號，請確認後再試！");
            }
        } catch (error) {
            setMessage("查詢失敗，請稍後再試！");
        }
    };

    // 處理表單輸入變更
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // 更新學生資料
    const handleUpdate = async () => {
        try {
            const updatedData = {
                id: student._id,
                ...formData,
            };
            await updateStudentById(updatedData);
            setMessage("學生資料更新成功！");
            setShowPopup(false);
        } catch (error) {
            setMessage("更新失敗，請稍後再試！");
        }
    };

    return (
        <div className="form-container">
            <h2>更新資料</h2>
            <div>
                <input
                    type="text"
                    placeholder="座號查詢"
                    value={sid}
                    onChange={(e) => setSid(e.target.value)}
                />
                <button onClick={handleQuery} className="query-button">
                    查詢
                </button>
            </div>

            {/* 彈窗顯示學生資料 */}
            {showPopup && student && (
                <>
                    <div className="overlay"></div>
                    <div className="popup">
                        <h3>編輯學生資料</h3>
                        <form>
                            <input
                                type="text"
                                name="userName"
                                placeholder="帳號"
                                value={formData.userName}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="sid"
                                placeholder="座號"
                                value={formData.sid}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="name"
                                placeholder="姓名"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="department"
                                placeholder="院系"
                                value={formData.department}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="grade"
                                placeholder="年級"
                                value={formData.grade}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="class"
                                placeholder="班級"
                                value={formData.class}
                                onChange={handleChange}
                            />
                            <input
                                type="email"
                                name="Email"
                                placeholder="Email"
                                value={formData.Email}
                                onChange={handleChange}
                            />
                            <input
                                type="number"
                                name="absences"
                                placeholder="缺席次數"
                                value={formData.absences}
                                onChange={handleChange}
                            />
                        </form>
                        <div className="button-group">
                            <button onClick={handleUpdate} className="update-button">
                                更新
                            </button>
                            <button onClick={() => setShowPopup(false)} className="cancel-button">
                                取消
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* 結果訊息 */}
            {message && <p>{message}</p>}
        </div>
    );
};

export default UpdateStudentForm;
import React, { useState } from "react";
import { findBySid, deleteById } from "../services/api"; // 引入封裝好的 API 方法
import "./styles.css";

const DeleteStudent = () => {
    const [sid, setSid] = useState("");
    const [student, setStudent] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const handleQuery = async () => {
        try {
            const numericSid = Number(sid);
            if (isNaN(numericSid)) {
                setMessage("座號必須是數字，請重新輸入！");
                return;
            }

            const data = await findBySid(numericSid);
            if (data) {
                setStudent(data);
                setShowPopup(true);
                setMessage("");
            } else {
                setMessage("查無此座號，請確認後再試！");
            }
        } catch (error) {
            setMessage("查無此座號，請確認後再試！");
        }
    };

    const handleDelete = async () => {
        try {
            await deleteById(student._id);
            setMessage("學生刪除成功！");
            setShowPopup(false);
            setStudent(null);
        } catch (error) {
            setMessage("刪除失敗，請稍後再試！");
        }
    };

    return (
        <div className="form-container">
            <h2>刪除學生</h2>
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

            {/* 彈窗：確認學生資訊 */}
            {showPopup && student && (
                <>
                    {/* 遮罩背景 */}
                    <div className="overlay"></div>

                    {/* 彈窗 */}
                    <div className="popup">
                        <h3>確認學生資訊</h3>
                        <p>帳號: {student.userName || "未提供"}</p>
                        <p>座號: {student.sid || "未提供"}</p>
                        <p>姓名: {student.name || "未提供"}</p>
                        <p>院系: {student.department || "未提供"}</p>
                        <p>Email: {student.Email || "未提供"}</p>
                        <div>
                            <button onClick={handleDelete} className="delete-button">
                                刪除
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

export default DeleteStudent;
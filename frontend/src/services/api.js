import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL; // 從 .env 獲取 API URL

// 獲取所有學生資料
export const findAll = async () => {
    try {
        const response = await axios.get(`${API_URL}/findAll`);
        console.log("API 返回資料:", response.data);
        return response.data.body; // 返回 body 陣列
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

// 透過 SID 查詢學生
export const findBySid = async (sid) => {
    try {
        const response = await axios.get(`${API_URL}/findBySid/${sid}`);
        console.log("API 返回查詢結果:", response.data);
        return response.data.body;
    } catch (error) {
        console.error("Error fetching student by SID:", error);
        throw error;
    }
};

// 刪除學生 (根據 ID)
export const deleteById = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/deleteById?id=${id}`);
        console.log("API 返回刪除結果:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting student:", error);
        throw error;
    }
};

// 更新學生資料
export const updateStudentById = async (updateData) => {
    try {
        const response = await axios.put(`${API_URL}/updateStudentById`, updateData);
        console.log("API 返回更新結果:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating student:", error);
        throw error;
    }
};

// 新增學生
export const insertOne = async (studentData) => {
    try {
        const response = await axios.post(`${API_URL}/insertOne`, studentData);
        console.log("API 返回新增結果:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error inserting student:", error);
        throw error;
    }
};
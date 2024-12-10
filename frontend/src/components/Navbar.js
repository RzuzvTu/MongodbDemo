import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <button className="nav-button" onClick={() => navigate("/")}>
        所有學生
      </button>
      <button className="nav-button" onClick={() => navigate("/add")}>
        新增學生
      </button>
      <button className="nav-button" onClick={() => navigate("/delete")}>
        刪除學生
      </button>
      <button className="nav-button" onClick={() => navigate("/update")}>
        更新資料
      </button>
    </nav>
  );
};

export default Navbar;
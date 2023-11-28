import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Header.css";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

function Header() {
  // Lấy cart trên local
  let cart =
    (localStorage.getItem("cart") &&
      JSON.parse(localStorage.getItem("cart") as any)) ??
    [];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") as any);
  useEffect(() => {}, [user]);
  // Đăng xuất
  const handleLogout = () => {
    try {
      Swal.fire({
        title: "Đăng xuất sẽ xóa giỏ hàng ",
        text: "Bạn đồng ý chứ!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý  !",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch({ type: "CLEAR_CART" });
          localStorage.removeItem("cart");
          localStorage.removeItem("user");
          Swal.fire("Đăng xuất!", "Bạn đã đăng xuất.", "success");
          navigate("/")
        }
      });
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <div>
      <div className="header">
        <div className="header1 ">
          <div className="kfc col-7">
            <NavLink to="/">
              <img
                src="https://www.lotteria.vn/grs-static/images/lotteria_logo.svg"
                alt=""
              />
            </NavLink>
            <h2>
              <NavLink className="black" to="/shop">
                Thực Đơn
              </NavLink>
            </h2>
            <h2>Khuyến Mãi</h2>
            <h2>Dịch vụ</h2>
            <h2>
              <NavLink
                to="/history"
                style={{ color: "black", textDecoration: "none" }}>
                Lịch sử mua hàng
              </NavLink>
            </h2>
          </div>
          {/* <div className="login col-3">
            <NavLink to="/cart">
              <div className="a-href mt-5 fs-5 col-3">
                <i className="fa-solid fa-cart-shopping"></i>
                <span className="cart-num">{cart.length > 0 ? (
                  cart.reduce(
                    (pre: any, cur: any) => (pre += cur.clickNumber),
                    0
                  )
                ) : (
                1 
                )}</span>
              </div>
            </NavLink>
            <div className="username col-5">
              {loggedIn ? (
                <div className="username1">
                  <Link to="/login">
                    <div className="username">
                      <i className="fa-solid fa-user"></i>
                      <p>{token.name}</p>
                    </div>
                  </Link>
                </div>
              ) : (
                <Link to="/login" className="username2">
                  <div className="username">
                    <i className="fa-solid fa-user"></i>
                  </div>
                </Link>
              )}
            </div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0bsBH-w_rE9dIDMcIadk_7W_QMrUTO0TyZqDxKi9t24e_nosOw8MCpy_9YuXUmu7ff4I&usqp=CAU"
              alt=""
              onClick={handleLogout}
            />
          </div> */}
          <div className="login col-4">
            <div className="col-2">
              
              <span className="cart-icon ">
                <Link to="/cart">   <i className="fa-solid fa-cart-shopping"></i></Link>
             
              </span>
              {user ? (
                <div className="cart-num">
                  {cart.length > 0
                    ? cart.reduce(
                        (pre: any, cur: any) => (pre += cur.clickNumber),
                        0
                      )
                    : 0}
                </div>
              ) : (
                <></>
              )}
            </div>
            {user ? (
              <>
                {" "}
                <div className="col-5">
                  <b>
                    Xin chào, <br />
                    {user.name}
                  </b>
                </div>
                <div className="col-5">
                  <NavLink
                    to={"/"}
                    onClick={handleLogout}
                    className="logout-icon">
                    <i className="fa-solid fa-right-from-bracket"></i> Đăng Xuất
                  </NavLink>
                </div>
              </>
            ) : (
              <>
                <div className="col-5">
                  Bạn đã có tài khoản ??
                  <NavLink to={"/login"} className="fs-5 logout-icon">
                    {" "}
                    <b>
                      <i className="fa-solid fa-user"></i> Đăng nhập
                    </b>
                  </NavLink>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

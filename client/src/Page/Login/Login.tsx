import React, { useEffect, useState } from "react";
import "./Login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";

interface IFormError {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState<IFormError>({
    email: "",
    password: "",
  });

  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  // Lấy giá trị input
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginUser((inputUser) => ({
      ...inputUser,
      [name]: value,
    }));
  };
  console.log(loginUser);

  // Sự kiện đăng nhập
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const errors: IFormError = {
      email: "",
      password: "",
    };

    if (!loginUser.email) {
      errors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(loginUser.email)) {
      errors.email = "Email không hợp lệ";
    }

    if (!loginUser.password) {
      errors.password = "Mật khẩu không được để trống";
    } else if (loginUser.password.length < 6) {
      errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    setFormErrors(errors);
    if (Object.keys(errors).length !== 0) {
      axios
        .post(`http://localhost:3000/api/v1/auth/signin`, loginUser)
        .then((res) => {
          if (res.data.status === 200) {
           
              if (res.data.rows.status === "1") {
                Swal.fire(
                  "User Locked",
                  "Tài khoản của bạn đã bị khóa",
                  "warning"
                );
              } else if (res.data.rows.status === "0") {
                Swal.fire("Good job!", "Đăng nhập thành công", "success");
                
                localStorage.setItem(
                  "user",
                  JSON.stringify(res.data.info)
                );
                navigate("/");
              }
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Tài khoản hoặc mật khẩu chưa trùng khớp",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Vui lòng nhập đầy đủ thông tin",
          });
        });
    }
  };
  return (
    <div>
     
      <div className="img-login1">
        <div>
          <img
            className="anh"
            src="https://www.lotteria.vn/grs-static/images/login-banner.jpg"
            alt=""
          />
        </div>
        <div className="form-login">
          <h2>ĐĂNG NHẬP</h2>
          <div>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={loginUser.email}
                  onChange={handleChangeInput}
                  placeholder="Enter email"
                />
                {formErrors.email && (
                  <span className="error-message" style={{ color: "red" }}>
                    {formErrors.email}
                  </span>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={loginUser.password}
                  onChange={handleChangeInput}
                  placeholder="Password"
                />
                {formErrors.password && (
                  <span className="error-message" style={{ color: "red" }}>
                    {formErrors.password}
                  </span>
                )}
              </Form.Group>

              <Button className="btn-login" variant="primary" type="submit">
                Đăng nhập
              </Button>
            </Form>
          </div>
          <div className="buttonn">
            <h4 className="btn-h4">
              <b>Hoặc tiếp tục với</b>
            </h4>
            <button className="btn-8">
              <span>
                <i className="fa-brands fa-facebook-f"></i> Đăng nhập bằng
                facebook
              </span>
            </button>
            <button className="btn-9">
              <span>
                <i className="fa-brands fa-apple"></i> Đăng nhập bằng apple
              </span>
            </button>
            <button className="btn-10">
              <span>
                <i className="fa-brands fa-google"></i> Đăng nhập bằng google
              </span>
            </button>
            <p className="add">
              Bạn đã có tài khoản?
              <NavLink to="/register" className="fs-5">
                <b>
                  <u>Đăng kí</u>
                </b>
              </NavLink>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;

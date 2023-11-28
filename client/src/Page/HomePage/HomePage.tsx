import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./HomePage.css";
import ListProduct from "../ListProduct/ListProduct";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Shop from "../Shop/Shop";

interface IUser {
  name: string;
  email: string;
  password: string;
  role: number;
  status: number;
  user_id: number;
}

function HomePage() {
  const [user, setUser] = useState<IUser[]>([]);

  const navigate = useNavigate();

  // Lấy user và lock user nếu đang đăng nhập
  const fetchUser = async () => {
    let userLogin = JSON.parse((localStorage.getItem("user") as any) ?? "");
    let userId = userLogin.users_id;

    await axios
      .get(`http://localhost:3000/api/v1/users/${userId}`)
      .then((res) => {
        setUser(res.data);
        if (res.data.status === "1") {
          Swal.fire("User Locked", "Tài khoản của bạn đã bị khóa", "warning");
          localStorage.removeItem("token");
          localStorage.removeItem("cart");
          localStorage.removeItem("user");
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Header />
      <div className="carousel">
        <Carousel interval={2000}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/329368565_3384579808496008_8609462337085841642_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHlV-WOkrTQ-TMsClvLhKnBE1HaQzOn4JUTUdpDM6fglYI6Tag8MYM0DozeOLsPWc_dXGTWSvckOtEJeOEnCjAZ&_nc_ohc=38DvRoGgyiEAX_3hbmQ&_nc_ht=scontent.fhan14-3.fna&oh=00_AfBz2-XA9strA-7Ruu8W_YzR5_w2bfbKQIjS5dR35Bbp_Q&oe=656A5424"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <img
              className="d-block w-100"
              src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/273424464_5601295809886315_7108265498566015936_n.png?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGWqxe_zHjZ2OhmuxHHrjx_QK__sDG6UzBAr_-wMbpTMMNvrUQOOfeb7Z8xnR0IHarhOvq95nd008905AwfKLu-&_nc_ohc=y_1Qe9dlKhQAX_GlDAT&_nc_ht=scontent.fhan14-3.fna&oh=00_AfDBGJdWuq84IlUmmA9JRPQ2EDedy_U3VX8z5kldS6ZK8Q&oe=65692F63"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <img
              className="d-block w-100"
              src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/334703692_896840291532472_779410236568647697_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEf21NU80Gmfrp5NHAzmlQjPnAgv82rz6c-cCC_zavPp3qKaL-DQeIU7-nCnA30Gc360vRu9O3GckRNtUII2mPc&_nc_ohc=-nXFiGi_LnIAX-K6Wv_&_nc_ht=scontent.fhan14-3.fna&oh=00_AfDKRTKoanGpKpt_bTAXg0aNVxlhL_SaezEyygs6FTxLaQ&oe=6569F08A"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      {/* <ListProduct /> */}
      <Shop/>
      <Footer />
    </div>
  );
}

export default HomePage;

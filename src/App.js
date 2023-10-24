import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./page/Home/Home";
import UserLogin from "./page/Login/user/UserLogin";
import Layout from "./template/Layout";
import BookingTicket from "./page/BookingTicket/BookingTicket";
import DetailMain from "./page/Detail/Ex_Detail";
import DangKy from "./page/DangKy/DangKy";
import Spinner from "./components/Spinner/Spinner";
import UserInfo from "./page/UserInfo/UserInfo";
import PageNotFound from "./page/PageNotFound/PageNotFound";
function App() {
  return (
    <>
      <Spinner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          ></Route>

          <Route
            path="/movie/:maPhim"
            element={
              <Layout>
                <DetailMain />
              </Layout>
            }
          ></Route>
          <Route
            path="/booking/:maLichChieu"
            element={
              <Layout>
                <BookingTicket />
              </Layout>
            }
          ></Route>
          <Route
            path="/userinfo"
            element={
              <Layout>
                <UserInfo />
              </Layout>
            }
          ></Route>
          <Route path="/login" element={<UserLogin />}></Route>
          <Route path="/dangky" element={<DangKy />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

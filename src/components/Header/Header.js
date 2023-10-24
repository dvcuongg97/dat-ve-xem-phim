import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { userLocalStorage } from "../../api/localService";

export default function Header(props) {
  //
  let { userInfo } = useSelector((state) => {
    return state.userInfoSlice;
  });

  let navigate = useNavigate();

  let handleLogin = () => {
    navigate("/login");
  };

  let handleLogout = () => {
    userLocalStorage.remove("USER");
    window.location.reload();
  };

  let handleDangKy = () => {
    navigate("/dangky");
  };

  let renderUserLogin = () => {
    let classBtn =
      "bg-transparent mr-1 hover:bg-orange-500 text-orange-500 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded transition duration-500";
    if (userInfo) {
      return (
        <>
          <div className="md:flex md:items-center">
            <div
              onClick={() => {
                navigate("/userinfo");
              }}
              className="cursor-pointer flex items-center md:px-2"
            >
              <div className="w-12 h-12 mr-3 md:mb-0 mb-2 hover:scale-110">
                <img
                  className="rounded-full"
                  src={`https://i.pravatar.cc/300?u=${userInfo.taiKhoan}`}
                  alt="..."
                />
              </div>

              <span className="font-medium">{userInfo.hoTen}</span>
            </div>
            <button onClick={handleLogout} className={classBtn}>
              <i class="fa fa-sign-out-alt"></i>Đăng Xuất
            </button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <button onClick={handleLogin} className={classBtn}>
            <i class="fa fa-sign-in-alt"></i> Đăng Nhập
          </button>
          <button onClick={handleDangKy} className={classBtn}>
            <i class="fa fa-user-plus"></i> Đăng Ký
          </button>
        </>
      );
    }
  };

  return (
    <>
      <header>
        <nav class="bg-white md:opacity-80 shadow-md shadow-black border-gray-200 dark:bg-gray-900 md:fixed z-10 w-full top-0 left-0">
          <div class=" flex flex-wrap items-center justify-between p-4">
            <NavLink to={"/"}>
              <img
                style={{ height: 50 }}
                src="../image/headTixLogo.png"
                alt="..."
              />
            </NavLink>
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              class="inline-flex items-center mr-[1%] p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-5 h-5 text-orange-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <div
              class="hidden w-screen md:w-auto md:flex md:justify-between md:items-center transition duration-1000"
              id="navbar-default"
            >
              <div className="md:hidden flex justify-center items-center">
                {renderUserLogin()}
              </div>

              <ul class="bg-gray-50 md:bg-white font-medium flex flex-col text-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <a
                    href="#lichChieu"
                    class="block py-2 pl-3 pr-4 text-gray-900 rounded md:bg-transparent md:hover:text-orange-500  md:p-0 dark:text-white md:dark:text-blue-500"
                  >
                    Lịch Chiếu
                  </a>
                </li>
                <li>
                  <a
                    href="#cumRap"
                    class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-orange-500 md:active:text-orange-500 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Cụm Rạp
                  </a>
                </li>
                <li>
                  <a
                    href="#tinTuc"
                    class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-orange-500 md:active:text-orange-500 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Tin Tức
                  </a>
                </li>
                <li>
                  <a
                    href="#ungDung"
                    class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-orange-500 md:active:text-orange-500 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Ứng Dụng
                  </a>
                </li>
              </ul>
            </div>
            <div className="hidden md:block">{renderUserLogin()}</div>
          </div>
        </nav>
      </header>
    </>
  );
}

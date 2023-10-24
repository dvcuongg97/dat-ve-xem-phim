import React from "react";
import { NavLink } from "react-router-dom";

export default function PageNotFound() {
  return (
    <section className="pt-[5%]">
      <div className="font-mono text-4xl text-center">
        <p>404 ERROR</p>
        <p>Không Tìm Thấy Trang</p>
      </div>
      <img
        className="mx-auto"
        src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
        alt="..."
      />
      <div className="font-mono text-4xl flex justify-center">
        <NavLink to={"/"} className="px-3 bg-green-500 rounded-md font-bold">
          Về Trang Chủ
        </NavLink>
      </div>
    </section>
  );
}

import React from "react";
import BannerLogin from "./BannerLogin";
import FormLogin from "./FormLogin";

export default function UserLogin() {
  return (
    <div className="h-screen flex items-center bg-orange-500">
      <div
        style={{
          backgroundImage: "url(../image/bgall.jpg)",
        }}
        className="container mx-auto flex p-10 rounded-xl"
      >
        <FormLogin />
        <BannerLogin />
      </div>
    </div>
  );
}

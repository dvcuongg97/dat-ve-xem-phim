import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment/moment";
import { Rate } from "antd";
import { LikeFilled } from "@ant-design/icons";
import { setLoadingOn, setLoadingOff } from "../../redux/spinnerSlice";
import { useDispatch } from "react-redux";

export default function CommentMovie() {
  let dispatch = useDispatch();

  let [dataComment, setDataComment] = useState([]);
  let [visible, setVisible] = useState(5);

  useEffect(() => {
    dispatch(setLoadingOn());
    axios({
      url: "https://6092b87185ff5100172137f4.mockapi.io/commentMovie",
      method: "GET",
    })
      .then((res) => {
        // console.log(res);
        setDataComment(res.data);
        dispatch(setLoadingOff());
      })
      .catch((err) => {
        dispatch(setLoadingOn());

        // console.log(err);
      });
  }, []);

  const handleReadMore = () => {
    setVisible((prevValue) => prevValue + 5);
  };

  const renderContent = () => {
    return dataComment.slice(0, visible).map((item, index) => {
      return (
        <div
          key={index}
          className="w-full text-slate-600 m-auto pt-5 px-5 pb-3 max-w-xl rounded mb-4 bg-white"
        >
          <div className="text-slate-600">
            <div className="flex justify-between">
              <div className="flex">
                <img
                  src={`https://i.pravatar.cc/150?u=${item.avtId}`}
                  alt="https://i.pravatar.cc/150?u=fake@pravatar.com"
                  width={50}
                  height={50}
                  className="rounded-[50%] mr-2"
                />
                <div className="flex flex-col">
                  <p className="font-medium text-black">{item.username}</p>
                  <p className="text-xs text-slate-400">
                    {moment(item.createdAt).subtract(10, "days").calendar()}
                  </p>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-center text-xl text-green-700 font-medium">
                  {item.point}
                </p>
                <div className="items-end">
                  <Rate defaultValue={item.point / 2} />
                </div>
              </div>
            </div>
            <div className="border-b-2 border-stone-500 py-3 mb-2 overflow-x-hidden">
              <p className="text-slate-600 text-base text-justify">
                {item.post}
              </p>
            </div>
            <div className="mb-2">
              <span>
                <LikeFilled className="cursor-pointer mr-2 text-xl" />
                <span className="text-blue-600 font-medium">
                  {item.likes} Thích
                </span>
              </span>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <>
      {renderContent()}
      <div className="text-center">
        <button
          onClick={handleReadMore}
          className="py-2 px-6 rounded border border-stone-500 text-white font-medium  hover:bg-red-700"
        >
          Xem Thêm
        </button>
      </div>
    </>
  );
}

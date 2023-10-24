import React from "react";

import ModalVideo from "react-modal-video";
import "../../../node_modules/react-modal-video/css/modal-video.css";
import { useDispatch, useSelector } from "react-redux";
import { setOpenVideoModal } from "../../redux/videoModalSlice";

export default function VideoModal() {
  let dispatch = useDispatch();
  let { urlTrailer, isOpen } = useSelector((state) => state.videoModalSlice);

  return (
    <ModalVideo
      channel="youtube"
      autoplay
      isOpen={isOpen}
      videoId={urlTrailer}
      onClose={() => {
        dispatch(setOpenVideoModal(!isOpen));
      }}
    />
  );
}

//   let [isOpen, setOpen] = useState(false);
//   let urlTrailer = "";
//   let renderTrailer = (detailMovie) => {
//     let trailer = detailMovie.trailer;
//     setOpen(!isOpen);
//     let index = trailer.lastIndexOf("/");
//     urlTrailer = trailer.slice(index + 1, trailer.length);
//     console.log("🚀 ~ urlTrailer:", urlTrailer);
//   };

import React, { Component, Fragment } from "react";

import { getArrMovie } from "../../../api/api";

import "./StyleCardPhim.css";
import "./RatingStyle.css";
import "./TextStyle.css";

import Slider from "react-slick";
// import { Slider } from "react-slick/dist/react-slick";

import "../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";
import "react-slick/dist/react-slick";

import ModalVideo from "react-modal-video";
import "../../../../node_modules/react-modal-video/css/modal-video.css";
import { NavLink } from "react-router-dom";

export default class DanhSachPhimDesktop extends Component {
  state = {
    danhSachPhim: [],
    isOpen: false,
    trailerPhim: "",
  };

  componentDidMount() {
    getArrMovie()
      .then((res) => {
        // console.log("api data", res);
        this.setState({ danhSachPhim: res.data.content });
      })
      .catch((err) => {
        // console.log(err);
      });
  }
  renderTrailer(item) {
    let trailer = item.trailer;
    this.setState({ isOpen: true });
    let index = trailer.lastIndexOf("/");
    let urlTrailer = trailer.slice(index + 1, trailer.length);
    this.setState({ trailerPhim: urlTrailer });
  }
  renderCardPhim = () => {
    return this.state.danhSachPhim.map((item, index) => {
      return (
        <Fragment key={index}>
          <div className="w-full flex justify-center font-medium text-green-500 mb-24"></div>
          <div className="card-phim">
            <div className="img-hover-tut">
              <img src={item.hinhAnh} alt={item.hinhAnh} />
              <div>
                <i data-star={item.danhGia / 2}></i>
              </div>
              <div className="img-overlay">
                <div
                  onClick={() => {
                    this.renderTrailer(item);
                  }}
                  className="button-play"
                >
                  <img src="../image/play-video1.png" alt="..." />
                </div>
              </div>
            </div>
            <div className="phim-content">
              <div className="div-ten-phim">
                <span className="span-c18">TIX</span>
                {item.tenPhim}
              </div>
              <div className="button-chitiet">
                <NavLink to={`movie/${item.maPhim}`}>Mua Vé</NavLink>
              </div>
            </div>
          </div>
        </Fragment>
      );
    });
  };

  render() {
    const settings = {
      className: "center",
      infinite: true,
      dots: true,
      slidesToShow: 4,
      speed: 500,
      rows: 1,
      slidesPerRow: 2,
      slidesToScroll: 2,

      // dots: true,
      // infinite: true,
      // speed: 500,
      // slidesToShow: 3,
      // slidesToScroll: 3,

      responsive: [
        {
          breakpoint: 1050,
          settings: {
            infinite: true,
            dots: true,
            slidesToShow: 3,
            speed: 500,
            rows: 2,
            slidesPerRow: 1,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <>
        <div className="container mx-auto">
          <div id="lichChieu" className="w-[80vw] max-w-[940px] mx-auto mb-9">
            <ModalVideo
              channel="youtube"
              autoplay
              isOpen={this.state.isOpen}
              videoId={this.state.trailerPhim}
              onClose={() => this.setState({ isOpen: false })}
            />

            <Slider {...settings}>{this.renderCardPhim()}</Slider>
          </div>
        </div>
      </>
    );
  }
}

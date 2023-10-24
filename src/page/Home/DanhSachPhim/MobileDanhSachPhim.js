import React, { Component } from "react";

import { getArrMovie } from "../../../api/api";

import "./MobileCardStyle.css";
import "./TextStyle.css";

import Slider from "react-slick";
// import { Slider } from "react-slick/dist/react-slick";

import "../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";
import "react-slick/dist/react-slick";

import ModalVideo from "react-modal-video";
import "../../../../node_modules/react-modal-video/css/modal-video.css";
import { NavLink } from "react-router-dom";

export default class MobileDSPhim extends Component {
  state = {
    danhSachPhim: [],
    isOpen: false,
    trailerPhim: "",
  };

  componentDidMount() {
    getArrMovie()
      .then((res) => {
        // console.log(res);
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
        <div key={index} className="mobile-card-container ">
          <img
            className="mobile-card-img"
            src={item.hinhAnh}
            alt={item.hinhAnh}
          />
          <div className="mobile-card-content relative">
            <div className="div-ten-phim">
              <span className="span-c18">TIX</span>
              {item.tenPhim}
            </div>
            <h4 className="text-detail-phim-h4">
              {item.moTa.slice(0, 100)}...
            </h4>
            <NavLink
              to={`movie/${item.maPhim}`}
              className="mobile-button absolute bottom-0 left-2"
            >
              Mua Vé
            </NavLink>
          </div>
        </div>
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
      rows: 2,
      slidesPerRow: 1,
      slidesToScroll: 2,
      responsive: [
        {
          breakpoint: 770,
          settings: {
            // rows: 3,
            slidesToShow: 1,
            slidesPerRow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      // <div className="containe mx-auto">
      <div className="w-full">
        <ModalVideo
          channel="youtube"
          autoplay
          isOpen={this.state.isOpen}
          videoId={this.state.trailerPhim}
          onClose={() => this.setState({ isOpen: false })}
        />
        <Slider {...settings}>{this.renderCardPhim()}</Slider>
      </div>
      // </div>
    );
  }
}

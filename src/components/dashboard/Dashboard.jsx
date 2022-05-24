import styled from "@emotion/styled";
import { ArrowRightAlt, KeyboardDoubleArrowRight } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay } from "swiper";

import logo from "../../images/bee.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { useToggle } from "rooks";
import { Link } from "react-router-dom";
import Tags from "../../pages/tags/Tags";

const Dash = styled.div`
  background: var(--third_clr);
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  padding: 0;
`;
const Main = styled.main`
  position: relative;
  width: 80%;
  height: 100%;
`;
const Entry = styled.div`
  width: 100%;
  height: 85%;
  overflow: auto;
  overflow-x: hidden;
  padding-top: 10px;
  padding-left: 20px;
`;
const PopularHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding-right: 15px;
`;
const Popular = styled.p`
  font-size: clamp(1rem, 1.15vw, 3rem);
  margin: 0;
  font-weight: 700;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;
const Seeall = styled.p`
  color: var(--white);
  margin: 0;
`;
const Slider = styled.div`
  position: relative;
`;
const GameCard = styled.div`
  position: relative;
  background-color: var(--secondary_clr);
  border-radius: 10px;
  padding-bottom: 15px;
  box-shadow: -3px 20px 20px #00000021;
  color: var(--text_clr);
  transition: transform 0.7s;
  margin-top: 1rem;
  &:hover {
    transform: scale(1.025);
    border: 2px solid var(--primary_clr);
    box-shadow: -2px 4px 20px 0px #583cc9b0;
  }
`;
const GameImg = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  -o-object-fit: cover;
  object-position: center;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    visibility: visible;
    opacity: 1;
  }
`;
const GameHeading = styled.h3`
  font-size: clamp(1rem, 1vw, 2rem);
  margin-top: 15px;
  margin-bottom: 0px;
  font-family: "EvilEmpire";
  padding-left: 0.725rem;
  z-index: 2;
  font-weight: 100;
  transition: 0.7s;
`;

const ToggleBtn = styled.button`
  display: none;
  position: fixed;
  top: auto;
  bottom: 10vh;
  width: 50px;
  height: 50px;
  background: #6846ec;
  border-radius: 50%;
  border: 0;
  left: auto;
  right: 25px;
  padding: 10px;
  box-shadow: 10px 10px 14px #3a2784, -5px -5px 30px var(--primary_clr);
  z-index: 99;
`;

SwiperCore.use([Navigation, Autoplay]);


const Dashboard = () => {

  const swiperRef = useRef(null);
  const [gameData, setGameData] = useState([]);
  const [value, setValue] = useToggle(true);

  var hide = value.toString();
  // hide === "false" ? console.log("False") : console.log("True");
  const Autoplay = () => {
    swiperRef.current.swiper.autoplay.start();
    // console.log("Autoplay");
  };
  const StopAutoplay = () => {
    swiperRef.current.swiper.autoplay.stop();
    // console.log("StopAutoplay");
  };

  useEffect(() => {
    const getGame = async () => {
      const res = await fetch("https://www.freetogame.com/api/games");
      const myData = await res.json();
      // console.log(myData.slice(0, 15));
      setGameData(myData.slice(0, 15));
    };
    getGame();
  }, []);


  return (
    <React.Fragment>
      <Dash>
        <Sidebar sidebar={hide === "false" ? "sidebar" : ""} />
        <Main>
          <Topbar />
          <Entry>
            <PopularHeading>
              <Popular>Popular Games</Popular>
              <Seeall>
                See All&nbsp;&nbsp;{" "}
                <ArrowRightAlt
                  style={{ position: "relative", top: "7px" }}
                ></ArrowRightAlt>{" "}
              </Seeall>
            </PopularHeading>
            <Slider onMouseLeave={Autoplay} onMouseEnter={StopAutoplay}>
              <Swiper
                ref={swiperRef}
                modules={[Navigation]}
                spaceBetween={50}
                slidesPerView={5}
                navigation
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  320: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                  1366: {
                    slidesPerView: 5,
                    spaceBetween: 15,
                  },
                  1600: {
                    slidesPerView: 5,
                    spaceBetween: 15,
                  },
                  1920: {
                    slidesPerView: 5,
                    spaceBetween: 15,
                  },
                }}
              >
                {gameData.map((data) => (
                  <SwiperSlide key={data.id}>
                    <GameCard>
                      <GameImg src={data.thumbnail} alt={data.title}></GameImg>
                      <div className="game-shadow">
                        <Link className="link" to={`/preview/${data.id}`}>
                          <KeyboardDoubleArrowRight></KeyboardDoubleArrowRight>
                        </Link>
                      </div>
                      <GameHeading className="game-heading">
                        {data.title}
                      </GameHeading>
                    </GameCard>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Slider>

            <Tags />
            <ToggleBtn onClick={setValue} style={{ float: "Right" }}>
              <img src={logo} style={{ width: "100%" }} alt="logo" />
            </ToggleBtn>
          </Entry>
        </Main>
      </Dash>
    </React.Fragment>
  )
}

export default Dashboard
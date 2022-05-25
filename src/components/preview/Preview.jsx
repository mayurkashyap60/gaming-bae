import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import { useToggle } from "rooks";
import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay, Pagination } from "swiper";
import { landscapeAndroid, landscapeIphone, mobile } from "../../responsive";

import logo from "../../images/bee.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { useLocation } from "react-router-dom/";
import axios from "axios";

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
  ${mobile({ width: "100%" })}
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
  ${mobile({
  display: "block",
})}
`;
const Entry = styled.div`
  width: 100%;
  height: 85%;
  overflow: auto;
  overflow-x: hidden;
  padding-top: 1.5rem;
  padding-left: 1rem;
  position: relative;
  ${mobile({
  paddingLeft: "0rem",
})}
  ${landscapeAndroid({
  height: "75%",
})}
  ${landscapeIphone({
  height: "75%",
})}
`;
const GamePreview = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
`;
const GameSnip = styled.div`
  width: 35%;
  ${mobile({
  width: "90%",
  margin: "auto",
})}
`;
const GameImg = styled.img`
  width: 100%;
  height: auto;
  border: 2px solid var(--primary_clr);
  border-radius: 15px;
  box-shadow: -4px 20px 20px 0px #583cc9b0;
`;
const GameTitle = styled.p`
  font-size: clamp(1.25rem, 2vw, 4rem);
  font-family: "EvilEmpire";
  padding-top: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 7px double var(--primary_clr);
  text-align: center;
  border-radius: 50px;
`;
const GameText = styled.div`
  width: 65%;
  padding-left: 2.5rem;
  padding-top: 0.5rem;
  ${mobile({
  width: "90%",
  margin: "auto",
  paddingLeft: "0.5rem",
  paddingTop: "1.25rem",
})}
`;
const DataTitle = styled.p`
  font-family: "StreamerDemo";
  border-bottom: 2px dashed var(--primary_clr);
  width: fit-content;
  font-size: clamp(0.75rem, 0.75vw, 2.5rem);
  padding-bottom: 5px;
  margin-bottom: 10px;
`;
const DataText = styled.p`
  font-size: clamp(0.75rem, 0.9vw, 2.5rem);
  padding-bottom: 10px;
  margin-bottom: 10px;
`;
const DataList = styled.ul`
  padding-left: 1rem;
`;
const DataListText = styled.li`
  list-style-type: disclosure-closed;
  font-size: clamp(0.75rem, 0.9vw, 2.5rem);
  padding-bottom: 10px;
  margin-bottom: 10px;
`;
const GameDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 2rem;
  padding: 2.5rem 1rem 1.5rem;
`;
const GameDetailsTitle = styled.p`
  font-family: "EvilEmpire";
  border-bottom: 2px dashed var(--primary_clr);
  width: fit-content;
  font-size: clamp(1rem, 1.25vw, 2rem);
  padding-bottom: 5px;
  margin-bottom: 10px;
`;
const GameDetailsText = styled.p`
  font-size: clamp(0.75rem, 0.75vw, 1.5rem);
  padding-bottom: 0px;
  margin-bottom: 0px;
  text-transform: capitalize;
`;
const Link = styled.a`
  color: var(--white) !important;
  text-decoration: none !important;
  text-transform: lowercase;
  overflow-wrap: anywhere;
`;
const GameDescription = styled.div`
  position: relative;
`;
const DescText = styled.p`
  font-size: clamp(1rem, 1.5vw, 2.5rem);
  font-weight: 200;
  padding: 15px;
  font-family: "EvilEmpire" !important;
  color: var(--text_clr);
  line-height: 1.5;
  &::first-letter {
    font-size: 200%;
    color: var(--white);
    padding-right: 10px;
    font-family: "StreamerDemo" !important;
  }
`;
const GameSlider = styled.div`
  width: 95%;
  margin: auto;
`;
const SwiperSlideImg = styled.img`
  width: 100%;
  height: auto;
  border-radius: 15px;
  cursor: pointer;
`;

SwiperCore.use([Navigation, Autoplay]);

const Preview = () => {

  const location = useLocation();
  const path = location.pathname.split("/")[2];
  // console.log(path);
  const swiperRef = useRef(null);
  const [gameData, setGameData] = useState([]);
  const [value, setValue] = useToggle(true);
  const [os, setOs] = useState("");
  const [processor, setProcessor] = useState("");
  const [memory, setMemory] = useState("");
  const [graphics, setGraphics] = useState("");
  const [storage, setStorage] = useState("");
  const [slideA, setSlideA] = useState("");
  const [slideB, setSlideB] = useState("");
  const [slideC, setSlideC] = useState("");
  const [slideD, setSlideD] = useState("");

  var hide = value.toString();
  const Autoplay = () => {
    swiperRef.current.swiper.autoplay.start();
    console.log("Autoplay");
  };
  const StopAutoplay = () => {
    swiperRef.current.swiper.autoplay.stop();
    console.log("StopAutoplay");
  };

  useEffect(() => {
    const gameById = async () => {
      const res = await axios.get(
        `https://www.freetogame.com/api/game?id=${path}`
      );
      setGameData(res.data);
      setOs(res.data.minimum_system_requirements.os);
      setProcessor(res.data.minimum_system_requirements.processor);
      setMemory(res.data.minimum_system_requirements.memory);
      setGraphics(res.data.minimum_system_requirements.graphics);
      setStorage(res.data.minimum_system_requirements.storage);
      setSlideA(res.data.screenshots[0].image);
      setSlideB(res.data.screenshots[1].image);
      setSlideC(res.data.screenshots[2].image);
      setSlideD(res.data.screenshots[3].image);
    };
    gameById();
  }, [path]);

  return (
    <React.Fragment>
      <Dash>
        <Sidebar sidebar={hide === "false" ? "sidebar" : ""} />
        <Main>
          <Topbar />
          <Entry>
            <GamePreview>
              <GameSnip>
                <GameImg src={gameData.thumbnail} alt="thumbnail" />
                <GameTitle>{gameData.title}</GameTitle>
              </GameSnip>
              <GameText>
                <DataTitle>SHORT DESCRIPTION</DataTitle>
                <DataText>{gameData.short_description}</DataText>
                <DataTitle>MINIMUM SYSTEM REQUIREMENTS</DataTitle>
                <DataList>
                  <DataListText>{os}</DataListText>
                  <DataListText>{processor}</DataListText>
                  <DataListText>{memory}</DataListText>
                  <DataListText>{graphics}</DataListText>
                  <DataListText>{storage}</DataListText>
                </DataList>
              </GameText>
            </GamePreview>
            <GameDetails>
              <div>
                <GameDetailsTitle>Gameurl</GameDetailsTitle>
                <GameDetailsText>
                  <Link href={gameData.game_url} target="_blank">
                    {gameData.game_url}
                  </Link>
                </GameDetailsText>
              </div>
              <div>
                <GameDetailsTitle>Genre</GameDetailsTitle>
                <GameDetailsText>{gameData.genre}</GameDetailsText>
              </div>
              <div>
                <GameDetailsTitle>Platform</GameDetailsTitle>
                <GameDetailsText>{gameData.platform}</GameDetailsText>
              </div>
              <div>
                <GameDetailsTitle>Publisher</GameDetailsTitle>
                <GameDetailsText>{gameData.publisher}</GameDetailsText>
              </div>
              <div>
                <GameDetailsTitle>Developer</GameDetailsTitle>
                <GameDetailsText>{gameData.developer}</GameDetailsText>
              </div>
              <div>
                <GameDetailsTitle>Release Date</GameDetailsTitle>
                <GameDetailsText>{gameData.release_date}</GameDetailsText>
              </div>
            </GameDetails>
            <GameDescription>
              <DescText>{gameData.description}</DescText>
              <GameSlider onMouseLeave={Autoplay} onMouseEnter={StopAutoplay}>
                <Swiper
                  ref={swiperRef}
                  modules={[Pagination]}
                  spaceBetween={5}
                  slidesPerView={1}
                  pagination
                  loop={true}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                  }}
                >
                  <SwiperSlide>
                    <SwiperSlideImg src={slideA} alt="freetogame" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <SwiperSlideImg src={slideB} alt="freetogame" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <SwiperSlideImg src={slideC} alt="freetogame" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <SwiperSlideImg src={slideD} alt="freetogame" />
                  </SwiperSlide>
                </Swiper>
              </GameSlider>
            </GameDescription>
            <ToggleBtn onClick={setValue} style={{ float: "Right" }}>
              <img src={logo} style={{ width: "100%" }} alt="logo" />
            </ToggleBtn>
          </Entry>
        </Main>
      </Dash>
    </React.Fragment>
  )
}

export default Preview
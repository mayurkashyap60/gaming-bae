import styled from "@emotion/styled";
import React from "react";
import { useToggle } from "rooks";
import logo from "../../images/bee.png";
import ScreenshotMonitorIcon from "@mui/icons-material/ScreenshotMonitor";
import PublishIcon from "@mui/icons-material/Publish";
import CodeIcon from "@mui/icons-material/Code";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

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
const Parent = styled.div`
  padding: 1rem;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 15px;
  align-items: baseline;
`;
const GameCard = styled.div`
  position: relative;
  background: var(--secondary_clr);
  color: #ffffff;
  padding: 10px 10px 15px 10px;
  box-shadow: -17px 20px 20px 0px #000000;
  text-transform: capitalize;
  border: 1px dashed var(--primary_clr);
`;
const GameImg = styled.img`
  width: 100%;
  height: auto;
  position: relative;
  object-fit: cover;
  border-radius: 15px;
`;
const GameTitle = styled.h3`
  font-size: clamp(1rem, 1.25vw, 3rem);
  margin: 0;
  font-weight: 700;
  margin: 5px auto 10px;
  font-family: "EvilEmpire" !important;
  color: var(--text_clr);
`;
const ShortDesc = styled.p`
  font-size: 1rem;
  font-weight: 300;
  color: var(--white);
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 0px;
`;
const Details = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  background: var(--secondary_clr);
  margin-top: 10px;
  padding: 5px 5px;
  margin-bottom: 10px;
`;
const DetailsDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 8px;
  margin-left: 0;
`;
const Small = styled.small`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  margin-bottom: 0px;
  padding-left: 10px;
`;
const Genre = styled.small`
  background: var(--primary_clr);
  color: var(--white);
  position: absolute;
  top: 0px;
  left: 0px;
  padding: 3px 7px;
  border-bottom-right-radius: 5px;
  box-shadow: 6px 4px 4px #000000a1;
  font-family: "StreamerDemo" !important;
`;
const ReadMore = styled(Link)({
    color: "#ffffff !important",
    textDecoration: "none !important",
    background: "var(--primary_clr)",
    padding: "2px 20px",
    boxShadow: "1px 2px 20px 0px #000000",
});

const Categories = () => {
    const [value, setValue] = useToggle(true);
    var hide = value.toString();
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [catData, setCatData] = React.useState([]);

    React.useEffect(() => {
        const getCategories = async () => {
            const res = await axios.get(
                `https://www.freetogame.com/api/games?category=${path}`
            );
            setCatData(res.data);
        };
        getCategories();
    }, [path]);
    return (
        <React.Fragment>
            <Dash>
                <Sidebar sidebar={hide === "false" ? "sidebar" : ""} />
                <Main>
                    <Topbar />
                    <Entry>
                        <Parent>
                            {catData.map((data, i) => (
                                <GameCard key={i}>
                                    <GameImg src={data.thumbnail} alt={data.title} />
                                    <Genre>{data.genre}</Genre>
                                    <GameTitle>{data.title}</GameTitle>
                                    <ShortDesc>{data.short_description}</ShortDesc>
                                    <Details>
                                        <DetailsDiv>
                                            <ScreenshotMonitorIcon
                                                style={{ color: "var(--primary_clr)" }}
                                            ></ScreenshotMonitorIcon>
                                            <Small>{data.platform}</Small>
                                        </DetailsDiv>
                                        <DetailsDiv>
                                            <PublishIcon
                                                style={{ color: "var(--primary_clr)" }}
                                            ></PublishIcon>
                                            <Small>{data.publisher}</Small>
                                        </DetailsDiv>
                                        <DetailsDiv>
                                            <CodeIcon
                                                style={{ color: "var(--primary_clr)" }}
                                            ></CodeIcon>
                                            <Small>{data.developer}</Small>
                                        </DetailsDiv>
                                        <DetailsDiv>
                                            <SystemUpdateAltIcon
                                                style={{ color: "var(--primary_clr)" }}
                                            ></SystemUpdateAltIcon>
                                            <Small>{data.release_date}</Small>
                                        </DetailsDiv>
                                    </Details>
                                    <ReadMore to={`/preview/${data.id}`}>Read More...</ReadMore>
                                </GameCard>
                            ))}
                        </Parent>
                        <ToggleBtn onClick={setValue} style={{ float: "Right" }}>
                            <img src={logo} style={{ width: "100%" }} alt="logo" />
                        </ToggleBtn>
                    </Entry>
                </Main>
            </Dash>
        </React.Fragment>
    )
}

export default Categories
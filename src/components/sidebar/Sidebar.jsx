import styled from "@emotion/styled";
import { Button } from "@mui/material";
import React from "react";
import logo from "../../images/bee.png";
import HomeIcon from "@mui/icons-material/Home";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import ClassIcon from "@mui/icons-material/Class";
import { Download, Settings, Timeline } from "@mui/icons-material";

const Sidebar = (props) => {
  const MySidebar = styled.aside`
    width: 20%;
    height: 100%;
    background-color: var(--secondary_clr);
    border-right: 1px dashed var(--primary_clr);
    overflow-x: hidden;
    overflow-y: auto;
    transition: 0.5s ease-in-out;
  `;
  const Entry = styled.div`
    width: 100%;
    padding: 2rem 0rem;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
  `;
  const Logo = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 97%;
    margin: 0 auto;
  `;
  const LogoImg = styled.img`
    width: 75px;
    height: fit-content;
    object-fit: cover;
  `;
  const Text = styled.p`
    font-family: "StreamerDemo";
    margin: 0;
    font-size: clamp(0.75rem, 1.75vw, 4rem);
    margin-left: 15px;
  `;
  const Navigation = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
    width: 85%;
    padding-top: 2.5rem;
    margin-left: 0;
  `;
  const NavButton = styled(Button)({
    color: "var(--white)",
    marginBottom: "1rem",
    fontWeight: "600",
    width: "100%",
    textAlign: "left",
    whiteSpace: "nowrap",
    padding: "1rem",
    background: "var(--primary_clr)",
    fontFamily: "Poppins",
    borderRadius: "15px",
    fontSize: "clamp(0.725rem, 1vw, 2.5rem)",
    alignItems: "center",
    justifyContent: "flex-start",
  });
  return (
    <React.Fragment>
      <MySidebar
        className={props.sidebar}
        style={{ transition: "0.5s ease-in-out" }}
      >
        <Entry>
          <Logo>
            <LogoImg src={logo}></LogoImg>
            <Text>GaMIng bAe</Text>
          </Logo>
          <Navigation>
            <NavButton>
              <HomeIcon style={{ marginRight: "1rem" }} /> Home
            </NavButton>
            <NavButton>
              <FlashOnIcon style={{ marginRight: "1rem" }} /> Trending
            </NavButton>
            <NavButton>
              <ClassIcon style={{ marginRight: "1rem" }} /> Game Category
            </NavButton>
            <NavButton>
              <Timeline style={{ marginRight: "1rem" }} /> Leaderboard
            </NavButton>
            <NavButton>
              <Download style={{ marginRight: "1rem" }} /> Download App
            </NavButton>
            <NavButton>
              <Settings style={{ marginRight: "1rem" }} /> Setting
            </NavButton>
          </Navigation>
        </Entry>
      </MySidebar>
    </React.Fragment>
  )
}

export default Sidebar
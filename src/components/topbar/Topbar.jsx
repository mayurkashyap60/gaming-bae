import styled from "@emotion/styled";
import { KeyboardArrowDown, Search } from "@mui/icons-material";
import React from "react";

// import { landscapeAndroid, landscapeIphone, mobile } from "../../responsive";
// import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles({
//   input: {
//     color: "#ffffff",
//   },
// });

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 1px dashed var(--primary_clr);
  padding: 0.75rem 1rem;
  height: 15%;
 
`;
const SearchBox = styled.div`
  flex: 9;
  background-color: var(--secondary_clr);
  padding: 0.5rem 0.25rem 0.5rem 1rem;
  border-radius: 15px;
  display: flex;
  align-items: center;
  font-family: "Poppins";
`;
const User = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const SearchIco = styled(Search)({
  fontSize: "2rem",
  width: "35px",
  height: "35px",
  marginRight: "1rem",
});
const InputSearch = styled.input`
  width: calc(100% - 35px);
  height: calc(2.5em + 0.75rem + 2px);
  background-color: var(--secondary_clr);
  border: 0;
  color: var(--white);
  padding: 8px;
  font-family: "Poppins";
`;
const UserImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--primary_clr);
  padding: 5px;
  box-shadow: 10px 10px 14px #3a2784, -5px -5px 30px var(--primary_clr);

`;
const UserName = styled.p`
  margin: 0;
  margin-left: 15px;
`;

const Topbar = () => {
  // const classes = useStyles();
  return (
    <React.Fragment>
      <Nav>
        <SearchBox>
          <SearchIco></SearchIco>
          <InputSearch id="search" placeholder="Search Here..."></InputSearch>
        </SearchBox>
        <User>
          <UserImg src="https://picsum.photos/150/150"></UserImg>
          <UserName>Budi Santuy</UserName>
          <KeyboardArrowDown style={{ marginLeft: "10px" }}></KeyboardArrowDown>
        </User>
      </Nav>
    </React.Fragment>
  );
};

export default Topbar;
import styled from "@emotion/styled";
import React from 'react'
import { Link } from 'react-router-dom';
import categories from '../categories.json';

const Parent = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
align-items: center;
gap: 10px;
padding: 15px;
`

const Categories = styled(Link)({
    color: "var(--white) !important",
    textDecoration: "none !important",
    background: "var(--primary_clr)",
    padding: "5px 20px",
    boxShadow: "1px 2px 20px 0px #000000",
})

const Tags = () => {
    return (
        <React.Fragment>
            <Parent>
                {
                    categories.map((data) => (
                        <Categories key={data.id} to={`/`}>{data.cat}</Categories>
                    ))
                }

            </Parent>

        </React.Fragment>
    )
}

export default Tags
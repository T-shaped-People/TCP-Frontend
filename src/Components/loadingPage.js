import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";
import { MainHeader } from "../allFiles";

export default function LoadingPage()
{
    return(
        <>
            <MainHeader/>
            <Size>
                <ClipLoader 
                    color={"blue"} loading={true} size={150}
                />
                <Title>로딩중...</Title>
            </Size>
        </>
    )
}

const Size = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Title = styled.h1`
    font-size: 30px;
    margin-top: 20px;
`
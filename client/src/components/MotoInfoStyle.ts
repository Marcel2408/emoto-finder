import styled, { keyframes } from 'styled-components';

export const MotoInfoContainer = styled.div`
  height: 200px;
  width: 100vw;
  background-color: #FFF;
  display: flex;
  flex-direction: column;
  border-radius: 15px 15px 0px 0px;
  box-shadow: 0px 0px 8px 8px rgba(0,0,0,0.11);
  position: absolute;
  z-index-2;
`;
export const MotoInfoDetails = styled.div`
  height: 150px;
  width: 100vw;
  display: flex;
  flex-direction: row;
`;
export const MotoInfoLeft = styled.div`
  height: 100px;
  width: 70vw;
  padding-left: 2vw;
  h2 {
    margin: 2vh 0vh;
  }
`;
export const MotoInfoLeftDetails = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  p {
    margin-right: 1vw;
    margin-top: 1vw;
  }
`;
export const MotoInfoRight = styled.div`
  height: 150px;
  width: 30vw;
  margin-right: 2vw;
  img {
    width: 25vw;
  }
`;

const slideInUp = keyframes`
  0% {
    height: 0;
  }
`;

export const MotoContainerWrapper = styled.div`
  height: 40vh;
  animation: 0.5s ${slideInUp} ease;
  background-color: blue;
  position: absolute;
  bottom: 0;
`;

export const MotoInfoRightLogo = styled.div`
  height: 75px;
  width: 30vw;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 25vw;
  }
`;
export const MotoInfoRightInfo = styled.div`
  height: 75px;
  width: 30vw;
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
  }
  p {
    margin-left: 1vw;
  }
`;
export const MotoInfoButton = styled.div`
  height: 50px;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-botton: 10px;
`;

export const BookMoto = styled.button`
  box-sizing: border-box;
  padding: 1em 2em;
  margin: auto;
  font-size: 100%;
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 4px;
  background-color: #ffa40b;
  box-shadow: 0 2px 10px -1px rgba(7, 7, 7, 0.3);
`;

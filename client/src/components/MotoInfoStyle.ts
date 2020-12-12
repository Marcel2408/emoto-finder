import styled, { keyframes } from 'styled-components';

export const MotoInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5em;
  border-radius: 15px 15px 0px 0px;
  box-shadow: 0px 0px 8px 8px rgba(0, 0, 0, 0.11);
`;

export const MotoInfoWrapper = styled.div`
  display: flex;
  width: 90%;
  padding-top: 0.25em;
`;

export const FlexColumn = styled.div`
  flex-basis: 50%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

export const TotalTravelTime = styled.div`
  height: 100%;
  padding: 0.42em;
  margin-right: 0.35em;
  display: inline-block;
  border-radius: 4px;
  background-color: #ffa40b;
  color: white;
`;

export const MotoInfoDetails = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.25em;
  span {
    font-size: 1.3rem;
    font-weight: bolder;
  }
`;

const slideInUp = keyframes`
  0% {
    height: 0;
  }
`;

export const MotoContainerWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 40vh;
  animation: 0.2s ${slideInUp} ease;
`;

export const MotoInfoProviderLogo = styled.div`
  max-width: 50%;
  height: 3em;
  margin: 1em 0 0.5em auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1em;
  img {
    height: 2em;
    max-width: 100%;
  }
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
export const MotoIconAnimated = styled.div`
  height: 100%;
  position: relative;
  width: 100%;
`;

const motoAnimation = keyframes`
  0% {
    margin-left: -40%;
  }
  `;

export const AnimatedImage = styled.img`
  position: absolute;
  bottom: 1.5em;
  margin-left: 100%;
  width: 7em:
  height: 4em;
  animation: 5s infinite linear ${motoAnimation};
  `;

export const IncomingText = styled.p`
  font-size: 170%;
  text-align: center;
  color: #ffa40b;
  font-weight: bold;
`;

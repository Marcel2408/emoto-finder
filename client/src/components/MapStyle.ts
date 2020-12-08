import styled from 'styled-components';

export const ContainerDiv = styled.div`
  height: 736px;
  width: 414px;
`;
export const MapDiv = styled.div`
  height: 100vh;
  position: relative;
  z-index: 1;
`;
export const MotoContainerDiv = styled.div`
  height: 200px;
  width: 414px;
  position: absolute;
  z-index: 5;
  bottom: 0px;
`;
export const HeaderDiv = styled.div`
  height: 10%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 4vw;
  padding: 0% 5vw;
  position: absolute;
  z-index: 5;
`;
export const HeaderRight = styled.div`
  width: 12vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: right;
  margin-top: 15vw;
  padding: 0% 5vw;
`;
export const CircleIcon = styled.div`
  height: 12vw;
  width: 12vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin: 1vh 0vh;
  background-color: #303f9f;
`;
export const SelectedMotoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 10;
  transform: scale(1);
  animation: pulse 1s infinite;
  @keyframes pulse {
    0% {
      transform: scale(1);
      filter: drop-shadow(0px 0px 0px #ffd700);
    }

    70% {
      transform: scale(1.2);
      filter: drop-shadow(4px 8px 16px #ffd700);
    }

    100% {
      transform: scale(1);
      filter: drop-shadow(0px 0px 0px #ffd700);
    }
  }
  p {
    margin: 0px;
    padding: 0px;
  }
`;
export const NormalMotoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 7;
  p {
    margin: 0px;
    padding: 0px;
  }
`;
export const Loader = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

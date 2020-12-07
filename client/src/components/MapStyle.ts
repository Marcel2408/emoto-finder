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
  height: 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  margin-top: 20px;
  left: 0px;
  top: 0px;
  z-index: 5;
`;
export const ChangeDestinationDiv = styled.div`
  margin-left: 100px;
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

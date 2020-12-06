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
  z-index: 4;
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
  z-index: 3;
  p {
    margin: 0px;
    padding: 0px;
  }
`;

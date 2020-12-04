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
  z-index: 2;
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
  z-index: 2;
`;
export const ChangeDestinationDiv = styled.div`
  margin-left: 100px;
`;
export const SelectedMotoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  background-color: green;
  border-radius: 50%;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
`;

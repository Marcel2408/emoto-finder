import styled from 'styled-components';

export const Video = styled.video`
  position: fixed;
  z-index: -1;

  @media (min-aspect-ratio: 16/9) {
    width: auto;
  }
  @media (max-aspect-ratio: 16/9) {
    height: 800px;
  }

  background-color: black;
`;

export const LoginDiv = styled.div`
  position: fixed;
  top: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  z-index: 1;
`;

export const FormDiv = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
`;

export const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  width: auto;
  color: white;
`;

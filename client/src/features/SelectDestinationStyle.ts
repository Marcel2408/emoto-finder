import styled, { keyframes } from 'styled-components';

export const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

export const SelectDestinationContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const SelectDestinationHeader = styled.h1`
  width: 100%;
  text-align: center;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  padding: 0.75em 0.15em;
  font-size: 1.5em;
  background-color: #303f9f;
  color: white;
`;

export const FormWrapper = styled.div`
  width: inherit;
  display: flex;
`;

export const FormTag = styled.form`
  width: inherit;
  padding: 2em 1em;
  box-shadow: 0 2px 10px -1px rgba(7, 7, 7, 0.2);
  border-radius: 0px 0px 15px 15px;
`;

export const InputContainerDiv = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export const InputTag = styled.input`
  flex: 4;
  border: none;
  padding: 0.5em;
  box-shadow: 0 2px 10px -1px rgba(7, 7, 7, 0.2);
  border-radius: 4px 0px 0px 4px;
  min-height: 3em;
  ::placeholder,
  ::-webkit-input-placeholder {
    font-size: 90%;
  }
  :-ms-input-placeholder {
    font-size: 90%;
  }
`;

export const InputButton = styled.button`
  box-sizing: border-box;
  flex: 1;
  background-color: #303f9f;
  color: white;
  border: none;
  border-radius: 0px 4px 4px 0px;
  box-shadow: 0 2px 10px -1px rgba(7, 7, 7, 0.2);
`;

export const FavouritesContainerDiv = styled.div`
  width: 100%;
  max-height: 25vh;
  overflow-y: scroll;
  margin: 0.25em;
`;

export const FavouritesHeader = styled.div`
  padding: 1em 0 0.15em 0;
  margin-bottom: 1em;
  font-size: 95%;
  color: rgb(133, 133, 133);
  border-bottom: 1px solid rgba(163, 163, 163, 0.3);
`;

export const FavouriteWrapper = styled.div`
  box-shadow: 0 2px 10px -1px rgba(7, 7, 7, 0.2);
  border-radius: 4px;
  margin: 0.5em 0.15em;
  padding: 0.5em;
  outline: none;
`;

export const FavouriteLabelParagraph = styled.p`
  color: rgb(48, 63, 159);
  display: inline-block;
`;

export const FavouriteDestinationParagraph = styled.p`
  color: rgb(163, 163, 163);
  font-size: 90%;
  padding-left: 1.3em;
`;

const slideInUp = keyframes`
  0% {
    height: 0;
  }
`;

export const DestinationSummaryContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 55vh;
  margin-bottom: 0;
  margin-top: auto;
  padding-top: 1em;
  width: 90%;
  border-radius: 15px 15px 0px 0px;
  box-shadow: 0 2px 10px -1px rgba(7, 7, 7, 0.3);
  text-align: center;
  color: black;
  animation: 0.5s ${slideInUp} ease;
`;

export const DestinationContentContainer = styled.div`
  height: 35vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  border-top: 0.1px solid rgba(255, 164, 11, 0.4);
  border-bottom: 0.1px solid rgba(255, 164, 11, 0.4);
`;

export const ImageContainer = styled.img`
  height: 4em;
  width: 4em;
  border-radius: 4px;
  padding: 1em;
`;

export const DestinationSummaryHeader = styled.h4`
  margin-bottom: 0.25em;
  width: 100%;
  border-radius: 4px;
  font-size: 110%;
  color: rgb(48, 63, 159);
`;

export const MainButtonWrapper = styled.button`
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

export const LoaderDestination = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

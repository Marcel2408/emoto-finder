import styled from 'styled-components';

export const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

export const SelectDestinationContainerDiv = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin: 0;
  border: 2px solid #303f9f;
  overflow: hidden;
`;

export const SelectDestinationHeader = styled.h1`
  box-sizing: border-box;
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
  box-sizing: border-box;
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
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export const InputTag = styled.input`
  box-sizing: border-box;
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
  box-sizing: border-box;
  width: 100%;
  max-height: 35vh;
  overflow-y: scroll;
  margin: 0.25em;
`;

export const FavouritesHeader = styled.div`
  padding: 1em 0 0.15em 0;
  margin-bottom: 1em;
  font-size: 90%;
  color: rgb(133, 133, 133);
  border-bottom: 1px solid rgba(163, 163, 163, 0.3);
`;

export const FavouriteWrapper = styled.div`
  box-shadow: 0 2px 10px -1px rgba(7, 7, 7, 0.2);
  border-radius: 4px;
  margin: 0.5em 0.15em;
  padding: 0.5em;
`;

export const FavouriteLabelParagraph = styled.p`
  color: rgb(48, 63, 159);
`;

export const FavouriteDestinationParagraph = styled.p`
  color: rgb(163, 163, 163);
  font-size: 90%;
`;

export const DestinationSummaryContainerDiv = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
  margin-top: auto;
  width: 100%;
  border-radius: 15px 15px 0px 0px;
  box-shadow: 0 2px 10px -1px rgba(7, 7, 7, 0.3);
  text-align: center;
  color: rgb(163, 163, 163);
`;

export const DestinationSummaryHeader = styled.h4`
  padding: 1em;
  margin-bottom: 1em;
  width: 100%;
  border-radius: 15px 15px 0px 0px;
  background-color: #ffa40b;
  font-size: 110%;
  color: white;
  text-align: left;
`;

export const MainButtonWrapper = styled.button`
  box-sizing: border-box;
  padding: 0.75em 2em;
  margin: 1.5em auto 0.5em auto;
  font-size: 100%;
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 4px;
  background-color: #ffa40b;
  box-shadow: 0 2px 10px -1px rgba(7, 7, 7, 0.3);
`;

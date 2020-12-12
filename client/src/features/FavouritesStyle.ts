import styled from 'styled-components';

export const Div = styled.div``;

export const FavouritesHeader = styled.h1`
  width: 100%;
  text-align: center;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  padding: 0.75em 0.15em;
  font-size: 1.5em;
  background-color: #303f9f;
  color: white;
  position: relative;
`;

export const FavouritesForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 10px -1px rgba(7, 7, 7, 0.2);
  padding: 1.5em 0.5em 0 0.5em;
`;

export const FavouriteContainerDiv = styled.div`
  border-radius: 4px;
  margin: 0.5em 0.15em;
  padding: 1em;
`;

export const FormFieldWrapper = styled.div`
  width: 90%;
  margin: auto;
  padding: 0.5em;
`;

export const FormFieldHeader = styled.h3`
  color: #ffa40b;
`;

export const FavouriteWrapperDiv = styled.div`
  box-shadow: 0 2px 10px -1px rgba(7, 7, 7, 0.2);
  border-radius: 4px;
  margin: 0.5em 0.15em;
  padding: 1em 0.5em;
  outline: none;
  position: relative;
`;

export const DeleteButton = styled.button`
  background-color: transparent;
  position: absolute;
  right: 0;
  top: 0;
  padding: 0.25em 0.5em;
  border: none;
  border-left: 0.1px solid rgba(255, 164, 11, 0.2);
  border-bottom: 0.1px solid rgba(255, 164, 11, 0.2);
  border-bottom-left-radius: 4px;
  outline: none;
`;

export const FavouriteLabelParagraph = styled.h4`
  color: rgb(48, 63, 159);
  display: inline-block;
  margin-bottom: 0.15em;
`;

export const FavouriteDestinationParagraph = styled.p`
  color: rgb(163, 163, 163);
  padding-left: 1.35em;
`;

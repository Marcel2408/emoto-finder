import styled from 'styled-components';

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: hidden;
`;

export const ProviderHeader = styled.h1`
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

export const ProvidersContainerDiv = styled.div`
  flex: 1;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 1em;
  font-size: 150%;
`;

import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color : ${(props) => props.theme.backgroundColor};
`;

const Title = styled.span`
  font-size : 36px;
  color : ${(props) => props.theme.textColor}
`;

function App() {
  return (
    <Wrapper>
      <Title>TITLE</Title>
    </Wrapper>
  );
}

export default App;

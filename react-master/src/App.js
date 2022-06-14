import styled , {keyframes} from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color : ${props => props.theme.backgroundColor}
`;

const Title = styled.h1`
  color : ${props => props.theme.textColor}
`;

function App() {
  return (
    <Wrapper>
      <Title>Test</Title>
    </Wrapper>
  );
}

export default App;

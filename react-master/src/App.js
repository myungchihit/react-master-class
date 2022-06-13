import styled , {keyframes} from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const rotationanimation = keyframes`
    0% {
      transform:rotate(0deg);
      border-radius: 0px;
    }
    50% {
      border-radius: 100px;
    }
    100%{
      transform:rotate(360deg);
      border-radius: 0px;
    }
`;

const Box = styled.div`
  width: 300px;
  height: 300px;
  background-color: #666666;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${rotationanimation} 1s linear infinite;
  span{
    color: white;
    font-size: 30px;
    &:hover {
      font-size: 80px;
    }
  }

`;

function App() {
  return (
    <Wrapper>
      <Box>
        <span>^^</span>
      </Box>
    </Wrapper>
  );
}

export default App;

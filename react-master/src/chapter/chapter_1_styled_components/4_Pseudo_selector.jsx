import styled , {keyframes} from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
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

const Emoji = styled.span`
  color: white;
  font-size: 36px;
`;

// ${Emoji}가 span으로 만들어졌지만 as에 따라서 태그가 변경 적용되도록 할 수 있다.
// 그리고 Box 태그안에서만 스타일이 적용되도록 할 수 있다.
const Box = styled.div`
  width: 300px;
  height: 300px;
  background-color: #666666;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${rotationanimation} 1s linear infinite;
  ${Emoji}:hover {
      font-size: 80px;
  }
`;

function App() {
  return (
    <Wrapper>
      <Box>
        <Emoji as="p">^^</Emoji>
      </Box>
    </Wrapper>
  );
}

export default App;

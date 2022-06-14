import styled , {keyframes} from 'styled-components';

const Wrapper = styled.div`
  align-items: center;
  justify-content: center;
`;
// 애니메이션 정의
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

// animation에다가 위에서 정의한 애니메이션 설정 등록
const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${rotationanimation} 1s linear infinite;
  span {
    font-size: 36px;
    &:hover {
      font-size: 80px;
    };
    &:active {
      opacity: 0;
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

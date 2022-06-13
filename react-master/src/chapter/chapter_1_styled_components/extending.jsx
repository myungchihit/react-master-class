import styled from 'styled-components';

const Father = styled.div`
  display: flex;
`;

const Box = styled.div`
  background-color: ${props => props.bgColor};
  width: 100px;
  height: 100px;
`;  

const Text = styled.h2`
  color: white;
`;

// const Circle = styled.div`
//   background-color: ${props => props.bgColor};
//   width: 100px;
//   height: 100px;
//   border-radius: 50px;
// `;
const Circle = styled(Box)`
  border-radius: 50px;
`;

function App() {
  return (
    <Father>
        <Box bgColor="teal">
          <Text>SPAN TEST</Text>
        </Box>
        <Circle bgColor="tomato" />
    </Father>
  );
}

export default App;

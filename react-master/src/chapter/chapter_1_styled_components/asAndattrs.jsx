import styled from 'styled-components';

const Father = styled.div`
  display: flex;
`;

const Btn = styled.button`
  color: white;
  background-color: tomato;
  border: 0;
  border-radius: 15px;
`;

const Link = styled(Btn)`
`;

// 해당 component에 attrs로 속성을 정의할 수 있다.
const Input = styled.input.attrs({ required: true, minLength: 10 })`
  background-color: tomato;
`;

function App() {
  return (
    <Father as="header">
        {/* <Btn>Log in</Btn>
        <Btn as="a" href="">Link</Btn> */}
        <Input />
        <Input />
        <Input />
    </Father>
  );
}

export default App;

import React from 'react';
import styled from 'styled-components';

interface ContainerProps{
    bgColor : string;
    borderColor : string;
}

// css에서는 borderColor가 required
// 그래서 Container 태그 쪽에 ??으로 default를 만들어줌
const Container = styled.div<ContainerProps>`
    width: 200px;
    height: 200px;
    background-color: ${props => props.bgColor};
    border-radius : 100px;
    border: 1px solid ${props => props.borderColor};
`;

// app.tsx에서 받은 props를 interface를 이용하여 보호한다.
// interface: object를 설명해 주는것.
interface CircleProps {
    bgColor: string;        // ? 없으면 required
    borderColor?: string;   // ? 있으면 required가 아님
    //borderColor: string | undefined;  // | undeinfed 써도 required제거 가능
    text? : string;
}

function Circle({ bgColor, borderColor, text="default text"}: CircleProps){
    // ?? --> default 지정
    return (
    <Container bgColor={ bgColor } borderColor={borderColor ?? "white"}>
        {text}
    </Container>
    )
    // 이것도 가능 => bgColor는 required에다가 항상 string이기 때문에
    //return <Container bgColor={ bgColor } borderColor={borderColor ?? bgColor}/>;  
}

export default Circle;

/*
interface PlayerShape{
    name: string;
    age: number;
}
const sayHello = (playerObj: PlayerShape) =>
    `Hello ${playerObj.name} you are ${playerObj.age} years old.`;

sayHello({name: "t1" , age: 12});
sayHello({name: "t2" , age: 11, hellpo:"test"});
*/
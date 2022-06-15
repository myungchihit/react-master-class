import React, { useState } from 'react';

function App() {
  const [value, setValue] = useState("");
  // 이벤트 타입을 설정해줄 수 있음.
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {currentTarget: {value}} = event;
    setValue(value);
  };

  const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Hello" , value);
  };

  return (
    <div>
        <form onSubmit={onSubmit}>
          <input 
            value={value} 
            onChange={onChange} 
            type="text" 
            placeholder='username' 
          />
          <button>Log in</button>
        </form>
    </div>
  );
}

export default App;

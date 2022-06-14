import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App';

// 테마를 2개 설정하고 안의 속성들은 같아야한다.
const darkTheme = {
  textColor: "whitesmoke",
  backgroundColor: "#111"
};

const lightTheme = {
  textColor: "#111",
  backgroundColor: "whitesmoke"
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={ darkTheme }>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

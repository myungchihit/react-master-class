import "styled-components";

// 사용자가 정의한 styled components의 테마를 확장하려는것.
// interface다.
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    btnColor: string;
  }
}
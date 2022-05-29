import { DefaultTheme } from "styled-components";

type Theme = {
    [key: string];
    body: string;
    background: string;
    primary: string;
    secondary: string;
    hover: string;
}

declare module 'styled-components' {
    export interface DefaultTheme extends Theme { }
}
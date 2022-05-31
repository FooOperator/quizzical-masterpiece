import styled from "styled-components";
import { ButtonRowFieldset } from "../LandingPage/LandingPage.styled";

export default {
    Announcement: styled.h1`
    `,
    Wrapper: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    `,
    Button: styled.button`
    
    `,
    Stack: styled.div`
        display: flex;
        flex-direction: column;
        > * {
            :first-child { 
                margin-bottom: .5em;
            }
            :nth-child(n + 2) {
                margin-bottom: 2em;
            }
            justify-content: center;
            align-items: center;
            text-align: center;
        }
    `,
    ButtonRowFieldset: styled(ButtonRowFieldset)`
        margin: auto;
        padding: 0;
        button {
            padding: .6rem;
        }
    `
}
import styled from "styled-components";
import { FlexFieldset } from "../LandingPage/LandingPage.styled";

export default {
    Wrapper: styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
    `,
    AnswersList: styled.ul`
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        > li:nth-child(n+1) {
            margin-right: .3em;
        }
    `,
    QuestionList: styled.ul`
        display: flex;
        flex-direction: column;
        margin: 2em auto 1em auto;
        padding: 0;

        > li {
            display: flex;
            flex-direction: column;
            align-items: center;

            :nth-child(n+1) { 
                margin-top: .3em;
            }
            
            > h3 {
                margin-bottom: 1em;
            }
        }
    `,
    ButtonsContainer: styled.div`
        display: flex;
        flex: 1;
        justify-content: center;
        > button {
            :nth-child(n+1) { 
                margin-left: .3em;
            }
        }
    `,
    
}
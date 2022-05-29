import styled from "styled-components";

export default {
    Wrapper: styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
    `,
    AnswersList: styled.ul`
        display: flex;
        flex-direction: row;
        > li:nth-child(n+1) {
            margin-right: .3em;
        }
    `,
    QuestionList: styled.ul`
        display: flex;
        flex-direction: column;
        margin-top: 2em;
        margin: 2em auto 1em auto;

        > li {
            :nth-child(n+1) { 
                margin-top: .3em;
            }
            display: flex;
            flex-direction: column;
            align-items: center;
            > h3 {
                margin-bottom: 1em;
            }
        }
    `,
    ButtonsContainer: styled.div`
        display: flex;
        > * {
            padding: .5em;
            :nth-child(n+1) { 
                margin-left: .5em;
            }
        }
    `
}
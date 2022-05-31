import styled from "styled-components";

export const FlexFieldset = styled.fieldset`
    border: none;
    display: flex;
    justify-content: center;
    
    button {
        :nth-child(n+2) { 
            margin-left: .3rem;
        }
    }

    select {
        border: .3em solid #ccc;
    }
    
    select,
    button {
        padding: .4em;
    }

`;

export const ButtonRowFieldset = styled(FlexFieldset)`
    margin: auto;
    width: 100%;
`

export default {
    Wrapper: styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
    `,
    Stack: styled.div`
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    `,
    ColumnFieldset: styled(FlexFieldset)`
        flex-direction: column;
        label {
            margin-bottom: .2em;
        }
    `,
    RowFieldset: styled(FlexFieldset)`
        legend {
            margin-bottom: .2em;
        }
    `,
    Button: styled.button`
        background-color: #ccc;
        width: 75%;
        margin: auto;
    `
}
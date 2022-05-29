import styled from "styled-components";


const FlexFieldset = styled.fieldset`
    border: none;
    display: flex;
    > select {
        border: .3em solid #ccc;
        border-radius: .8em;
        padding: .4em;
    }
`;

export default {
    Wrapper: styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
    `,
    Section: styled.section`

    `,
    ColumnFieldset: styled(FlexFieldset)`
        flex-direction: column;

    `,
    RowFieldset: styled(FlexFieldset)`

    `,
    Button: styled.button`
        background-color: #ccc;
        width: 75%;
        margin: auto;
    `
}
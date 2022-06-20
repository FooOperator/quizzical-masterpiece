import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Spline+Sans+Mono:wght@300;400;500;600;700&display=swap');

    :root {
        --font: 'Spline Sans Mono', monospace;
    }

    html,
    body {
        margin: 0;
        padding: 0;
        font-family: var(--font);
    }

    li {
        list-style: none;
    }


    select,
    input[type='radio'] + label,
    button {
        cursor: pointer;
        :disabled {
            cursor: not-allowed;
        }
    }

    button {
        padding: .5em;
        background: none;

        :hover {
            cursor: pointer;
            :not(:disabled) { 
                background-color: ${({ theme }) => theme.primary};
            }
            :disabled {
                cursor: not-allowed;
            }
        }
    }

    select:hover,
    input[type='radio']:hover + label {
        background-color: #ddd;
    }

    select:focus,
    input[type='radio']:checked + label {
        background-color: ${({ theme }) => theme.primary};
        font-weight: bold;
    }


    input[type='radio'] { 
        display: none;
        + label {
            display: inline-block;
            padding: .5em;
            border: .1em solid ${({ theme }) => theme.foreground};
            background-color: #eee;
        }
        :checked {
            :hover {
               + label { 
                    background-color: ${({ theme }) => theme.hover};    
                }
            }
        }
    }
    
`


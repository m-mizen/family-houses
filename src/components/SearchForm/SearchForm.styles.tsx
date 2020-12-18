import styled from 'styled-components';

export const FormEle = styled.form`
    display: block;
    width: 80%;
    margin: auto;
`;

export const BtnEle = styled.button`
    flex: 0 1 auto;
    background: none;
    color: #d59563;
    font-size: 75%;
    border: 2px solid #d59563;
    border-radius: 6px;
    padding: 0.25em .5em;
    cursor: pointer;
    &:hover, &:focus {
        border-color: #d59563;
        background-color: #d59563;
        color: #333;
    }
    & + & {
        margin-left: .5em;
    }
`;

export const LabelEle = styled.label`
    display: flex;
    align-items: baseline;
    flex: 1 1 auto;
    gap: .5em;
    margin: .5em 0;
    input, select {
        flex: 1 1 auto;
    }
`;

export const LabelTextEle = styled.span`
    display: block;
    font-size: 75%;
    flex: 0 0 80px;
    text-align: right;
`;


const inputSharedStyles = `
    line-height: inherit;
    color: #fff;
    background: transparent;
    display: block;
    border: none;
    cursor: pointer;
`

export const InputTextEle = styled.input`
    ${inputSharedStyles}
    border-bottom: 1px solid #d59563;
`;


export const SelectEle = styled.select`
    ${inputSharedStyles}
    border-bottom: 1px solid #d59563;

    option {
        color: inherit;
        background: #444;
    }
`;
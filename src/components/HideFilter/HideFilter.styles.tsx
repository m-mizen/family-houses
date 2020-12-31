import styled from 'styled-components';

export const FilterButtonEle = styled.button`
    display: block;
    background: none;
    color: #d59563;
    border: 2px solid #d59563;
    padding: 0.25em .5em;
    cursor: pointer;
    background: #333;
    font-size: 80%;
    width: 100%;
    position: relative;
    transition: margin .2s;
    border-radius: 0;
    &::after {
        margin-left: .4em;
        content: '';
        display: inline-block;
        height: .4em;
        width: .4em;
        border-right: 2px solid currentColor;
        border-bottom: 2px solid currentColor;
        transform: rotate(45deg) translate(-2px, -2px);
    }
`;

export const InnerEle = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 36px;
    padding: .2em 0 0.8em;
`;

export const OuterEle = styled.div<{ isVisible: boolean }>`
    position: relative;
    ${props => props.isVisible && 'button::after{ transform: rotate(-135deg) translate(-2px, -2px); }'}
`;
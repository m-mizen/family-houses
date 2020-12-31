import styled from 'styled-components';

export const LocationsListWrapEle = styled.ul`
    overflow-y: auto;
    padding: 0;
    margin: 0;
    border-top: .2em solid #38414e;
`;

export const LocationsListEle = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
`;

export const LocationsListItemEle = styled.li<{ bringToTop: boolean }>`
    display: block;
    margin: .5em 0;
    padding: 0 .5em 0 .3em;
    flex: 0 0 auto;
    ${(props) =>
        props.bringToTop ?
            `
            order: 1;
            border: 1px solid currentColor;
            padding: .2em .5em 1em .3em;
            ` :
            `order: 2;`
    }
    border-left: .2em solid currentColor;
`;

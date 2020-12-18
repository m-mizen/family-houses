import styled from 'styled-components';

export const MapContainer = styled.div`
    display: block;
    height calc(100vw * (2 / 3));
    margin: 1em 0 0;
    @media screen and (min-width: 900px) {
        margin: 0;
        height: 100%;
        grid-row: 1 / 3;
        grid-column: 2;
    }
`;
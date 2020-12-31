import styled from 'styled-components';

export const MapContainer = styled.div`
    display: block;
    height: 50vh;
    @media screen and (min-width: 900px) {
        height: 100%;
        grid-row: 1 / 3;
        grid-column: 2;
    }
`;
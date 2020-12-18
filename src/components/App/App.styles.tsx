import styled from 'styled-components';

export const StoreFinderContainer = styled.div`
    gap: 1em 0;
    width: 100%;
    display: block;
    @media screen and (min-width: 900px) {
        display:grid;
        grid-template-rows: minmax(4em, max-content) 1fr;
        grid-template-columns: 3fr 5fr;
        height: 100vh;
    }
`;
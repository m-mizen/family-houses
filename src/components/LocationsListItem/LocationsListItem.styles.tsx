import styled from 'styled-components';

export const LocationEle = styled.article`
    cursor: pointer;
`;

export const LocationBtnWrapEle = styled.div`
    display: flex;
`;

export const LocationBtnEle = styled.button<{ active?: boolean }>`
    display: block;
    height: 1.5rem;
    width: 1.5rem;
    background: none;
    border: none;
    position: relative;
    color: inherit;
    cursor: pointer;
    &:hover, &:focus{
        color: #f2f2f2;
    }
    &::before{
        content: '';
        display: block;
        width: 40%;
        height: 40%;
        position: absolute;
        left: 50%;
        top: 50%;
        border-right: 2px solid currentColor;
        border-bottom: 2px solid currentColor;
        transition: transform 0.2s;
        transform:  ${props => props.active ?
        'translate(-50%, -50%) rotate(45deg)' :
        'translate(-50%, -50%) rotate(-45deg)'
    };
    }
`;

export const LocationTitleEle = styled.h1`
    display: block;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 100%;
    margin: 0 ;
`;

export const LocationDetailsEle = styled.div`
    cursor: default;
    display: flex;
    align-items: flex-start;
    font-size: 75%;
    gap: .5em;
    margin-top: 1em;
`;

export const LocationAddressEle = styled.address`
    white-space: pre;
`;

export const LocationDetailsPartEle = styled.div`
    display: block;
    flex: 1 1 50%;    
    color: #fff;
`;

export const LocationDetailsTitleEle = styled.h2`
    font-size: calc(12 / 18 * 100%);
    text-transform: uppercase;
    font-weight: 400;
    margin: 0 0 0.25em;
    text-decoration: underline;
`;

export const TagsEle = styled.div`
    display: flex;
    gap: 0.25em;
`;

export const TagEle = styled.span`
    font-size: 50%;
    border-radius: 2px;
    border: 1px solid currentColor;
    padding: 0.2em 0.5em;
    font-weight: 400;
`;
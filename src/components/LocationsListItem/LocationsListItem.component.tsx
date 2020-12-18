import { FunctionComponent, useContext } from 'react';
import { APIContext, APILocation } from '../../context';

import { LocationBtnWrapEle, LocationBtnEle, LocationEle, LocationTitleEle, LocationDetailsEle, LocationAddressEle, LocationDetailsPartEle, LocationDetailsTitleEle, TagsEle, TagEle } from './LocationsListItem.styles';

interface LocationsListItemProps {
    location: APILocation;
    setActive: () => void;
    isActive: boolean;
}
export const LocationsListItem: FunctionComponent<LocationsListItemProps> = ({ location, setActive, isActive }) => {

    const apiContext = useContext(APIContext);

    const { name, description, address, tags } = location;

    const mappedTags = tags && apiContext?.tags && tags?.map((tag) => apiContext.tags.find(item => item.id === tag)?.name);

    return (
        <LocationEle onClick={setActive}>
            <LocationBtnWrapEle>
                <LocationTitleEle>{name}</LocationTitleEle>
                <LocationBtnEle active={isActive}></LocationBtnEle>
            </LocationBtnWrapEle>
            { mappedTags && mappedTags.length > 0 &&
                <TagsEle>
                    {mappedTags.map((tag, index) => <TagEle key={index}>{tag}</TagEle>)}
                </TagsEle>
            }
            {isActive &&
                <LocationDetailsEle onClick={event => event.stopPropagation()}>
                    <LocationDetailsPartEle>
                        <LocationDetailsTitleEle>Description</LocationDetailsTitleEle>
                        {description}
                    </LocationDetailsPartEle>
                    {address && address !== 'redacted' &&
                        <LocationDetailsPartEle>
                            <LocationDetailsTitleEle>Address</LocationDetailsTitleEle>
                            <LocationAddressEle>{address}</LocationAddressEle>
                        </LocationDetailsPartEle>
                    }
                </LocationDetailsEle>}
        </LocationEle>
    );
}
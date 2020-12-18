import { useState, FunctionComponent, SyntheticEvent, ChangeEvent, useContext } from 'react';
import { ActiveLocationContext, APIContext, APILocation, LocationsFilteredContext } from '../../context';

import { FormEle, LabelEle, LabelTextEle, SelectEle, InputTextEle, BtnEle, BtnWrapEle } from './SearchForm.styles';

export const SearchForm: FunctionComponent<{}> = () => {

    const [inputValue, setInputValue] = useState('');
    const [selectedTag, setSelectedTag] = useState('');

    const apiContext = useContext(APIContext);
    const locationsFilteredContext = useContext(LocationsFilteredContext);
    const activeLocationContext = useContext(ActiveLocationContext);

    const { tags } = useContext(APIContext) || {};

    const handleTermChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleTagChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedTag(event.target.value);
    };

    const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!selectedTag && !inputValue) {
            locationsFilteredContext?.setFilteredLocations(apiContext?.locations || []);
        }

        let filterFunction = (item: APILocation): boolean => {
            if (selectedTag && !item.tags?.includes(selectedTag)) {
                return false;
            };
            if (
                inputValue &&
                item.name.indexOf(inputValue) === -1 &&
                item.address.indexOf(inputValue) === -1 &&
                item.description.indexOf(inputValue) === -1
            ) {
                return false;
            }
            return true;
        }

        activeLocationContext?.setActiveLocation(undefined);
        locationsFilteredContext?.setFilteredLocations(
            apiContext?.locations?.filter(filterFunction) || []
        );
    };

    const handleReset = (e: SyntheticEvent<HTMLButtonElement>) => {
        setInputValue('');
        setSelectedTag('');
        locationsFilteredContext?.setFilteredLocations(apiContext?.locations || []);
    }


    return (
        <FormEle onSubmit={handleSubmit}>
            <LabelEle>
                <LabelTextEle
                    className="label-text"
                >
                    Search:
                </LabelTextEle>
                <InputTextEle
                    type="text"
                    name="search-term"
                    placeholder="Term to search"
                    value={inputValue}
                    onChange={handleTermChange}
                />
            </LabelEle>

            <LabelEle>
                <LabelTextEle
                    className="label-text"
                >
                    Category:
                </LabelTextEle>
                <SelectEle
                    name="tag"
                    onChange={handleTagChange}
                    value={selectedTag}
                    disabled={!tags || tags.length < 1}
                >
                    <option>Please select:</option>
                    {tags?.map((tag, index) => <option key={index} value={tag.id}>{tag.name}</option>)}
                </SelectEle>
            </LabelEle>

            <BtnWrapEle>
                <BtnEle type="submit">Submit</BtnEle>
                <BtnEle type="reset" onClick={handleReset}>Reset</BtnEle>
            </BtnWrapEle>
        </FormEle>
    )
}
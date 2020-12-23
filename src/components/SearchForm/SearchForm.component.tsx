import { useState, FunctionComponent, SyntheticEvent, ChangeEvent, useContext, useEffect } from 'react';
import { APIContext, FilterContext } from '../../context';

import { useDebounce } from '../../utils/use-debounce.util';

import { FormEle, LabelEle, LabelTextEle, SelectEle, InputTextEle, BtnEle, BtnWrapEle } from './SearchForm.styles';

export const SearchForm: FunctionComponent<{}> = () => {

    const [inputValue, setInputValue] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('gbr');

    const debouncedInputValue = useDebounce(inputValue, 250);

    const { tags, countries } = useContext(APIContext) || {};
    const filterContext = useContext(FilterContext);

    const handleTermChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleTagChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedTag(event.target.value);
    };

    const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(event.target.value);
    };

    const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const handleReset = (_: SyntheticEvent<HTMLButtonElement>) => {
        setInputValue('');
        setSelectedTag('');
        setSelectedCountry('gbr');
        filterContext?.dispatch({
            type: 'RESET',
            payload: ''
        });
    }

    useEffect(() => {
        filterContext?.dispatch({
            type: 'TERM_SET',
            payload: debouncedInputValue
        });
    }, [debouncedInputValue, filterContext]);

    useEffect(() => {
        filterContext?.dispatch({
            type: 'TAG_SET',
            payload: selectedTag
        });
    }, [selectedTag, filterContext]);

    useEffect(() => {
        filterContext?.dispatch({
            type: 'COUNTRY_SET',
            payload: selectedCountry
        });
    }, [selectedCountry, filterContext]);

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

            <LabelEle>
                <LabelTextEle
                    className="label-text"
                >
                    Country:
                </LabelTextEle>
                <SelectEle
                    name="tag"
                    onChange={handleCountryChange}
                    value={selectedCountry}
                >
                    {countries?.map((country, index) => <option key={index} value={country.id}>{country.name}</option>)}
                </SelectEle>
            </LabelEle>

            <BtnWrapEle>
                <BtnEle type="reset" onClick={handleReset}>Reset</BtnEle>
            </BtnWrapEle>
        </FormEle>
    )
}
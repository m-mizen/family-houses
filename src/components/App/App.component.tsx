import { FunctionComponent } from 'react';
import { StoreFinderContainer } from './App.styles';

import { SearchForm } from '../SearchForm';
import { LocationsList } from '../LocationsList';
import { Map } from '../Map';
import { HideFilter } from '../HideFilter';

import { CombinedProviders } from '../../context';

export const App: FunctionComponent<unknown> = () => {
  return (
    <div id="store-finder-app">
      <CombinedProviders>
        <StoreFinderContainer>
          <HideFilter>
            <SearchForm />
          </HideFilter>
          <Map />
          <LocationsList />
        </StoreFinderContainer>
      </CombinedProviders>
    </div>
  );
}

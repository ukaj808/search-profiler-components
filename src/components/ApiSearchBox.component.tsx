import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { v4 as uuid } from 'uuid';
import {
  ApiSearchFields, ApiSearchOptions, Profile, SearchResults,
} from '../models/api-search-box.api';
import styles from './styles.module.css';

const ApiSearchBox: React.FC<ApiSearchOptions> = function ApiSearchBox(options: ApiSearchOptions) {
  const { type, profileId, handleResults } = options;

  const [searchFields, setSearchFields] = useState<ApiSearchFields>({
    searchStr: '',
    category: '',
  });

  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const updateProfile = (): Promise<AxiosResponse<Profile>> => axios.get<Profile>(`https://search-profiler.herokuapp.com/profile/${profileId}`);

  useEffect(() => {
    if (profileId) {
      updateProfile().then((res) => {
        setRecentSearches(() => res.data.searches);
      }).catch(() => {

      });
    }
  }, [profileId, recentSearches.length]);

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement> |
      React.ChangeEvent<HTMLSelectElement>) => setSearchFields(
    (prev) => ({ ...prev, [name]: value }),
  );

  const search = async (recent?: string) => {
    try {
      const searchResultsResponse: AxiosResponse<SearchResults> = await axios.post<SearchResults>('https://search-profiler.herokuapp.com/search', {
        searchStr: recent || searchFields.searchStr,
        category: searchFields.category,
        profileId,
        type,
      });

      handleResults(searchResultsResponse.data);

      setRecentSearches((prev) => [...prev, recent || searchFields.searchStr]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="api-search-box">

      <div id="search-box">

        <input
          type="search"
          placeholder="Search..."
          name="searchStr"
          value={searchFields.searchStr}
          onChange={handleChange}
        />

        <select
          name="category"
          value={searchFields.category}
          onChange={handleChange}
        >

          <option value="all">All</option>
          <option value="name">Name</option>
          <option value="ingredient">Ingredient</option>

        </select>

        <button type="button" onClick={() => search()}>Search</button>

      </div>

      <ul id="recent-searches" className={styles.recentSearches}>
        {recentSearches.map((str: string) => (
          <li key={uuid()} className={styles.recentSearchItem}>
            <button
              type="button"
              className={styles.recentSearchLink}
              onClick={() => search(str)}
            >
              {str}
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default ApiSearchBox;

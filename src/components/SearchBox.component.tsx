import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { v4 as uuid } from 'uuid';
import {
  SearchFields, SearchOptions, Profile, SearchResults,
} from '../models/api-search-box.api';
import styles from './styles.module.css';

const SearchBox: React.FC<SearchOptions> = function SearchBox(options: SearchOptions) {
  const { type, profileId, handleResults } = options;

  const [searchFields, setSearchFields] = useState<SearchFields>({
    searchStr: '',
    category: '',
  });

  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const updateProfile = (): Promise<AxiosResponse<Profile>> => axios.get<Profile>(`http://localhost:3002/profile/${profileId}`, {
    proxy: {
      host: 'localhost',
      port: 3002,
    },
  });

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
      const searchResultsResponse: AxiosResponse<SearchResults> = await axios.post<SearchResults>('http://localhost:3002/search', {
        searchStr: recent || searchFields.searchStr,
        category: searchFields.category,
        profileId,
        type,
      }, {
        proxy: {
          host: 'localhost',
          port: 3002,
        },
      });

      handleResults(searchResultsResponse.data);

      setRecentSearches((prev) => [...prev, recent || searchFields.searchStr]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>

      <div className={styles.searchBox}>

        <input
          className={styles.textInput}
          type="search"
          placeholder="Search..."
          name="searchStr"
          value={searchFields.searchStr}
          onChange={handleChange}
        />

        <select
          name="category"
          className={styles.categorySelect}
          value={searchFields.category}
          onChange={handleChange}
        >

          <option value="all">All</option>
          <option value="name">Name</option>
          <option value="ingredient">Ingredient</option>

        </select>

        <button type="button" className={styles.searchButton} onClick={() => search()}>Search</button>

      </div>

      <div className={styles.recentSearch}>
        {recentSearches.length > 0 && (
        <span
          className={styles.recentSearchLbl}
        >
          Recent searches:
        </span>
        )}
        <ul className={styles.recentSearches}>
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

    </div>
  );
};

export default SearchBox;

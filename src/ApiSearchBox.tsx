import React, {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {ApiSearchFields, ApiSearchOptions, Profile, SearchResults} from "./models/api-search-box.api";
import { v4 as uuid } from "uuid";


const ApiSearchBox: React.FC<ApiSearchOptions> = (options: ApiSearchOptions) => {

    const [searchFields, setSearchFields] = useState<ApiSearchFields>({
        searchStr: "",
        category: ""
    });

    const [recentSearches, setRecentSearches] = useState<string[]>([]);

    useEffect(() => {
        console.log("useEffect called.");
        options.profileId && updateProfile().then((res) => {
            setRecentSearches(() => res.data.searches);
        }).catch(() => {

        });
    }, [options.profileId, recentSearches.length]);

    const handleChange = ({
                              target: {name, value},
                          }: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) =>
        setSearchFields((prev) => ({...prev, [name]: value}));

    const updateProfile = (): Promise<AxiosResponse<Profile>> => {
        return axios.get<Profile>(`https://search-profiler.herokuapp.com/profile/${options.profileId}`);
    };

    const search = async () => {
        try {

            let searchResultsResponse: AxiosResponse<SearchResults> =
                await axios.post<SearchResults>('https://search-profiler.herokuapp.com/search', {
                    searchStr: searchFields.searchStr,
                    category: searchFields.category,
                    profileId: options.profileId,
                    type: options.type
                });

            options.handleResults(searchResultsResponse.data);

            setRecentSearches((prev) => [...prev, searchFields.searchStr]);

        } catch (err) {
            console.log(err);
        }
    }


    return (
        <>

            <div id="search-box">

                <input type="search"
                       placeholder="Search..."
                       name="searchStr"
                       value={searchFields.searchStr}
                       onChange={handleChange}/>

                <select name="category"
                        value={searchFields.category}
                        onChange={handleChange}>

                    <option value="all">All</option>
                    // todo: make generic
                    <option value="name">Name</option>
                    <option value="ingredient">Ingredient</option>

                </select>

                <button type="button" onClick={search}>Search</button>

            </div>

            <ul id="recent-searches">
                {recentSearches.map((str: string) => <li key={uuid()}><a href={"google.com"}>{str}</a></li>)}
            </ul>

        </>
    );

};

export default ApiSearchBox;
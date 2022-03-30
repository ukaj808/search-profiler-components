import React, {useState} from "react";
import axios, {AxiosResponse} from "axios";
import {
    ApiSearchFields,
    ApiSearchOptions, Profile,
    SearchRequest,
    SearchResults
} from "./models/api-search-box.api";


const ApiSearchBox: React.FC<ApiSearchOptions> = (options: ApiSearchOptions) => {

    const [searchFields, setSearchFields] = useState<ApiSearchFields>({
        searchStr: "",
        category: "",
        profileId: options.profileId,
        type: options.type,
        recentSearches: []
    });

    const handleChange = ({
                              target: {name, value},
                          }: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) =>
        setSearchFields((prev) => ({...prev, [name]: value}));

    const search = async () => {
        try {

            let requestBody: SearchRequest = {
                searchStr: searchFields.searchStr,
                category: searchFields.category,
                profileId: options.profileId,
                type: options.type
            }

            let response: AxiosResponse<SearchResults> =
                await axios.post<SearchResults>('https://search-profiler.herokuapp.com/search', requestBody);

            options.handleResults(response.data);

        } catch (err) {
            console.log(err);
        }
    }

    if (searchFields.profileId) {
        axios.get<Profile>(`https://search-profiler.herokuapp.com/profile/${options.profileId}`)
            .then((res) => {
                console.log(res);
                setSearchFields((prev) => ({...prev, recentSearches: res.data.searches}));
            }).catch((err) => {
            console.log(err);
        });
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

                </select>

                <button type="submit" onClick={search}>Search</button>

            </div>

            <ul id="recent-searches">
                {searchFields.recentSearches.map((str: string) => <li><a href={"google.com"}>{str}</a></li>)}
            </ul>

        </>
    );

};

export default ApiSearchBox;
import React, {useState} from "react";
import axios from "axios";

export interface ApiSearchFields {
    searchStr: string;
    category: string;
}

export interface ApiSearchResults {
    results: {}
}

export interface ApiSearchOptions {
    type: string;
    profileId: string;
    setResults(results: ApiSearchResults): ApiSearchResults;
}

const ApiSearchBox: React.FC<ApiSearchOptions> = (options: ApiSearchOptions) => {

    const [searchFields, setSearchFields] = useState<ApiSearchFields>({
        searchStr: "",
        category: ""
    });

    const handleChange = ({
                              target: {name, value},
                          }: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) =>
        setSearchFields((prev) => ({...prev, [name]: value}));

    const search = async () => {
        try {
            let response = await axios.post('http://localhost:3000/search', {
                profileId: options.profileId,
                type: options.type,
                searchStr: searchFields.searchStr
            });

            options.setResults({
                results: response
            });

            console.log(response);
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

                </select>

                <button type="submit" onClick={search}>Search</button>

            </div>

            <ul id="suggestions-list"/>

            <ul id="recent-searches"/>

        </>
    );

};

export {ApiSearchBox};
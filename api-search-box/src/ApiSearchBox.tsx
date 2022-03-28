import React, {useState} from "react";

export interface ApiSearchFields {
    searchStr: string;
    category: string;
}

export interface ApiSearchOptions {
    type: string;
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

                <button type="submit">Search</button>

            </div>

            <ul id="suggestions-list"/>

            <ul id="recent-searches"/>

        </>
    );

};

export {ApiSearchBox};
export interface SearchItem {
    category: string;
    items: any[];
}

export interface SearchResults {
    profileId: string;
    searchItems?: SearchItem[];
    recentSearches: string[];
}

export interface ApiSearchFields {
    searchStr: string;
    category: string;
}

export interface ApiSearchBoxLocal {
    profileId: string;
    type: string;
    recentSearches: string[];
}

export interface ApiSearchOptions {
    type: string;
    profileId: string;

    handleResults(results: SearchResults): SearchResults;
}

export interface Profile {

    type: string;
    searches: string[];
}

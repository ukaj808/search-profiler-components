export interface SearchItem {
    category: string;
    items: any[];
}

export interface SearchResults {
    profileId: string;
    searchItems?: SearchItem[];
    recentSearches: string[];
}

export interface SearchFields {
    searchStr: string;
    category: string;
}

export interface SearchOptions {
    type: string;
    profileId: string;

    handleResults(results: SearchResults): SearchResults;
}

export interface Profile {
    type: string;
    searches: string[];
}

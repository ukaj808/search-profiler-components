# Search Profiler Components

Search Profiler Components is a React library that aims to provide useful and reusable ui components which leverage the [Search Profiler](https://link-url-here.org) APIs and search domains.

*The Search Profiler API only supports searches on the cocktail domain at this moment.*

## Available Components
**SearchBox**: A fully functional search engine that is wired to the Search Profiler APIs. With a few simple properties, you will have a SearchBox that is rendered against a profile-id, which you provide (or don't... but more on this later). 
This gives your app a **user->search-profile** relationship that will in-turn provide you with frontend & backend capabilities like recent search history, favorites, and search recomendations, just to name a few.

## Example
```jsx
<SearchBox type="cocktail" profileId="123" handleResults={(results: SearchResults) => console.log(results)} />
```
![image](https://user-images.githubusercontent.com/96708453/162376141-a2839e00-0a55-48b0-a2eb-30575f074702.png)


## Tech Stack: Reasoning
This library is designed to be a "Micro Frontend" that leverages Webpack's [Module Federation](https://webpack.js.org/concepts/module-federation/) plugin to provide you with a runtime module library! At the highest level that means with some configurations here and there, you're application will have a (almost) live view of the latest and greatest deployed Search Profiler Components (juxtapose this with "buildtime" node modules where what you deployed is what your stuck with until you build and deploy again).
Although our components are built in React, you don't need to use React yourself to use our components! This is one of the many awesome benefits of federated modules.

**Why React Though?** For no other reasons than personal. I am framework agnostic; but my team is planning to migrate our apps from Angular to React later in the year; an order that came down from our architecture team for one reason or another. I thought I should **Just in case** get a headstart on learning React.

## Installation

Clone the repo and install the npm packages in the root directory of the project.

```bash
npm install
```

## To Run...
```bash
npm start // This application runs on port 3001.
```

## Run Unit Tests
```bash
No tests at the moment.
```

## License
[MIT](https://choosealicense.com/licenses/mit/)

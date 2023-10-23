// Function to fetch posts from Hacker News API based on search text and page number
export async function fetchPosts(searchText: string, pageNo: number) {

    const response = await fetch(`http://hn.algolia.com/api/v1/search?query=${searchText}&page=${pageNo}`);

    const result = await response.json();

    return result;
};

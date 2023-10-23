// Function to fetch posts from Hacker News API based on search text and page number
export async function fetchPosts(searchText: string, pageNo: number) {

    const response = await fetch(`http://hn.algolia.com/api/v1/search?query=${searchText}&page=${pageNo}`);

    const result = await response.json();

    return result;
};

// Function to fetch post details from Hacker News API based on post id
export async function fetchPostDetails(id: string) {
    const response = await fetch(`http://hn.algolia.com/api/v1/items/${id}`);

    const result = await response.json();

    return result;
};

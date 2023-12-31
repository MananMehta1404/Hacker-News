export interface AuthorProps {
    matchLevel: string,
    matchedWords: [string],
    value: string
}

export interface TitleProps {
    fullyHighlighted: boolean,
    matchLevel: string,
    matchedWords: [string],
    value: string
}

export interface URLProps {
    fullyHighlighted: boolean,
    matchLevel: string,
    matchedWords: [string],
    value: string
}

// Defining Types for stories or posts
export interface PostProps {
    _highlightResult: {
        author: AuthorProps,
        title: TitleProps,
        url: URLProps
    }
    _tags: string[],
    author: string,
    children: CommentProps[],
    created_at: string,
    created_at_i: number,
    num_comments: number,
    objectID: string,
    points: number,
    story_id: number,
    title: string,
    updated_at: string,
    url: string,
}

// Defining Types for comments
export interface CommentProps {
    author: string,
    children: CommentProps[],
    created_at: string,
    created_at_i: number,
    id: number,
    options: [],
    parent_id: number,
    points: number,
    story_id: number,
    text: string,
    title: string,
    type: string,
    url: string
}
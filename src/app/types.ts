export interface UserResponse {
    id: number
    login: string
    avatar_url: string
}

export interface UsersResponse {
    items: UserResponse[]
    isLastPage: boolean
}

export interface User {
    id: number
    login: string
    avatarUrl: string
}

export interface UserDetailsResponse extends UserResponse {
    name: string | null
    public_repos: number
}

export interface UserDetails extends User {
    name: string | null
    publicRepos: number
}

export interface RepoResponse {
    id: number
    name: string
}

export interface ReposResponse {
    items: RepoResponse[]
}

export interface Repo {
    id: number
    name: string
}

export interface EventResponse {
    id: number
    type: string
    repo: Repo
    payload: {
        action: string
        pull_request: { html_url: string }
    }
    created_at: string
}

export interface EventsResponse {
    items: EventResponse[]
}

export interface Event {
    id: number
    type: string
    repo: Repo
    action: string
    urlPR: string
    date: string
}

// helpers
export type MakeRequired<T, K extends keyof T> = Omit<T, K> & Required<{ [P in K]: T[P] }>

import parseLink from 'parse-link-header'

import { EVENTS_PER_PAGE, REPOS_PER_PAGE, USERS_PER_PAGE } from 'app/config'
import {
    EventResponse,
    EventsResponse,
    RepoResponse,
    ReposResponse,
    UserDetailsResponse,
    UserResponse,
    UsersResponse,
} from 'app/types'

import axios from './axiosGithubUsers'

export async function getUsers(since: number = 0): Promise<UsersResponse> {
    try {
        const usersResponse = await axios.get<UserResponse[]>('', {
            params: { since, per_page: USERS_PER_PAGE },
        })

        const pageLinks = parseLink(usersResponse.headers.link)
        const isLastPage = !pageLinks?.hasOwnProperty('next')

        return {
            isLastPage,
            items: usersResponse.data,
        }
    } catch (err) {
        throw err
    }
}

export async function getUserDetails(login: string): Promise<UserDetailsResponse> {
    try {
        const { data } = await axios.get<UserDetailsResponse>(`/${login}`)

        return data
    } catch (err) {
        throw err
    }
}

export async function getEvents(login: string): Promise<EventsResponse> {
    const url = `/${login}/events/public?page=0&per_page=${EVENTS_PER_PAGE}`
    try {
        const { data } = await axios.get<EventResponse[]>(url)

        return {
            items: data,
        }
    } catch (err) {
        throw err
    }
}

export async function getRepos(login: string, page: number = 0): Promise<ReposResponse> {
    const url = `/${login}/repos?page=${page}&per_page=${REPOS_PER_PAGE}&sort=created`
    try {
        const { data } = await axios.get<RepoResponse[]>(url)

        return {
            items: data,
        }
    } catch (err) {
        throw err
    }
}

import { useLayoutEffect } from 'react'

export default function useDocumentTitle(title?: string): void {
    useLayoutEffect(() => {
        document.title = title ? title + ' | GitHub Users' : 'GitHub Users'
    }, [title])
}

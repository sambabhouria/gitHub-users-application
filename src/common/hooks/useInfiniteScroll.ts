import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ActionCreator } from 'typesafe-actions'

// infinite scrolling with intersection observer
export default (scrollRef: any, onScroll: ActionCreator) => {
    const dispatch = useDispatch()
    const scrollObserver = useCallback(
        (node) => {
            new IntersectionObserver((entries) => {
                entries.forEach((en) => {
                    if (en.intersectionRatio > 0) {
                        dispatch(onScroll())
                    }
                })
            }).observe(node)
        },
        [onScroll, dispatch]
    )
    useEffect(() => {
        if (scrollRef.current) {
            scrollObserver(scrollRef.current)
        }
    }, [scrollObserver, scrollRef, onScroll])
}

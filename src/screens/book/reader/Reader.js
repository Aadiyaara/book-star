import React, { useEffect, useState } from 'react'
import ReaderControls from './ReaderControls'
import { fetchPages, fetchPagesBySkipAndLimit } from '../../../api'
import { Segment } from 'semantic-ui-react'

export default function Reader({book}) {
    
    const [loading, setLoading] = useState(true)
    const [hasMore, setHasMore] = useState(true)
    const [fetchedPageCount, setFetchedPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [pages, setPages] = useState([])

    useEffect(() => {
        getMorePages()
    }, [])

    const PAGINATION_LIMIT = 5

    const getMorePages = async () => {
        try {
            let newPages = (await fetchPagesBySkipAndLimit(book._id, fetchedPageCount.toString(), PAGINATION_LIMIT)).data
            setPages([...pages, ...newPages])
            if(!newPages.length || newPages.length < PAGINATION_LIMIT) 
                setHasMore(false)
            setFetchedPageCount(count => count + newPages.length)
            if(currentPage === 0) setCurrentPage(1)
            setLoading(false)
        }
        catch (err) {
            console.error(':: HOME -> getMorePages ::', err);
        }
    }

    if(currentPage > fetchedPageCount - 5 && !loading && hasMore) {
        setLoading(true)
        getMorePages()
    }

    return (
        <div className='Reader'>
            {!!currentPage && <Segment style={{paddingTop: '10vh', minHeight: '70vh'}} textAlign='justify'>
                {pages[currentPage - 1].content}
            </Segment>}
            <ReaderControls isLoading={loading} currentPage={currentPage} setPage={setCurrentPage} hasMore={hasMore} onLastPage={currentPage === pages.length} />
        </div>
    )
}

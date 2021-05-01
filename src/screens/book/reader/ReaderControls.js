import React from 'react'
import { Button } from 'semantic-ui-react'

export default function ReaderControls({currentPage, setPage, isLoading, hasMore, onLastPage}) {

    return (
        <div>
            {!isLoading && <>
                    <Button disabled={currentPage !== 0} onClick={() => setPage(currentPage - 1)}>Previous</Button>
                        <b>Current Page:  {currentPage}</b>
                    <Button disabled={!hasMore && onLastPage} onClick={() => setPage(currentPage + 1)}>Next</Button>
                </>
            }
        </div>
    )
}

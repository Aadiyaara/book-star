import React, { useEffect, useState } from 'react'
import { Button } from 'semantic-ui-react'

export default function PageManager({pages, setPages}) {

    const updatePageContent = (e, index) => {
        let newPages = [...(pages.slice(0, index))]
        newPages.push(
            {...pages[index], content: e.target.value}
        )
        pages.slice(index + 1).forEach(page => {
            newPages.push(page)
        })
        setPages(newPages)
    }

    const addNewPage = () => {
        setPages([...pages, {content: 'Add content here', number: pages.length + 1}])
    }

    const removePage = (index) => {
        let newPages = [...(pages.slice(0, index))]
        pages.slice(index + 1).forEach(page => {
            newPages.push({
                ...page,
                number: page.number - 1
            })
        })
        setPages(newPages)
    }

    return (
        <>
            <Button onClick={addNewPage}>Add a new Page</Button>
            {pages.map((page, index) => {
                return <div style={{padding: '2rem 1rem'}} key={page._id ?? index}>
                    <div style={{width: '100%', justifyContent: 'space-between'}}>
                        <div>
                            Page {page.number} / {index + 1}
                        </div>
                        <Button onClick={() => removePage(index)}>Remove page</Button>
                    </div>
                    <textarea value={page.content} onChange={(e) => updatePageContent(e, index)}/>
                </div>
            })}
        </>
    )
}

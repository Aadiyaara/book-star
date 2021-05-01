import React, { useState, useEffect } from 'react'
import { Button, Form } from 'semantic-ui-react'
import PageManager from './PageManager'
import { fetchPages, createBook, savePages, updateBook, updatePage, createPage, deletePage } from '../../api'
import { useForm } from '../../helpers/hooks/useForm'
import { useHistory } from 'react-router-dom'

export default function BookManager({book, setOpen}) {

    const isEditing = !!book
    const [pages, setPages] = useState([])
    const [values, setValues] = useForm({title: '', caption: ''})
    const [initialPages, setInitialPages] = useState([])
    const [fileData, setFileData] = useState()
    const history = useHistory()

    useEffect(() => {
        if(book) {
            getBookPages()
        }
    }, [])

    const selectImage = (e) => {
        if(e && e.target && e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            const reader = new FileReader()
            reader.onload = (e) => {
                setFileData(btoa(e.target.result))
            }
            reader.readAsBinaryString(file)
        }
    }

    const getBookPages = async () => {
        const fetchedPages = (await fetchPages(book._id)).data
        setPages([...pages, ...fetchedPages])
        setInitialPages([...fetchedPages])
    }
    
    const save = async () => {
        const title = values.title.length > 0 ? values.title : book.title
        const caption = values.caption.length > 0 ? values.caption : book.caption
        if(!title) {
            window.alert('A book must have a title')
            return
        }
        if(!caption) {
            window.alert('A book must have a caption')
            return
        }
        if(!pages.length) {
            window.alert('A book must have a minimum of one page')
            return
        }
        let payload = {title, caption}
        if(fileData) {
            payload.image = fileData
        }
        if(isEditing) {
            await updateBook(book._id, payload)
            await updatePages(pages)
            setOpen(false)
            history.push('/')
        }
        else {
            const newBook = await createBook(payload)
            const bookId = newBook.data._id
            setOpen(false)
            history.push('/')
            await savePages(bookId, pages)
        }
    }
    
    const updatePages = async () => {
        var checkingPage = 0
        for ( let page of initialPages) {
            if(pages.length > checkingPage && page.content != pages[checkingPage].number || page.number != pages[checkingPage].number) {
                await updatePage(page._id, {content: pages[checkingPage].content})
            }
            checkingPage++ 
        }
        if(checkingPage < pages.length) {
            // CREATE new pages
            for (let page of pages.slice(checkingPage))
                await createPage(book._id, page)

        }
        else if (checkingPage > pages.length) {
            // DELETE pages from the end
            for(let page of initialPages.slice(pages.length)) {
                await deletePage(page._id)
            }
        }
    }

    return (
        <div>
            <Form>
                <Form.Field>
                    <label>Title</label>
                    <input placeholder='Title' onChange={(e) => setValues('title', e)} defaultValue={book?.title ?? ''} />
                </Form.Field>
                <Form.Field>
                    <label>Caption</label>
                    <input placeholder='Caption'  onChange={(e) => setValues('caption', e)} defaultValue={book?.caption ?? ''} />
                </Form.Field>
                <Form.Field>
                    <label>Select Book Cover</label>
                    <input placeholder='Book Cover'  type='file' accept='.jpg' onChange={(e) => selectImage(e)} />
                </Form.Field>
                <Form.Field>
                    <PageManager pages={pages} setPages={setPages} />
                    <Button 
                        color='black' 
                        onClick={() => setOpen(false)} >
                        Cancel
                    </Button>
                    <Button
                        content={isEditing ? 'Save' : 'Create'}
                        labelPosition='right'
                        icon='checkmark'
                        onClick={() => save()}
                        positive
                    />
                </Form.Field>
            </Form>
        </div>
    )
}

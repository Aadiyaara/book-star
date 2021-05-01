import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('jwtToken')) {
        req.headers.Authorization = `Bearer ${localStorage.getItem('jwtToken')}`;
    }

    return req;
});

export const fetchPages = (bookId) => API.get(`/pages/${bookId}`);
export const fetchPagesBySkipAndLimit = (bookId, skip, limit) => API.get(`/pages/${bookId}?skip=${skip}&limit=${limit}`);
export const savePages = (bookId, pages) => API.post(`/pages/${bookId}`, {contentBlocks: pages});
export const createPage = (bookId, page) => API.post(`/page/${bookId}`, page);
export const updatePage = (pageId, content) => API.patch(`/page/${pageId}`, content);
export const deletePage = (pageId) => API.delete(`/page/${pageId}`);


export const fetchBooks = (filter, order) => API.get(`/books?sortBy=${filter}&inOrder=${order}`);
export const fetchUserBooks = () => API.get('/my_books');
export const createBook = (newBook) => API.post('/books', newBook);
export const updateBook = (id, updatedBook) => API.patch(`/books/${id}`, updatedBook);
export const deleteBook = (id) => API.delete(`/books/${id}`);

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);
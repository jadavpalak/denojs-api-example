interface IBook {
    isbn: string;
    author: string;
    title: string;
    routeLink: string;
}

let books: Array<IBook> = [{
    isbn: "1",
    author: "Robin Wieruch",
    title: "The Road to React",
    routeLink: 'http://localhost:7700/books/1'
}, {
    isbn: "2",
    author: "Kyle Simpson",
    title: "You Don't Know JS: Scope & Closures",
    routeLink: 'http://localhost:7700/books/2'
}, {
    isbn: "3",
    author: "Andreas A. Antonopoulos",
    title: "Mastering Bitcoin",
    routeLink: 'http://localhost:7700/books/3'
}]

const getBooks = ({ response }: { response: any }) => {
    response.body = books
}

const getBook = ({ params, response }: { params: { isbn: string }; response: any }) => {
    const book: IBook | undefined = searchBookByIsbn(params.isbn)
    if (book) {
        response.status = 200
        response.body = book
    } else {
        response.status = 404
        response.body = { message: `Book not found.` }
    }
}

const addBook = async ({ request, response }: { request: any; response: any }) => {
    const body = await request.body()
    const book: IBook = body.value
    books.push(book)
    response.body = { message: 'OK' }
    response.status = 200
}

const updateBook = async ({ params, request, response }: { params: { isbn: string }; request: any; response: any }) => {
    let book: IBook | undefined = searchBookByIsbn(params.isbn)
    if (book) {
        const body = await request.body()
        const updateInfos: { author?: string; title?: string } = body.value
        book = { ...book, ...updateInfos }
        books = [...books.filter(book => book.isbn !== params.isbn), book]
        response.status = 200
        response.body = { message: 'OK' }
    } else {
        response.status = 404
        response.body = { message: `Book not found` }
    }
}

const deleteBook = ({ params, response }: { params: { isbn: string }; response: any }) => {
    books = books.filter(book => book.isbn !== params.isbn)
    response.body = {
        message: 'OK'
    }
    response.status = 200
}

const root = ({ params, response }: { params: { isbn: string }; response: any }) => {
    response.body = {
        message: 'Welcome',
        routeLink: 'http://localhost:7700/books'
    }
    response.status = 200
}

const searchBookByIsbn = (isbn: string): (IBook | undefined) => {
     return books.filter(book => book.isbn === isbn)[0];
}

export { getBooks, getBook, addBook, updateBook, deleteBook, root }


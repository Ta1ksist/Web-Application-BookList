const GET_API_URL = "https://localhost:7085/api/Book";

export  async function GetBooks() {
    const response = await fetch(GET_API_URL);
    if(!response.ok)
    {
        throw new Error('Failed to fetch books');
    }
    return await response.json();
}

export async function AddBook(book : Book) {
    const response = await fetch(GET_API_URL, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add book');
    }

    return await response.json();
}

export async function UpdateBook(book : Book) {
    const response = await fetch(`https://localhost:7085/api/Book/${book.id}`, {
        method: "PUT", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
    });

    if (!response.ok) {
        // Проверяем, есть ли в ответе тело с контентом
        let errorMessage = 'Failed to update book';
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch (e) {
            console.error('Failed to parse error response:', e);
        }
        throw new Error(errorMessage);
    }

    // Если сервер вернул пустой ответ, то нужно проверить его явно
    const responseBody = await response.text();
    if (responseBody) {
        return JSON.parse(responseBody);
    }

    // Если сервер вернул пустой ответ с успешным кодом, возвращаем undefined или другой объект.
    return null;
    // return await response.json();
}
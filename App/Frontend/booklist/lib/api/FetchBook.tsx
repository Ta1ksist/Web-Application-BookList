const API_URL = "https://localhost:7085/api/Book";

export  async function GetBooks() {
    const response = await fetch(API_URL);
    if(!response.ok)
    {
        throw new Error('Failed to fetch books');
    }
    return await response.json();
}

export async function AddBook(book : Book) {
    const response = await fetch(API_URL, {
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
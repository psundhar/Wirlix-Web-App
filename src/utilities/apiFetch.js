const apiFetch = (method, body) => {
    const options = {
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        credentials: 'include',
        method,
    };

    return fetch('/api/statements', options)
};

export default apiFetch;
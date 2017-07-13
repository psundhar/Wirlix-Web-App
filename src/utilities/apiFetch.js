const apiFetch = (url, method, body) => {
    const options = {
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        credentials: 'include',
        method,
    };

    return fetch(url, options)
};

export default apiFetch;
const apiFetch = (url, method, body) => {
    const options = {
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        credentials: 'include',
        method,
    };

    if(body) {
        options['body'] = JSON.stringify(body);
    }

    return fetch(url, options)
};

export default apiFetch;
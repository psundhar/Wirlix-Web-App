import apiFetch from './apiFetch';

const GETOne = (path, id, cb) => {
    return apiFetch(path + id, 'GET')
    .then(res => res.json())
    .then(json => {
        cb(json);
    });
};

export const getDebate = (debateId, cb) => {
    return GETOne('/api/debates/', debateId, cb);
};

export const getStatement = (statementId, cb) => {
    return GETOne('/api/statements/', statementId, cb);
}
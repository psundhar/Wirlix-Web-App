import apiFetch from './apiFetch';

const GETOne = (path, id, cb) => {
    apiFetch(path + id, 'GET')
    .then(res => res.json())
    .then(json => {
        cb(json);
    });
};

export const getDebate = (debateId, cb) => {
    GETOne('/api/debates/', debateId, cb);
};

export const getStatement = (statementId, cb) => {
    GETOne('/api/statements/', statementId, cb);
}
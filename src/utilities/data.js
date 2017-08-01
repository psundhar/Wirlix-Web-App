import apiFetch from './apiFetch';

export const getDebate = (debateId, cb) => {
    apiFetch('/api/debates/' + debateId, 'GET')
        .then(res => res.json())
        .then(json => {
            cb(json);
        });
}

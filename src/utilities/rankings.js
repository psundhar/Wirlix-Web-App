export const countVoteTypes = (statements) => {
    return statements.map((s) => {
        s.rational = s.voters.filter(v => v.isRational).length;
        s.emotional = s.voters.length - s.rational;
        return s;
    });
};

export const hasVotesFilter = statement => {
    return statement.voters.length > 0
};

export const countFactualVotes = (statements) => {
    return statements.filter(s => s.rational > 0).sort((a,b) => {
        if(a.rational == b.rational) {
            return 0;
        }
        if(a.rational > b.rational) {
            return -1;
        }
        return 1;
    });
};

export const countEmotionalVotes = (statements) => {
    return statements.filter(s => s.emotional > 0).sort((a,b) => {
        if(a.emotional > b.emotional) {
            return -1;
        }
        return 1;
    });
};
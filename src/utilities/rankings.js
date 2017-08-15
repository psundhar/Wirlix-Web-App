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

export const factualRankings = (statements, filter = ((s) => s.rational > 0)) => {
    return statements.filter(filter).sort((a,b) => {
        if(a.rational == b.rational) {
            return 0;
        }
        if(a.rational > b.rational) {
            return -1;
        }
        return 1;
    });
};

export const emotionalRankings = (statements, filter = ((s) => s.rational > 0)) => {
    return statements.filter(filter).sort((a,b) => {
        if(a.emotional == b.emotional) {
            return 0;
        }
        if(a.emotional > b.emotional) {
            return -1;
        }
        return 1;
    });
};

export const findRank = (statements, userId) => {
    const index = statements.findIndex(s => s.user._id == userId);

    if(index > -1) {
        return index + 1;
    }
}
import React from 'react';
import FirstArgumentCard from './FirstArgumentCard';

export default ({debates, userId, handleReplyClick}) => {
    const myDebates = debates.filter((d) => {
        return d.challenger._id == userId || d.challengee._id == userId;
    });

    return (<section className="my-debates">
        <div className="container">
            { myDebates.length == 0 && (<p>You aren't active in any debates yet.</p>) }
            { myDebates.map((d, i) => {
                return (<FirstArgumentCard handleReplyClick={handleReplyClick} debate={d} challenger={ userId == d.challenger._id } key={i}/>)
            })}
        </div>
    </section>)
}

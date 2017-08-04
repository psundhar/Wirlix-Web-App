import React from 'react';
import FirstArgumentCard from './FirstArgumentCard';

export default ({debates, user, handleReplyClick}) => {
    const myDebates = debates.filter((d) => {
        return d.challenger._id == user._id || d.challengee._id == user._id;
    });

    return (<section className="my-debates">
        <div className="container">
            { myDebates.length == 0 && (<p>You aren't active in any debates yet.</p>) }
            { myDebates.map((d, i) => {
                return (<FirstArgumentCard user={user} handleReplyClick={handleReplyClick} debate={d} challenger={ user._id == d.challenger._id } key={i}/>)
            })}
        </div>
    </section>)
}

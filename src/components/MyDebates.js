import React from 'react';
import FirstArgumentCard from './FirstArgumentCard';

export default ({debates, user, handleReplyClick}) => {
    return (<section className="my-debates clearfix">
        <div>
            { debates.length == 0 && (<p style={{color: '#000'}}>You aren't active in any debates yet.</p>) }
            { debates.sort((a, b) => {
                if(a.updated >= b.updated) {
                    return -1;
                }
                return 1;
            }).map((d, i) => {
                return (<FirstArgumentCard user={user} handleReplyClick={handleReplyClick} debate={d} challenger={ user._id == d.challenger._id } key={i}/>)
            })}
        </div>
    </section>)
}

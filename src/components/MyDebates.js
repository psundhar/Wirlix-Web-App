import React from 'react';
import FirstArgumentCard from './FirstArgumentCard';

export default ({debates, userId}) => {
    return (<section className="my-debates">
        <div className="container">
            { debates.filter((d) => {
                return d.challenger._id == userId || d.challengee._id == userId;
            }).map((d, i) => {
                return (<FirstArgumentCard {...d} challenger={ userId == d.challenger._id } key={i}/>)
            })}
        </div>
    </section>)
}

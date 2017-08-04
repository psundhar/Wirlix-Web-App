import React from 'react';

export default ({fadeOut}) => {
    return (
        <div className={ "end-overlay " + ( fadeOut ? 'Fade-Out' : '' ) }><div className="end-message">
            <p className="quote">Change will not come if we wait for some other person or some other time. We are the ones we've been waiting for. We are the change that we seek.</p>
            <p className="coexist"><span className="C">C</span><span className="O">O</span><span className="E">E</span><span className="X">X</span><span className="I">I</span><span className="S">S</span><span className="T">T</span></p>
        </div></div>
    )
}

import React from 'react';
import './card-style.css';
const Card = props => {
    return(
        <div className="card text-center">
            <div className="overflow">
                <img className='card-img-top' src="" alt="" ></img>
            </div>
            <div className="card-body text-dark">
                <h4 className="card-title">Card Title</h4>
                <p className="card-text text-secondary">
                    Lorem ipsum dolor sit on y amwt dkdflkd slfkdj
                    dsfkldsfldjsk  ksdfkj sdj fksjf kljskl dj fkdj
                </p>
            </div>

        </div>
    );
}
export default Card;
import React, {memo} from 'react'
import {Link} from 'react-router-dom';
import { Star } from '../style';
import { StyledShowCard } from './shoecardstyle';

const ShowCard = ({ id, image, name, summary, onStartClick,isstardshow }) => {
  // console.log('render');
    const summaryAsText = summary
      ? `${summary.split(' ').slice(0, 10).join(' ').replace(/<.+?>/g, "")}...`
      : 'No description';
  
    return (
    
      <StyledShowCard>
        <div className="img-wrapper">
          <img src={image} alt="show" />
        </div>
  
        <h1>{name}</h1>
  
        <p>{summaryAsText}</p>
  
        <div className="btns">
          <Link to={`/show/${id}`}>Read more</Link>
          <button type="button" onClick={onStartClick}>
            <Star active={isstardshow}/>
          </button>
        </div>
      </StyledShowCard>
    
    );
  };

export default memo(ShowCard)

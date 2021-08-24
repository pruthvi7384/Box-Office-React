import React from 'react'
import IMG_PLACEHOLDER from '../../image/not-found.png';
import { Star } from '../style';
import { Headline, MainDataWrapper, TagList } from './ShowMainData.styled';

function ShowMainData({ name, rating, summary, tags, image }){
    return (
      <MainDataWrapper>
        <img src={image ? image.original : IMG_PLACEHOLDER} alt="show-cover" />
        <div className="text-side">
            <Headline>
                <h1>{name}</h1>
                <div>
                    <Star active />
                    <span>{rating.average || 'N/A'}</span>
                </div>
            </Headline>
          <div className="summary" dangerouslySetInnerHTML={{ __html: summary }} />
  
          <div>
            Tags:{' '}
            <TagList>
              {tags.map((tag, i) => (
                <span key={i}>{tag}</span>
              ))}
            </TagList>
          </div>
        </div>
      </MainDataWrapper>
    );
  };
  

export default ShowMainData

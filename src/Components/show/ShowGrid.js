/* eslint-disable react-hooks/rules-of-hooks */
import React,{useCallback} from 'react'
import ShowCard from './ShowCard';
import IMAGE_NOT_FOUND from '../../image/not-found.png';
import { FlexGrid } from '../style';
import {useShows} from '../../mics/coustum-hooks';

function ShowGrid({data}) {
    const [startedShow,dispatchshow] = useShows();
    
    return (
        <FlexGrid>
            {
                data.map(({show})=>{
                    const isstardshow = startedShow.includes(show.id);
                    const onStartClick = useCallback( () => {
                        if(isstardshow){
                            dispatchshow({type:'REMOVE', showId:show.id});
                        }else{
                            dispatchshow({type:'ADD', showId:show.id});
                        }
                },[isstardshow,show.id] );
                   return (
                    <ShowCard 
                        key={show.id} 
                        id={show.id} 
                        name={show.name} 
                        image={show.image ? show.image.medium : IMAGE_NOT_FOUND }
                        summary={show.summary}
                        onStartClick={onStartClick} 
                        isstardshow={isstardshow}
                    />
                   )
                })
            }
        </FlexGrid>
    )
}

export default ShowGrid

import React,{ useReducer, useEffect } from 'react'
import {useParams} from 'react-router-dom';
import Detailes from '../Components/show/Detailes';
import ShowMainData from '../Components/show/ShowMainData';
import Session from '../Components/show/Session';
import {apiget} from '../mics/config';
import Cast from '../Components/show/Cast';
import { InfoBlock, ShowPageWrapper } from './Show.styled';

const reducer =(prevstate,action) => {
    switch(action.type) {

        case 'FEATCH_SUCCESS':{
            return {isloding:false,iserror:null,show:action.show};
        }
        case 'FEATCH_FAILED': {
            return {...prevstate,isloding:false,iserror:action.iserror};
        }
        default: return prevstate
    }
}

const initialState = {
    show:null,
    isloding:true,
    iserror:null
}

function Show() {
    const {id} = useParams();
    // const [show,setShow]=useState(null);
    // const [isloding,setLoding]=useState(true);
    // const [iserror,setError]=useState(null);
    // console.log(id);
    const [{show,isloding,iserror},despatch] =useReducer(reducer,initialState);
    
    useEffect(()=>{
        let isMounted = true;
        apiget(`/shows/${id}?embed[]=seasons&embed[]=cast`)
        .then(results => {
                if(isMounted) {
                    despatch({type:'FEATCH_SUCCESS',show:results})
                }
        }).catch(err => {
            if(isMounted) {
                despatch({type:'FEATCH_FAILED',iserror:err.message})
            }
        })
        return ()=>{
            isMounted= false;
        }
    }, [id] )
    console.log(show);
    if(isloding){
        return <div>Data Is being Loded</div>
    }
    if(iserror){
        return <div>Error Occured : {iserror}</div>
    }
    return (
        <ShowPageWrapper>
            <ShowMainData image={show.image} name={show.name} rating={show.rating} summary={show.summary} tags={show.genres} />
            <InfoBlock>
                <h2>Details</h2>
                <Detailes status={show.status} network={show.network} premiered={show.premiered}/>
            </InfoBlock>
            <InfoBlock>
                <h2>Sessions</h2>
                <Session seasons={ show._embedded.seasons }/>
            </InfoBlock>
            <InfoBlock>
                <h2>Cast</h2>
                <Cast cast={ show._embedded.cast }/>
            </InfoBlock>
        </ShowPageWrapper>
    )
}

export default Show

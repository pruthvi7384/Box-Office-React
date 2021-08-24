import React from 'react'
import {useParams} from 'react-router-dom';
import Detailes from '../Components/show/Detailes';
import ShowMainData from '../Components/show/ShowMainData';
import Session from '../Components/show/Session';
import Cast from '../Components/show/Cast';
import { InfoBlock, ShowPageWrapper } from './Show.styled';
import {useShowes} from '../mics/coustum-hooks'
import { Centered } from '../Components/style';



function Show() {
    const {id} = useParams();
    const {show,isloding,iserror} =useShowes(id);
    // const [show,setShow]=useState(null);
    // const [isloding,setLoding]=useState(true);
    // const [iserror,setError]=useState(null);
    // console.log(id);
    
    // console.log(show);
    if(isloding){
        return <Centered>Data Is being Loded</Centered>
    }
    if(iserror){
        return <Centered> Error Occured : {iserror}</Centered>
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

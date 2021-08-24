import React,{ useState, useEffect } from 'react'
import {useParams} from 'react-router-dom';
import {apiget} from '../mics/config';

function Show() {
    const {id} = useParams();
    const [show,setShow]=useState(null);
    // console.log(id);
    useEffect(()=>{
        apiget(`/shows/${id}?embed[]=seasons&embed[]=cast`)
        .then(results => {
            setShow(results);
        })
    }, [id] )
    console.log(show);
    return (
        <div>
            This is show page
        </div>
    )
}

export default Show

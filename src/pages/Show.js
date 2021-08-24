import React,{ useState, useEffect } from 'react'
import {useParams} from 'react-router-dom';
import {apiget} from '../mics/config';

function Show() {
    const {id} = useParams();
    const [show,setShow]=useState(null);
    const [isloding,setLoding]=useState(true);
    const [iserror,setError]=useState(null);
    // console.log(id);
    useEffect(()=>{
        let isMounted = true;
        apiget(`/shows/${id}?embed[]=seasons&embed[]=cast`)
        .then(results => {
            setTimeout(()=>{
                if(isMounted) {
                    setShow(results);
                    setLoding(false);
                }
            },2000)
        }).catch(err => {
            if(isMounted) {
                setError(err.message);
                setLoding(false);
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
        <div>
            This is show page
        </div>
    )
}

export default Show

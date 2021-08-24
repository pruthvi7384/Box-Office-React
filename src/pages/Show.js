import React,{ useReducer, useEffect } from 'react'
import {useParams} from 'react-router-dom';
import {apiget} from '../mics/config';

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
            setTimeout(()=>{
                if(isMounted) {
                    despatch({type:'FEATCH_SUCCESS',show:results})
                }
            },2000)
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
        <div>
            This is show page
        </div>
    )
}

export default Show

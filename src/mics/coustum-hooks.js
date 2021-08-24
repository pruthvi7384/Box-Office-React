import { useReducer, useEffect ,useState } from 'react';
import {apiget} from '../mics/config';

function showsReducer(prevState, action) {
  switch (action.type) {
    case 'ADD': {
      return [...prevState, action.showId];
    }

    case 'REMOVE': {
      return prevState.filter(showId => showId !== action.showId);
    }

    default:
      return prevState;
  }
}

function usePersistedReducer(reducer, initialState, key) {
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    const persisted = localStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
}

export function useShows(key = 'shows') {
  return usePersistedReducer(showsReducer, [], key);
}

export function useLastQuery(key='lastQuery'){
  const [input,setInput] = useState(()=>{
    const persisted = sessionStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : "";
  });
  const setPristedInput =(newState) => {
    setInput(newState);
    sessionStorage.setItem(key, JSON.stringify(newState));
  }
  return [ input,setPristedInput ];
}


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

export function useShowes(showId){
  const [state,despatch] =useReducer(reducer,{
    show:null,
    isloding:true,
    iserror:null
  });
    
    useEffect(()=>{
        let isMounted = true;
        apiget(`/shows/${showId}?embed[]=seasons&embed[]=cast`)
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
    }, [showId] )
    return state;
}
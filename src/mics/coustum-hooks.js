import { useReducer, useEffect ,useState ,useRef,useCallback} from 'react';
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
  const setPristedInput = useCallback(  newState => {
    setInput(newState);
    sessionStorage.setItem(key, JSON.stringify(newState));
  },[key] );
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

export function useWhyDidYouUpdate(name, props) {
  // Get a mutable ref object where we can store props ...
  // ... for comparison next time this hook runs.
  const previousProps = useRef();
  useEffect(() => {
    if (previousProps.current) {
      // Get all keys from previous and current props
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      // Use this object to keep track of changed props
      const changesObj = {};
      // Iterate through keys
      allKeys.forEach((key) => {
        // If previous is different from current
        if (previousProps.current[key] !== props[key]) {
          // Add to changesObj
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key],
          };
        }
      });
      // If changesObj not empty then output to console
      if (Object.keys(changesObj).length) {
        console.log("[why-did-you-update]", name, changesObj);
      }
    }
    // Finally update previousProps with current props for next hook call
    previousProps.current = props;
  });
}
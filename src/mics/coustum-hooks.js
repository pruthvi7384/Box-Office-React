import { useReducer,useEffect} from "react"; 

function useShows(prvestate,action) {
    switch(action.type) {
        case 'ADD':{
            rerturn [...prvestate,action.showId]
        }
        case 'REMOVE':{
            return prvestate.fillters(showId => showId !== action.showId)
        }
        default: return prevstate;
    }
}

function usePresistedReducer(reducer,initialstate,key){
    const [ state, despatch ] = useReducer(reducer,initialstate,(initial)=>{
        const presisted = localStorage.getItem(key);
        return presisted ? JSON.parse(presisted) : initial;
    });

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(state));
    },[state,key]);

    return [state,despatch];
} 

export function useShows(key='show'){
    return  usePresistedReducer(showReducer,[],key);
}

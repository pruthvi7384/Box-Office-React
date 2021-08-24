import React,{useState,useEffect} from 'react';
import MainPageLayout from '../Components/MainPageLayout';
import {useShows} from '../mics/coustum-hooks';
import  {apiget} from '../mics/config';
import ShowGrid from '../Components/show/ShowGrid';
const Starred = () => {
  const [started] = useShows();
  const [shows,setShow] = useState(null);
  const [islodings,setLodings] = useState(true);
  const [iserror,setError] = useState(null);

  useEffect(() => {
      if(started && started.length > 0) {
        const promises = started.map(showId => apiget(`/shows/${showId}`))
          Promise.all(promises)
        .then(apiData => apiData.map(show => ({show})))
          .then(result=> {
            setShow(result);
            setLodings(false);
          }).catch(err => {
            setError(err.message);
            setLodings(false);
          })
      }else{
        setLodings(false);
      }
  },[started])
  return <MainPageLayout> 
  {islodings && <div>Shows are stilled Loding.</div> } 
  {iserror && <div>Error Occured : {iserror}</div>}
  {!islodings && !shows && <div> No Shows Werer Added ! </div>}
  {!islodings && !iserror && shows && <ShowGrid data={shows} />}
   </MainPageLayout>;
};

export default Starred;

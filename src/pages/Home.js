import React,{useState} from 'react';
import ActorGrid from '../Components/actor/ActorGrid';
import MainPageLayout from '../Components/MainPageLayout';
import ShowGrid from '../Components/show/ShowGrid';
import  {apiget} from '../mics/config';
import {useLastQuery} from '../mics/coustum-hooks';

const Home = () => {
  const [input,setInput] = useLastQuery();
  const [results,setResults] = useState(null);
  const [radioOption,setRadioOption] = useState('shows');

  const isShowsOption = radioOption === 'shows';
  const Search = ()=>{
    apiget(`/search/${radioOption}?q=${input}`)
   .then(result=>{
      setResults(result);
      console.log(result);
    })
  }
  const onChange = (ev)=>{
    // console.log(ev.target.value);
    setInput(ev.target.value);
  }
  const onKeyDown = (ev)=>{
    if(ev.keyCode === 13){
      Search();
    }
  }
  const RenderedSearch= ()=>{
    if(results && results.length === 0){
        return <div>No Results Found !</div>
    }
    if(results && results.length > 0){
        return results[0].show 
        ? <ShowGrid data={results}/>
        : <ActorGrid data={results}/>;
    }
    return null;
  }
  const onChangeRadoio = (ev)=>{
    setRadioOption(ev.target.value);
    // console.log(ev.target.value);
  }
  console.log(radioOption);
  return ( 
      <MainPageLayout>
        <input type="text" onChange={onChange} onKeyDown={onKeyDown} value={input} />
        <div>
          <label htmlFor="show_search">
              Shows
              <input id="show_search" checked={isShowsOption} type="radio" value="shows" onChange={onChangeRadoio} />
          </label>
          <label htmlFor="show_actors">
              Actors
              <input id="show_actors" checked={!isShowsOption} type="radio" value="people" onChange={onChangeRadoio} />
          </label>
        </div>
        <button type="button" onClick={Search}>Search</button>
        {RenderedSearch()}
      </MainPageLayout>
    );
};

export default Home;

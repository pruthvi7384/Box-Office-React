import React,{useState} from 'react';
import MainPageLayout from '../Components/MainPageLayout';
import  {apiget} from '../mics/config';

const Home = () => {
  const [input,setInput] = useState('');
  const [results,setResults] = useState(null);
  const Search = ()=>{
    apiget(`/shows?q=${input}`)
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
        return <div> {results.map((item)=><div key={item.show.id}>{item.show.name}</div>)} </div>
    }
    return null;
  }
  return ( 
      <MainPageLayout>
        <input type="text" onChange={onChange} onKeyDown={onKeyDown} value={input} />
        <button type="button" onClick={Search}>Search</button>
        {RenderedSearch()}
      </MainPageLayout>
    );
};

export default Home;

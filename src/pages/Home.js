import React,{useState} from 'react';
import MainPageLayout from '../Components/MainPageLayout';

const Home = () => {
  const [input,setInput] = useState('');
  const Search = ()=>{
    // https://www.tvmaze.com/api
    fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
    .then(r=>r.json()).then(result=>{
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
  return ( 
      <MainPageLayout>
        <input type="text" onChange={onChange} onKeyDown={onKeyDown} value={input} />
        <button type="button" onClick={Search}>Search</button>
      </MainPageLayout>
    );
};

export default Home;

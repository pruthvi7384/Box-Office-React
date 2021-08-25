import React,{useState,useCallback} from 'react';
import ActorGrid from '../Components/actor/ActorGrid';
import CustomRadioButton from '../Components/CustomRadioButton';
import MainPageLayout from '../Components/MainPageLayout';
import ShowGrid from '../Components/show/ShowGrid';
import { Centered } from '../Components/style';
import  {apiget} from '../mics/config';
import {useLastQuery} from '../mics/coustum-hooks';
import { RadioInputsWrapper, SearchButtonWrapper, SearchInput } from './Home.styled';

const RenderedSearch= (results)=>{
  if(results && results.length === 0){
      return <Centered> No Results Found !</Centered>
  }
  if(results && results.length > 0){
      return results[0].show 
      ? <ShowGrid data={results}/>
      : <ActorGrid data={results}/>;
  }
  return null;
}


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
  const onChange = useCallback(  (ev)=>{
    // console.log(ev.target.value);
    setInput(ev.target.value);
  },[setInput] );

  const onKeyDown = (ev)=>{
    if(ev.keyCode === 13){
      Search();
    }
  }
  
  const onChangeRadoio = useCallback( (ev)=>{
    setRadioOption(ev.target.value);
    // console.log(ev.target.value);
  },[] ) 
  // console.log(radioOption);

  return ( 
      <MainPageLayout>
        <SearchInput type="text" placeholder="Something Search Here...." onChange={onChange} onKeyDown={onKeyDown} value={input} />
        <RadioInputsWrapper>
        <div>
          <CustomRadioButton
            label="Shows"
            id="shows-search"
            value="shows"
            checked={isShowsOption}
            onChange={onChangeRadoio}
          />
        </div>

        <div>
          <CustomRadioButton
            label="Actors"
            id="actors-search"
            value="people"
            checked={!isShowsOption}
            onChange={onChangeRadoio}
          />
        </div>
      </RadioInputsWrapper>
        <SearchButtonWrapper>
          <button type="button" onClick={Search}>Search</button>
        </SearchButtonWrapper>
        {RenderedSearch(results)}
      </MainPageLayout>
    );
};

export default Home;

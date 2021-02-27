import react, { useState } from "react";
import moment from "moment"

import "./App.css"

const api ={
  key: "c396956586e5ee7e7d2442f3ea54c143",
  base: "https://api.openweathermap.org/data/2.5/"
}



function App() {

  const [query, setQuery]= useState('');
  const [weather, setWeather]= useState({});

  const search = evt => {
    if (evt.key === "Enter"){
      //fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      fetch(`${api.base}forecast?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result)
      });
    }
  }

  const dateBuilder = (d) =>{
    let months=["January","February","March","April","May","June","July","August",
    "September","October","November","December"];
    let days= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];
    
    let day= days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    
    return `${day} ${date} ${month} ${year}`
    }

    const iconFinder = () =>{
      //{weather.list[0].weather[0].description}
      let iconString =""
      let icon = weather.list[0].weather[0].icon
      iconString = "http://openweathermap.org/img/wn/"+icon+".png"
      console.log(iconString)
      return iconString;

      }

  return (
    <div className={(typeof weather.city != "undefined")? ((weather.list[0].main.temp>16)? 'app warm' : 'app'):'app'}>
      <main>
        <div className="search-box">
          <input
          type= "text"
          className="search-bar"
          placeholder ="search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.city != "undefined") ? (
          <div>
            <div className ="location-box">
          <div className="location">
            {weather.city.name},{weather.city.country}
            
          </div>
          <div className="date">
            {dateBuilder(new Date())}
            </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.list[0].main.temp)}°c
              <div className="weather">
              {weather.list[0].weather[0].main}
              {<img className="icon" src={iconFinder()} alt="Icon"></img>}
              </div>
              <div className="weather-description">
              {weather.list[0].weather[0].description}
        
              <br/>
              <div className="speed">
              Wind:{(weather.list[0].wind.speed)}mph
              
            </div>
            <div className="humidity">
              Humidity:{(weather.list[0].main.humidity)}%
            </div>
              </div>

              
            </div>
            
          </div>
         
         
          <div className="weather-box">
            <div className="forecast-temp">
              <>
                
                  {(() =>{
                    let posts = [];
                    let j=1;
                    let days = [];
                    let daysRequired = 4
                    // days.push
                    for (let i = 0; i <= daysRequired; i++) {
                      days.push( moment().add(i, 'days').format('dddd') )
                    }
                    
                    
                    for(let i=8; i<weather.list.length; i+=8){
                      
                        
                      posts.push(<h4>{days[j]}:{Math.round(weather.list[i].main.temp)}°c</h4>)
                      
                      j = j+1
                    }
                    return posts
                  })()}
                
              </>
              
            </div>
              
                
          </div>

        </div>
          </div>
         ) : ('')}
        
      </main>
     
    </div>
  );
}

export default App;

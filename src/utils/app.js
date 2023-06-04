import axios from 'axios';
import { Configuration, OpenAIApi } from 'openai';


const configuration = new Configuration({
    apiKey: process.env.REACT_APP_AIAPIKey,
});
const openai = new OpenAIApi(configuration);


export const search = (query) => {
  return axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${process.env.REACT_APP_APIKey}`);
};

export const searchForecast = async (lat, lon) => {
return axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_APIKey}&units=metric`);
  // Handle the response here as per your requirements
};

export const searchCurrent = (query) =>{
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}'&appid=${process.env.REACT_APP_APIKey}&units=metric`);
}


export const searchSuggestion = async (city,currentWeather) =>{
   
const {main, weather} = currentWeather


    const prompt = `this is for weather appilcation please provide things to do in the the city ${city} based on the currenttime and  weather of the city feels like ${main.feels_like} temparature now is ${main.temp}celcius nad max temp will be ${main.temp_max} and min temp will be ${main.temp_min} and description of the weather is ${weather[0].description} based on the current time in ${city}`

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ "role": "user", "content": prompt }],
        temperature: 0.2,
        max_tokens: 250,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });
    
   return response.data.choices[0].message.content

}

export const searchEvent = (query) => {
  const apiKey = "KnT4PlAhomOSNjwMWWpkV3HBp4dyGaYj";
  const apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&city=${query}`;
  
  return axios.get(apiUrl)
    .then(({ data }) => {
      const { _embedded } = data;
      const events = _embedded.events;
      // You can perform any desired operations on the events array here
      
      return events;
    })
    .catch((error) => {
      // Handle the error here
      console.error("Error occurred while fetching event data:", error);
      throw error;
    });
}


export default { search, searchForecast ,searchCurrent,searchSuggestion, searchEvent};








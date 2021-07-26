const request=require('request');

const APIKEY="013036e56bb0919b85cf9611c0ced177";

const forecast=(latitude,longitude,callback)=>{

    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}`;

    request({url,json:true},(error,{body}={})=>{

            if (error) { 
                callback('Unable to connect with the location,internet issue',undefined);
            }
            else if(body.message)
            {
                callback('Unable to connect with the location,try another location',undefined);
            }
            
            else
            {
            const forecastdata=`${body.weather[0].description}.It is currently ${body.main.temp}.The high today is ${body.main.temp_max} with a low of ${body.main.temp_min}.The Humidity is ${body.main.humidity}`;
            callback(undefined,forecastdata);
            }

        
            
    
    });

};


module.exports=forecast;
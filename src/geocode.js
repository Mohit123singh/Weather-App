const request=require('request');

const geocode=(address,callback)=>{

const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibW9oaXQxMjNzaW5naCIsImEiOiJja3Fxb21pZGIxODEwMm5zdGZncDR5aDl3In0.KztO8pJoCKErRB1XU9s1ww&limit=1`;

request({url,json:true},(error,{body}={})=>{

    if(error)
    {
        callback('Unable to connect with the location,internet issue',undefined);
    }
    else if(body.features.length===0)
    {
        callback('Unable to connect with the location,try another location',undefined);
    }
    else{
        callback(undefined,{
            latitude:body.features[0].center[1],
            longitude:body.features[0].center[0],
            location:body.features[0].place_name,
        });
    }
});

};

module.exports=geocode;
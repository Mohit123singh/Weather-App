const express=require('express');

const path=require('path');

const hbs=require('hbs');

const forecast=require('./forecast');

const geocode=require('./geocode');


const app=express();

const publicDirectoryPath=path.join(__dirname,'../public');

const viewDirectoryPath=path.join(__dirname,'../templates/views');

const partialDirectoryPath=path.join(__dirname,'../templates/partials');

app.use(express.static(publicDirectoryPath));

app.set('view engine','hbs');

app.set('views',viewDirectoryPath);

hbs.registerPartials(partialDirectoryPath);

app.get('',(req,res)=>{
    res.render('index',{
        
        title:'Weather',
        Name:'Mohit Singh',
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        
        title:'About',
        Name:'Mohit Singh',
    });
});

app.get('/weather',(req,res)=>{
   
    if(!req.query.address)
    {
        return res.send({
            error:'You Must Provide an address',
        });
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        
        if(error)
        {
            return res.send({
                error,
            });
        }

        forecast(latitude,longitude,(error,forecastData)=>{

            if(error)
            {
            
                return res.send({
                    error,
                });
            }
            res.send({
                location,
                forecast:forecastData,
                address:req.query.address,
            });

        });
        
    });

});

app.get('/help',(req,res)=>{
    res.render('help',{
        
        title:'Weather',
        Name:'Mohit Singh',
        helpText:'This is a Help Text',
    });
});

app.get('/help/*',(req,res)=>{
    res.render('404',{
       title:'404',
       Name:'Mohit Singh',
       errorMessage:'Help Article not Found!',

    });
});


app.get('*',(req,res)=>{
    res.render('404',{
       title:'404',
       Name:'Mohit Singh',
       errorMessage:'Page not Found!',

    });
});


const port=3000;

app.listen(port,()=>{
    console.log(`server is listening at ${port}`);
});








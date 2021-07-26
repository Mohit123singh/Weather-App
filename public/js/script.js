

const weatherForm=document.querySelector('form');

const address=document.querySelector('input');

const element_one=document.createElement('p');

const element_two=document.createElement('p');

const container=document.querySelector('.main-content');




weatherForm.addEventListener('submit',(event)=>{
    
    event.preventDefault();
    

   element_one.textContent='Loading...';

   element_two.textContent='';

    const location=address.value;

    fetch(`/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
            {
                element_one.textContent=data.error;
                container.appendChild(element_one);
            }
            else
            {
                element_one.textContent=data.location;
                element_two.textContent=data.forecast;

                container.appendChild(element_one);
                container.appendChild(element_two);
            }
            
        });
    });
});


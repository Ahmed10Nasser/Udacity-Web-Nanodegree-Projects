/* Global Variables */
const baseURL='https://api.openweathermap.org/data/2.5/weather?zip=';
const apikey='&appid=46c3ec3c9ce21f188d074c3dfbd6db45';
const unit='&units=metric';

/* Main */
document.getElementById('generate').addEventListener('click',()=>{
    zip=document.getElementById('zip').value; //94040 -30511
    getCity(baseURL, zip, unit, apikey)
    .then(data=>{
        const input=document.getElementById('feelings').value;
        postData('/add',{temp: data.main.temp, date: currDate(), userInput: input});
        updateUI();
    });
});

/* Functions */
const getCity= async(baseURL, zip, unit, apikey)=>{
    const res=await fetch(baseURL+zip+unit+apikey);
    try{
        const data=await res.json();
        console.log(data);
        return data;
    }
    catch(error){
        console.log("error",error);
    }
};

const postData=async(url='', data={})=>{
    const res= await fetch(url,{
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try{
        const newData=await res.json();
        return newData;
    }
    catch(error){
        console.log('error',error);
    }
};

const updateUI=async()=>{
    const req=await fetch('/all');
    try{
        const allData=await req.json();
        document.getElementById('date').innerHTML=allData[allData.length-1].date;
        document.getElementById('temp').innerHTML=allData[allData.length-1].temp;
        document.getElementById('content').innerHTML=allData[allData.length-1].userInput;
    }
    catch(error){
        console.log('error',error);
    }
};

function currDate(){
    const d = new Date();
    return (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();
}
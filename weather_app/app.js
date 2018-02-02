// Problem: We need a simple way to find a user's badge count and JavaSCript points
// Solution: Use Node.js to connet to Treehouse's API to get profile information to print out

//Require HTTP module for status code
const http = require('http');
const apiKey = '47fc843c8ccb0a9ebc311d1ee955da73';
const place = '';

//Print Error Message
function printError(error){
    console.error(error.message);
   }

//Print msg to console
function printMessage(location, temp) {
  temp = Math.round(temp * 9/5 - 459.67);	
  const message = `It is ${temp} degrees in ${location}.`;
  console.log(message);
}


//Get Weather JSON
function getProfile(location){
    const request = http.get(`http://api.openweathermap.org/data/2.5/forecast?q=${location}&APPID=${apiKey}`, (response) => {
        if (response.statusCode === 200) {
         let body = "";
         //Read the data
         response.on('data', data => {
         body +=  data.toString();
         });
	response.on('end', () => {
        //Parse the data
        const profile = JSON.parse(body);
	// Print message
	printMessage(profile.city.name, profile.list[0].main.temp);	
	});
       }    	
     });
}

const location = process.argv.slice(2);
console.log(location);
location.forEach(getProfile);

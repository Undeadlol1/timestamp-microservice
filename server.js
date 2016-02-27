'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
// project dependencies
const url = require("url");
const moment = require("moment");

app.get('/:time', (req, res) => {
	const reqUrl = url.parse(req.url, true);
	let query = reqUrl.path.split('');
	query.shift();
	query = query.join('');
	query = query.replace(/%20/, ' ').replace(/%20/, ' ');
	const date = new Date(query);
 	let unix, natural;

	// not a number and is a date string
	if(isNaN(Number(query)) && date != 'Invalid Date'){
		natural = query;
		unix = moment(query, "MMMM DD, YYYY").format('X');
	}
	// is a number
	else if(!isNaN(Number(query))){
		natural = moment.unix(Number(query)).format("MMMM DD, YYYY");
		unix = query;
	}
	else { natural = null; unix = null; } 
	let data = {"unix": unix, "natural": natural};
	res.write(JSON.stringify(data));
	res.end();
})


app.listen(port, () => {
	console.log(`Node.js listening on port ${port}...`);
});


/****  TESTS  ****/
	
/*
  function request (path){
  require("http").get({
  hostname: 'localhost',
  port: 8080,
  path: '/'+ path
}, (res) => {
	 res.on('error', (err)=>{
	 	console.log('Responded with error '+ err);
	 })
	 res.on('data', (data)=>{
	 	console.log(`Response data of the ${path} is:`);
	 	console.log(JSON.parse(data));
	 })
	  res.on('end', ()=>{
		// console.log('End of response.');
	 })
})
}

request('December%2015,%202015');
request(1450137600);
request('asdad');
*/
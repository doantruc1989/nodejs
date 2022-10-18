const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const axios = require('axios');
const url = 'https://api.countrystatecity.in/v1/countries';
const config = {
  method: 'get',
  headers: { 'X-CSCAPI-KEY': 'dTBhWmVvRDkxOWFPRWpkS2FGbk9NTmlNZlJLR3FkR2NmOUZxcnJTRg==' }
}

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('home')
});

app.get('/countries', async (req, res) => {
  const country = await getCountries()

  // res.set('Content-Type', 'text/html')
  res.send(country)
});

app.get('/countries/:code/states', async (req, res) => {
  // const country = await getCountries()
  // res.set('Content-Type', 'text/html')
  const countryCode = req.params.code;
  const state = await getStatesbyCountry(countryCode);
  res.send(state);
});

app.get('/countries/:code/states/:id/cities', async (req, res) => {
  const stateCode = req.params.id;
  const countryCode = req.params.code;
  const city = await getCitesbyState(countryCode,stateCode);
  res.send(city);
});

async function getCountries() {
  let res = await axios(url, config);
  let countrydata = res.data;
  return countrydata;
}

async function getStatesbyCountry(code) {
  let url2 = `${url}/${code}/states/`;
  let res = await axios(url2, config);
  let statesdata = res.data;
  return statesdata;
}

async function getCitesbyState(countryCode,stateCode) {
  let url3 = `${url}/${countryCode}/states/${stateCode}/cities`
  let res = await axios(url3, config);
  let citiesdata = res.data;
  return citiesdata;
}









app.listen(port, () => {
  console.log(`Example app listening in http://127.0.0.1:${port}`)
})
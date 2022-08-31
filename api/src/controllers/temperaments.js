const {apiKey} = process.env;
const axios = require("axios");

async function getTemperaments(){
        const allDogsByApi = await axios.get('https://api.thedogapi.com/v1/breeds')
        const allTemperaments = allDogsByApi.data.map(e => { return e.temperament}).join(", ").split(", ")
        const allTemperamentsFinal= allTemperaments.filter((e)=> e !== "")
        const temperamentsWhitoutRepeat= [... new Set(allTemperamentsFinal)]
        return temperamentsWhitoutRepeat
}

module.exports = getTemperaments;
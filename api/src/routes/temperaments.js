const { Router } = require("express");
const { Temperament } = require("../db");
const router = Router();

router.get('/', async(req, res)=>{
    try {
        let allTemperaments = await Temperament.findAll()
        res.json(allTemperaments)
    } catch (error) {
        res.send({ error: error.message })
    }
})

module.exports=router
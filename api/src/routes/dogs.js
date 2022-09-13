const { Router } = require("express");
const { Dog , Temperament } = require("../db");
const router = Router();
const {getDogByIdFromApi, getAllDogsByNameFromApi, getAllDogsFromApi, getAllDogsFromDb, getDogByIdFromDb,getDogsByNameFromDb} = require('../controllers/dogs')

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
         const dogsApiByName = await getAllDogsByNameFromApi(name)
         const dogsDbByName = await getDogsByNameFromDb(name)
         const allDogsByName = dogsApiByName.concat(dogsDbByName)
        res.json(allDogsByName)
    }else{
        const dogsApiAll = await getAllDogsFromApi()
        const dogsDbAll = await getAllDogsFromDb()
        const allDogs = dogsDbAll.concat(dogsApiAll)
        res.json(allDogs)
      }
    } catch (error) {
    res.send({ error: error.message })
  }
});

router.get("/:idRaza", async(req, res) => {
  const { idRaza } = req.params;
  try {
    if (idRaza && idRaza.includes("-")) {
    const dogByIdDb= await getDogByIdFromDb(idRaza)
      res.json(dogByIdDb)
    }else{
      const dogByIdApi= await getDogByIdFromApi(idRaza)
      res.json(dogByIdApi)
    }
  } catch (error) {
    res.send({ error: error.message })
  }
});

router.post("/", async (req, res) => {
  const { temperament, name, heightMin, heightMax , weightMin, weightMax, life_spanMin, life_spanMax, img } = req.body;
  if(!name || !heightMin || !heightMax || !weightMin || !weightMax ) return res.status(400).send('Faltan datos obligatorios')
  try {
    const dogExist = await Dog.findOne({ where: {name} });
    
    if(!dogExist){
    const newDog = await Dog.create({
        name,
        height: heightMin + ' - ' + heightMax,
        weight: weightMin + ' - ' + weightMax,
        life_span: life_spanMin+ ' - ' + life_spanMax + " years",
        img
    });
    temperament.split(", ").map(async (temperament) => {
        let temperamentDb = await Temperament.findAll({
          where: { name: temperament},
        });
        await newDog.addTemperament(temperamentDb);
      });
    res.json(newDog) 
    }else{
      throw new Error ('The name of this dogs exists')
    }
  } catch (error) {
    res.send({ error: error.message })
  }
});

module.exports=router
const { apiKey } = process.env;
const axios = require("axios");
const e = require("express");
const { Dog, Temperament } = require("../db.js");
const { Op } = require("sequelize");

async function getAllDogsFromApi() {
  const allDogsByApi = await axios.get(
    `https://api.thedogapi.com/v1/breeds`
  );
  const allDogs = allDogsByApi.data.map((e) => {
    return {
      id: e.id,
      name: e.name,
      height: e.height?.metric,
      weight: e.weight?.metric,
      life_span: e.life_span,
      img: e.image?.url,
      temperament: e.temperament,
      origin: e.origin
    };
  });
  return allDogs;
}

async function getAllDogsByNameFromApi(name) {
  let nameLower = name[0].toLowerCase().concat(name.slice(1,name.length))
  const allDogsByApi = await axios.get(`https://api.thedogapi.com/v1/breeds`);
  const allDogsFilterByName = allDogsByApi.data.filter((e) => e.name.toLowerCase().includes(nameLower));
    const allDogs = allDogsFilterByName.map((e) => {
        return {
          id: e.id,
          name: e.name,
          height: e.height?.metric,
          weight: e.weight?.metric,
          life_span: e.life_span,
          img: e.image?.url,
          temperament: e.temperament,
        };
      });
      return allDogs;
}

async function getDogByIdFromApi(idRaza) {
  const allDogsByApi = await axios.get(
    `https://api.thedogapi.com/v1/breeds`
  );
  const dogFilterById = allDogsByApi.data.find(
    (e) => e.id === parseInt(idRaza)
  );
  const dog = {
      id: dogFilterById.id,
      name: dogFilterById.name,
      height: dogFilterById.height?.metric,
      weight: dogFilterById.weight?.metric,
      life_span: dogFilterById.life_span,
      img: dogFilterById.image?.url,
      temperament: dogFilterById.temperament,
    };
  return dog;
}

async function getAllDogsFromDb() {
  let allDogs = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
    },
  });
  let allDogsDb = allDogs.map((e) => {
    return {
      id: e.ID,
      name: e.name,
      height: e.height,
      weight: e.weight,
      life_span: e.life_span,
      img: e.img,
      temperament: e.temperaments.map((e) => e.name).join(", "),
      db: e.db
    };
  });
  return allDogsDb;
}

async function getDogByIdFromDb(id) {
  let dog = await Dog.findByPk(id, {
    include: {
      model: Temperament,
      attributes: ["name"],
    },
  });
  let dogDb = {
    id: dog.ID,
    name: dog.name,
    height: dog.height,
    weight: dog.weight,
    life_span: dog.life_span,
    img: dog.img,
    temperament: dog.temperaments.map((e) => e.name).join(", "),
  };
  return dogDb;
}

async function getDogsByNameFromDb(name) {
  let dogsFinded = await Dog.findAll({
    where: {
      name: {
        [Op.substring]: name,
      },
    },
    include: {
      model: Temperament,
      attributes: ["name"],
    },
  });
  let dogsFindedModified = dogsFinded.map((e) => {
    return {
      id: e.ID,
      name: e.name,
      height: e.height,
      weight: e.weight,
      life_span: e.life_span,
      img: e.img,
      temperament: e.temperaments.map((e) => e.name).join(", "),
    };
  });
  return dogsFindedModified;
}
module.exports = {
  getAllDogsFromApi,
  getAllDogsByNameFromApi,
  getDogByIdFromApi,
  getAllDogsFromDb,
  getDogByIdFromDb,
  getDogsByNameFromDb,
};

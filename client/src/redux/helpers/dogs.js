export const orderDogsByName = (dogs, order) => {
    if (order === "ascendent" ) {
      dogs.sort(function (a, b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        return 0;
      });
      return dogs;
    } else if (order === "descendent") {
      dogs.sort(function (a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
        return 0;
      });
      return dogs;
    }
  };

export const orderDogsByWeight = (dogs, order) => {
      let dogsWithIsNan = dogs.filter(dog => dog.weight.includes("NaN"))
      let dogsFilterWithoutIsNan = dogs.filter(dog => !dog.weight.includes("NaN"))
      if (order === "asc") {
        dogsFilterWithoutIsNan.sort(function (a, b) {
          const weightAFirst = parseInt(a.weight.split(" - ")[0]);
          const weightBFirst = parseInt(b.weight.split(" - ")[0]);
          const weightASecond = parseInt(a.weight.split(" - ")[1]);
          const weightBSecond = parseInt(b.weight.split(" - ")[1]);
          if(weightAFirst !== weightBFirst){
            return weightBFirst - weightAFirst
          }else return weightBSecond - weightASecond
        })
        return dogsFilterWithoutIsNan.concat(dogsWithIsNan)
      } else if (order === "des") {
        dogsFilterWithoutIsNan.sort(function (a, b) {
          const weightAFirst = parseInt(a.weight.split(" - ")[0]);
          const weightBFirst = parseInt(b.weight.split(" - ")[0]);
          const weightASecond = parseInt(a.weight.split(" - ")[1]);
          const weightBSecond = parseInt(b.weight.split(" - ")[1]);
          if(weightAFirst !== weightBFirst){
            return weightAFirst - weightBFirst
          }else return weightASecond - weightBSecond
        })
        return dogsFilterWithoutIsNan.concat(dogsWithIsNan)
      } else {
        return dogs;
      }
    };

export const clearOrder = (dogs)=>{
    let dogsFilterApi= dogs.filter(dog => dog.db !== true)
    let dogsFilterDb= dogs.filter(dog => dog.db === true)
    dogsFilterApi.sort(function (a, b) {
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      return 0;
    });
    return dogsFilterDb.concat(dogsFilterApi)
  }
  
export const filterDogsByTemperament = (dogs, temperament)=>{
    if(temperament === "all") return []
    const dogsFilter= dogs.filter(dog=> dog.temperament?.includes(temperament))
    return dogsFilter
  }

export const filterDogsByFrom = (dogs, allDogs, from)=>{
  if(from === "all") return []
  if(from === "db"){
    const dogsFilter= dogs.filter(dog=> dog.db === true)
    return dogsFilter
  } 
  if(from === "api"){
    const dogsFilter= dogs.filter(dog=> dog.db !== true)
    return dogsFilter
  }
}


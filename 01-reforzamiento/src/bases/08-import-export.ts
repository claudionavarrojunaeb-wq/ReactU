import {heroes, type Hero} from '../data/heroes.data';

const getHeroById = (id: number): Hero | undefined=>{
<<<<<<< HEAD
    const hero = heroes.find((hero)=>{
        return hero.id === id;

    });

// if(!hero){
//     throw new Error(`No existe uin héroe con el id ${id}`);
// }
return hero;
}
console.log(getHeroById(1));
=======
  const hero = heroes.find((h) => h.id === id);
  
  if(!hero){
    throw new Error(`No existe un héroe con el id ${id}`);
  }
  return hero;
}

export default getHeroById;
>>>>>>> defebae (casa 2)

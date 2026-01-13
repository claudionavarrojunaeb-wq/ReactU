const person = {
  name: 'Tony',
  age: 45,
  key: 'Ironman',
};
const {name:ironmanName, age:edad, key}= person
console.log({ironmanName, edad, key});

interface Hero {
  name: string;
  age: number;
  key: string;
  rank?: string;
}

const useContext = ({key, name, age, rank='sin rango' }: Hero) => {

    return{
        keyName: key,
        user: {
            name,
            age,
        },
    rank: rank,
    } 
}
//const context = useContext(person)
const {rank, keyName, user:{name, age}} = useContext(person);


console.log({rank, name, age, keyName})
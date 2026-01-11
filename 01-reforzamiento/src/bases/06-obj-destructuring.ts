const person = {
    name: 'Tony',
    age: 45,
    key: 'Ironman',
};
const {name, age, key}= person
console.log({name, age, key});

interface Hero{
    name : string;
    age: string;
    key: string;
    rank?: string;
}

const setContext = ({key, name, age, rank }: Hero) => {

    return{
        keyname: key,
        user: {
            name,
            age,
        },
    rank: rank,
    } 
}
console.log({setContext})
function greet(name:string):string{
    return `Hola ${name}`;
}

// const greet2= (name:string):string => {
//     return `Hola ${name}`;
// }

const greet2= (name:string):string => `Hola ${name}`;

const message = greet('Goku');
const message2 = greet2('Vegeta')

console.log(message, message2);

function getUser(){
    return{
        uid: 'ABC-123',
        username: 'El papi23',
    };
}

const getUser2 = () =>{
    return{
        uid: 'ABC-123',
        username: 'El papi23',  
    }
}


const user = getUser();
const user2 = getUser();

console.log(user, user2)

const myNumbers: number[] = [1,2,3,4,5];

myNumbers.forEach(function(value){
    console.log({value});
})

myNumbers.forEach((value)=>{
    console.log({value});
})

myNumbers.forEach(console.log);
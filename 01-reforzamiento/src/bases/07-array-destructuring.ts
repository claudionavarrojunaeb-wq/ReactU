const characterNames =['Goku', 'Vegeta', 'Trunks'];
const [,,p3] = characterNames;
console.log({p3});

const returnsArrayFn = () =>{
    return ['ABC', 123] as const;

};
const[letters, numbers] = returnsArrayFn();
console.log({letters, numbers})

const useState = (nombre: string) => {
    return[
        nombre, 
        (value: string)=>{
            console.log(value)
        }
    ] as const
}

const [name, setName] = useState('Goku');
console.log(name);       // Goku
setName('Vegeta');       // Imprime "Vegeta"
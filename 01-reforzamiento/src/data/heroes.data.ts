export interface Hero{
  id:number;
  name: string;
  owner: Owner;
}
//type Owner = 'DC' | 'Marvel';
enum Owner{ //This syntax is not allowed when 'erasableSyntaxOnly' is enabled.ts(1294) -> tsconfig->  "erasableSyntaxOnly": false,
  DC = 'DC', //0
  Marvel = 'Marvel', //1
}

export const heroes: Hero[] = [
  {
    id: 1,
    name: 'Batman',
    owner: Owner.DC,
  },
  {
    id: 2,
    name: 'Spiderman',
    owner: Owner.Marvel,
  },
  {
    id: 3,
    name: 'Superman',
    owner: Owner.DC,
  },
  {
    id: 4,
    name: 'Flash',
    owner: Owner.DC,
  },
  {
    id: 5,
    name: 'Wolverine',
    owner: Owner.Marvel,
  },
];
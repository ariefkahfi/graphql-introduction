const {
    graphql,
    buildSchema
} = require('graphql')


let initialPersonArr = [
    {name: 'aa1',address:'address1'},
    {name: 'aa2',address:'address2'},
    {name: 'aa3',address:'address3'},
    {name: 'aa4',address:'address4'},
    {name: 'aa5',address:'address5'},
];

let carWithWheels = [
    {
        carType:'car11',
        wheelType: {
            wheelName: 'wheel1',
            wheelPrice: 244.4
        }
    },
    {
        carType:'car12',
        wheelType: {
            wheelName: 'wheel1',
            wheelPrice: 244.4
        }
    },
    {
        carType:'car13',
        wheelType: {
            wheelName: 'wheel2',
            wheelPrice: 144.4
        }
    }
]

const firstSchema = buildSchema(`
    type Query {
        findPersonFirstIndex(name: String!): Person
        allPerson: [Person]
        carWithWheel: [Car]
        carsByWheelName(name: String!): [Car]
    }

    type Person {
        name: String!
        address: String!
    }

    type Car {
        carType: String!
        wheelType: Wheel!
    }

    type Wheel {
        wheelName: String!
        wheelPrice: Float!
    }
`)



let rootValue = {
    allPerson: ()=> {
        return initialPersonArr
    },
    carWithWheel: ()=> {
        return carWithWheels
    },
    carsByWheelName: (obj , args , ctx, info)=>{ 
        
    },
    findPersonFirstIndex: (obj , args , ctx , info)=> {
        const result = initialPersonArr
            .filter((f)=> (
                f.name === obj.name
            ))
        return result[0]
    }
}


const introspectSchemaQuery = `
    {
        __schema {
            types {
                name
            }
        }
    }
`

const findPersonQuery = `
    {
        findPersonFirstIndex(name: "aa8") {
            name
            address
        }
    }
`;
const allPersonOnlyAddressQuery = `
    {
        allPerson {
            address
        }
    }
`;


graphql(firstSchema , findPersonQuery , rootValue)
    .then(v=>{ 
        console.log(JSON.stringify(v))
    })
    .then(_=>{
        return graphql(firstSchema , allPersonOnlyAddressQuery , rootValue)
    })
    .then(r=>{
        console.log(JSON.stringify(r))
    })
    .catch(err=>{
        console.error(err)
    })



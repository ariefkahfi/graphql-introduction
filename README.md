# GraphQL - Introduction

####
Learn how to build schema

There are many ways to define schema in graphql

1. We can build schema using `buildSchema(...)` function like this

```
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
```

2. You can build schema using 
class provided by library

```
const personType = new GraphQLObjectType({
    name:'person',
    fields:{
        name:{
            type: GraphQLString
        },
        age:{
            type:GraphQLInt 
        }
    }
})

const rootQuery = new GraphQLObjectType({
    name:'Root',
    fields:{
        personOnlyName: {
           type:new GraphQLList(personType) ,
           resolve: (src, args , ctx , info)=> {
               console.log(src,args,ctx, info)
               return null;
           }
        },
        allPerson: {
            type:new GraphQLList(personType),
            resolve:(src,args,ctx,info)=>{
                return initialPersonArr
            }
        }
    }
})

const ourSchema = new GraphQLSchema({
    query:rootQuery
})
```
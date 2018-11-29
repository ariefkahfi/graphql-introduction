const {
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    graphql
} = require('graphql')

let initialPersonArr = [
    {name: 'aa1',age:13},
    {name: 'aa2',age:24},
    {name: 'aa3',age:31},
    {name: 'aa4',age:41},
    {name: 'aa5',age:52},
];



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


const introspectSchemaQuery = `
    {
        __schema {
            types {
                name
            }
        }
    }
`

const allpersonQuery =  `
{
    allPerson {
        name
        age
    }
}
`

graphql(ourSchema ,introspectSchemaQuery)
    .then(r=>{
        console.log(JSON.stringify(r))
    })
    .catch(err=>{
        console.error(err)
    })
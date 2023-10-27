// const { projects, clients } = require('../sampleData');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, } = require('graphql');
const Client = require('../models/Client');
const Project = require('../models/Project');

//client type 
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    })
});

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        //add field that make a join to client data
        client: {
            type: ClientType,
            resolve(parent, args) {
                return Client.find( parent.clientId);
            }
        }
    })
});

//to get data you need to create a query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        //do you want to get a list of projects 
        projects: {
            type: new GraphQLList(ProjectType),
            //create a list of projects on respose 
            resolve(parent, args) {
                //get all projects from mongodb
                return Project.find();
            }
        },
        //do you want to get a project with id
        project: {
            type: ProjectType,
            //input arguments into query
            args: { id: { type: GraphQLID } },
            //create a project on respose 
            resolve(parent, args) {
                //get project form mongodb
                return Project.findById(args.id);
            }
        },
        //do you want to get a list os clients 
        clients: {
            type: new GraphQLList(ClientType),
            //create a list of clients on respose 
            resolve(parent, args) {
                //get clients form mongodb
                return Client.find();
            }
        },
        //do you want to get a client with id
        client: {
            type: ClientType,
            //input arguments into query
            args: { id: { type: GraphQLID } },
            //create a client on respose 
            resolve(parent, args) {
                //get client form mongodb
                return Client.findById( args.id);
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addClient: {
            type: ClientType,
            args: {
                //to create non null
                name: { type:new GraphQLNonNull(GraphQLString) },
                email: { type:new  GraphQLNonNull(GraphQLString) },
                phone: { type:new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                //create a client object and save on mongodb
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                });
                return client.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
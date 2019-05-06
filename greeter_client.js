let PROTO_PATH = __dirname +'/helloworld.proto';
let grpc = require('grpc');
let protoLoader = require('@grpc/proto-loader');
let packageDefination = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
);

let hello_proto = grpc.loadPackageDefinition(packageDefination).helloworld;

function main() {
    let client = new hello_proto.Greeter('localhost:50051',
    grpc.credentials.createInsecure());
        
    let user;
    if(process && process.args && process.args.length >= 3) {
        user = process.argv[2];
    } else {
        user = 'world';
    }

    client.sayBye({name: user}, (err, response) => {
        console.log('GoodBye:', response.message);
    });

    client.sayHello({name: user}, (err, response) => {
        console.log('Greetings:', response.message);
    });

    // console.log('client --- ', client);
}

main();
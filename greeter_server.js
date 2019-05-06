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

function sayHello(call, callback) {
    callback(null, {message: 'Hello '+call.request.name});
}

function sayBye(call, callback) {
    callback(null, {message: 'Bye '+call.request.name});
}

function main() {
    let server = new grpc.Server();
    server.addService(hello_proto.Greeter.service, {sayHello: sayHello,sayBye: sayBye});
    // server.addService(hello_proto.Greeter.service, {sayBye: sayBye});
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();
}

main();
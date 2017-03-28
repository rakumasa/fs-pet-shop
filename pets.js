// console.log("Usage: node pets.js [read | create | update | destroy]");

var fs = require('fs'); //access to database(object)
var path = require('path'); //path to database(object)

var node = path.basename(process.argv[0]); //first argument
var file = path.basename(process.argv[1]); //second argument
var cmd = process.argv[2]; //third argument
var petsPath = path.join(__dirname, 'pets.json'); //complete path to database

if(cmd == 'create'){ //if cmd is create
  fs.readFile(petsPath, 'utf8', function(err, data){ //access to database
    var age = +process.argv[3]; // variable for new value of age + is parseInt
    var kind = process.argv[4]; // variable for new value of kind
    var name = process.argv[5]; // variable for new value of name

    if(process.argv[5]){ //if there is no input for argument 3,4,5
      //place holder for new input
      var obj = {
        age: age,
        kind: kind,
        name: name
      }
      fs.readFile(petsPath, 'utf8', function(err,data){ //access to database
        if(err){
          throw err; //if not access to data throw error
        }
        data = JSON.parse(data); //if success to access to data, parse data and make it readable
        data.push(obj); //push new obj to existing data
        data = JSON.stringify(data); //rewrite the new data to string

        fs.writeFile(petsPath, data, function(writeErr){ //data is new data and appending the new data to exisiting data
          if(writeErr){
            throw writeErr;
          }
          console.log(data); //check new data
        });
      });
    }else{
        console.error(`Usage: ${node} ${file} create AGE KIND NAME`); //if not give a message to how to type the code
        process.exit(1);
      }
    });
  } else if(cmd == 'read'){ //if cmd is 'read'
    var index = process.argv[3]; //argument of index number read 0/1/2
    fs.readFile(petsPath, 'utf8', function(err,data) { //access to database
      if(err){
        throw err;
      }
      data = JSON.parse(data);
        if(!data[index]){
          //if index# of data
          console.log(data);
        } else if(data[index]) {
            console.log(data[index]);
          } else {
          console.error(`Usage: ${node} ${file} read INDEX`);
          process.exit(1);
        }
    });
  } else {
    console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
    process.exit(1);
}

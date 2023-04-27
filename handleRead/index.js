const dynamoose = require('dynamoose');

const personSchema = new dynamoose.Schema({
  id: String,
  name: String, 
  age: String, 
  height: String,
});

const PersonModel = dynamoose.model('People', personSchema);

exports.handler = async(event) =>{
  console.log('EVENT ', event);
  let person = JSON.parse(event.body);
  console.log('READING PERSON', person);
  let returnPerson;
  
  try{
    returnPerson = await PersonModel.create(person);
  }
  catch(e){
    console.error('ERROR: ', e);
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify(`HELLO FROM NEW PERSON, ${JSON.stringify(returnPerson)}`),
};
  return response;

}
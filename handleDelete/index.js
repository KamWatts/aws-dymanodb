const dynamoose = require('dynamoose');

const personSchema = new dynamoose.Schema({
  name: String,
  age: String,
  height: String
})

const PersonModel = dynamoose.model('People', personSchema);
exports.handler = async (event) => {
  console.log('DELETE person EVENT OBJECT: ', event);

  let parameters = event.pathParameters;
  let responseBody = null;

  if (parameters) {
    console.log('REQUEST PATH PARAMS: ', parameters);
    responseBody = await PersonModel.scan('id').eq(parameters['id']).exec();
  } else {
    responseBody = await PersonModel.scan().exec();
  }
  console.log('person FROM OUR TABLE: ', responseBody);
  const response = {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  };
  return response
}
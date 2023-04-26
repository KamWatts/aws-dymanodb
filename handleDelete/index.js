const dynamoose = require('dynamoose');

const personSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
  },
  name: String,
  age: String,
  height: String,
});

const PersonModel = dynamoose.model('People', personSchema);

exports.handler = async (event) => {
  console.log('DELETE person EVENT OBJECT: ', event);

  let parameters = event.pathParameters;
  let responseBody = null;

  if (event.httpMethod === 'DELETE' && parameters && parameters['id']) {
    console.log('DELETE REQUEST PATH PARAMS: ', parameters);
    await PersonModel.delete(parameters['id']);
    responseBody = { message: 'Item deleted successfully' };
  } else {
    responseBody = await PersonModel.scan().exec();
  }

  console.log('PERSONS FROM OUR TABLE: ', responseBody);

  const response = {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  };
  return response;
};


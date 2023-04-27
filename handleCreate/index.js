const dynamoose = require ('dynamoose');

const schema = new dynamoose.Schema ({
  "id": String,
  "name": String,
  "age": String,
  "height": String
});

const peopleModel = dynamoose.model ('People', schema);

exports.handler = async event => {
  let parsedBody = JSON.parse (event.body);

  console.log (parsedBody);

  const response = {statusCode: null, body: null};

  try {
    let newPeople = await peopleModel.create (parsedBody);
    response.body = JSON.stringify (newPeople);
    response.statusCode = 200;
  } catch (e) {
    response.body = JSON.stringify (e.message);
    response.statusCode = 500;
  }

  return response;
};
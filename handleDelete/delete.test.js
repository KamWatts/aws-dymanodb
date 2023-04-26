'use strict'

const AWS = require('aws-sdk');
const handleDelete = require('./index');
const supertest = require('./supertest');

describe('DELETE /person/:id', () =>  {
  
    let personID;

    beforeAll(async () => {

    const params = {
      TableName: 'person',

      Item: {
      id: { String: '1234' } ,
      name: { String: 'John Doe' },
      age: { String: '20' },
      height: { String: '72in'} ,
      },
    };
    await handleDelete.deleteItem(params);
    personId = params.Item.id.String;
  });

  afterAll( async () => {
    const params = {
      TableName: 'Person',
      Key: { id: { String: personId} },
    }
    await handleDelete.deleteItem(params)
  });

  Test('Should delete person from database', async () => {
    const response = await request(handleDelete).delete(`/person${personId}`);

    expect(response.statusCode).toBe(204);

    const params = {
      TableName: 'Person',
      Key: { id: { String: personId} },
    };
    const data = await handleDelete.getItem(params);
    expect(data.Item).toBeNull
    })
  }) 
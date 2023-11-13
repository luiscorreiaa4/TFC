import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import UserModel from '../database/models/user.model';

chai.use(chaiHttp);
const { expect, request } = chai;

describe('[User]', () => {
  beforeEach(() => {
    sinon.restore();
  });
  const userData = {
    id: 1,
    username: 'User',
    role: 'user',
    email: '@user.com',
    password: 'Flln&FerYsmn8jIngdXyRDR2mlhrqTlOu2sadrFIOFJSdsafd', 
  };

  const validData = {
    email: 'valid@mail.com',
    password: 'valid_password',
  };

  const invalidData = {
    email: 'CR7SII',
    password: 'SIIUU',
  }

  const emptyData = {
    email: '',
    password: '',
  };

  it('[Users] deve retornar um erro quando é fornecido um email inválido', async () => {
    sinon.stub(UserModel, 'findOne').resolves(null);
    const result = await request(app).post('/login').send(validData);
    expect(result).to.have.status(401);
    expect(result.body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('[Users] deve retornar um erro quando o email não é fornecido', async () => {
    const result = await request(app).post('/login').send({email: emptyData.email, password: validData.password});
    expect(result).to.have.status(400);
    expect(result.body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('[Users] deve retornar um erro quando fornecido um email inválido', async () => {
    const result = await request(app).post('/login').send({email: invalidData.email, password: validData.password});
    expect(result).to.have.status(401);
    expect(result.body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('[Users] deve retornar um erro quando fornecido uma senha inválida', async () => {
    const mock =  UserModel.build(userData); 
    sinon.stub(UserModel, 'findOne').resolves(mock);
    sinon.stub(bcrypt, 'compareSync').returns(false);
    const result = await request(app).post('/login').send(validData);
    expect(result).to.have.status(401);
    expect(result.body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('[Users] deve retornar um token com sucesso', async () => {
    const mock =  UserModel.build(userData);
    sinon.stub(UserModel, 'findOne').resolves(mock);
    sinon.stub(bcrypt, 'compareSync').returns(true);
    sinon.stub(jwt, 'sign').returns('any_token' as any);
    const result = await request(app).post('/login').send(validData);
    expect(result).to.have.status(200);
    expect(result.body).to.deep.equal({ token: 'any_token' });
  });

  it('[Users] deve retornar um erro se um token nao for fornecido', async () => {
    const result = await request(app).get('/login/role');
    expect(result).to.have.status(401);
    expect(result.body).to.deep.equal({ message: 'Token not found' });
  });

  it('[Users] deve retornar um erro quando fornecido um token inválido', async () => {
    const result = await request(app)
      .get('/login/role')
      .set('Authorization', 'Bearer any_token');
    sinon.stub(jwt, 'verify').throws(new Error());
    expect(result).to.have.status(401);
    expect(result.body).to.deep.equal({ message: 'Token must be a valid token' });
  });

  it('[Users] deve retornar um erro quando o usuario não é encontrado', async () => {
    sinon.stub(jwt, 'verify').returns({ email: validData.email } as any);
    sinon.stub(UserModel, 'findByPk').resolves(null);
    const result = await request(app)
      .get('/login/role')
      .set('Authorization', 'Bearer any_token');
    expect(result).to.have.status(404);
    expect(result.body).to.deep.equal({ message: 'User not found' });
  });
  
  // it('[USER] deve retornar a role do user com sucesso', async () => {
  //   sinon.stub(jwt, 'sign').returns('any_token' as any);
  //   const mock = UserModel.build(userData)
  //   sinon.stub(UserModel, 'findByPk').resolves(mock);
  //   const result = await request(app)
  //     .get('/login/role')
  //     .set('Authorization', 'Bearer any_token');
  //   console.log(result.body);
  //   expect(result).to.have.status(200);
  //   expect(result.body).to.deep.equal({ role: 'user' });
  // });
});
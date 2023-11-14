import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import UserModel from '../database/models/user.model';
import MatchModel from '../database/models/match.model';
import TeamModel from '../database/models/team.model';

chai.use(chaiHttp);
const { expect, request } = chai;

describe('[Match]', () => {
  beforeEach(() => {
    sinon.restore();
    sinon.stub(jwt, 'verify').returns({ id: 1 } as any);
    sinon.stub(UserModel, 'findByPk').returns({ id: 1 } as any);
  });
  const mockCDBFirstGame = {
    id: 1,
    homeTeamId: 7,
    awayTeamId: 16,
    homeTeamGoals: 0,
    awayTeamGoals: 1,
    inProgress: false,
  };
  
  const mockCDBSecondGame = {
    id: 2,
    homeTeamId: 7,
    awayTeamId: 14,
    homeTeamGoals: 1,
    awayTeamGoals: 1,
    inProgress: true,
  };

  const CDBFinal = [mockCDBFirstGame, mockCDBSecondGame];

  it('[Matches] deve retornar todas as partidas com sucesso', async () => {
    const mock = MatchModel.bulkBuild(CDBFinal);
    sinon.stub(MatchModel, 'findAll').returns(mock as any);
    const result = await request(app).get('/matches');
    expect(result).to.have.status(200);
    expect(result.body).to.deep.equal(CDBFinal);
  });

  it('[Matches] deve retornar todas as partidas finalizadas com sucesso', async () => {
    const mock = MatchModel.bulkBuild(CDBFinal);
    sinon.stub(MatchModel, 'findAll').returns(mock as any);
    const result = await request(app).get('/matches?inProgress=false');
    expect(result).to.have.status(200);
    expect(result.body).to.deep.equal([CDBFinal[0]]);
  });

  it('[Matches] deve retornar todas as partidas em andamento com sucesso', async () => {
    const mock = MatchModel.bulkBuild(CDBFinal);
    sinon.stub(MatchModel, 'findAll').returns(mock as any);
    const result = await request(app).get('/matches?inProgress=true');
    expect(result).to.have.status(200);
    expect(result.body).to.deep.equal([CDBFinal[1]]);
  });

  it('[Match] deve finalizar a partida com sucesso', async () => {
    const mock = MatchModel.build(CDBFinal[0]); 
    sinon.stub(MatchModel, 'findByPk').returns(mock as any);
    const result = await request(app)
      .patch('/matches/1/finish')
      .set('Authorization', 'Bearer any_token');
    expect(result).to.have.status(200);
    expect(result.body).to.deep.equal({ message: 'finished' });
  });

  it('[Match] deve atualizar a partida com sucesso', async () => {
    const mock = MatchModel.build(CDBFinal[1]); 
    sinon.stub(MatchModel, 'findByPk').returns(mock as any);
    const result = await request(app)
      .patch('/matches/1/finish')
      .send({ homeTeamGoals: 3, awayTeamGoals: 1 })
      .set('Authorization', 'Bearer any_token');
    expect(result).to.have.status(200);
  });

  it('[Match] deve criar uma partida com sucesso', async () => {
    const mock = MatchModel.build(CDBFinal[1]); 
    sinon.stub(MatchModel, 'create').returns(mock as any);

    const dataTeam = [{ id: 7 }, { id: 16 }] as any;
    const mockTeam = MatchModel.bulkBuild(dataTeam); 
    sinon.stub(TeamModel, 'findAll').returns(mockTeam as any);
    const result = await request(app)
      .post('/matches')
      .send(CDBFinal[1])
      .set('Authorization', 'Bearer any_token');
    expect(result).to.have.status(201);
    expect(result.body).to.deep.equal(CDBFinal[1]);
  });

  it('[Match] deve falhar se a partida não for encontrada', async () => {
    sinon.stub(MatchModel, 'findByPk').returns(null as any);
    const result = await request(app)
      .patch('/matches/1')
      .set('Authorization', 'Bearer any_token');
    expect(result).to.have.status(404);
    expect(result.body).to.deep.equal({ message: 'match not found' });
  });

  it('[Match] deve falhar caso a partida ja tenha finalizado', async () => {
    const mock = MatchModel.build(CDBFinal[0]); 
    sinon.stub(MatchModel, 'findByPk').returns(mock as any);
    const result = await request(app)
      .patch('/matches/1')
      .set('Authorization', 'Bearer any_token');
    expect(result).to.have.status(404);
    expect(result.body).to.deep.equal({ message: 'Match already finished' });
  });

  it('[Match] deve falhar ao tentar criar uma partida com dois times iguais', async () => {
    const result = await request(app)
      .post('/matches')
      .send({ homeTeamId: 1, awayTeamId: 1 })
      .set('Authorization', 'Bearer any_token');
    expect(result).to.have.status(422);
    expect(result.body).to.deep.equal({
      message: 'It is not possible to create a match with two equal teams',
    });
  });

});
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/team.model';

chai.use(chaiHttp);
const { expect, request } = chai;
const teamData = { id: 1, teamName: 'CSA' };

describe('[Teams]', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('[Teams] Deve retornar todos os times com sucesso', async () => {
    const mock = TeamModel.build(teamData);
    sinon.stub(TeamModel, 'findAll').resolves([mock]);
    const result = await request(app).get('/teams');
    expect(result).to.have.status(200);
    expect(result.body).to.deep.equal([teamData]);
  });
  it('[Teams] Deve retornar mensagem de erro quando o time não existe', async () => {
    sinon.stub(TeamModel, 'findByPk').resolves(null);
    const result = await request(app).get('/teams/1');
    expect(result).to.have.status(404);
    expect(result.body).to.deep.equal({ message: 'There is no team with such id!' });
  });
  it('[Teams] Deve retornar um time específico com sucesso', async () => {
    const mock = TeamModel.build(teamData);
    sinon.stub(TeamModel, 'findByPk').resolves(mock);
    const result = await request(app).get('/teams/1');
    expect(result).to.have.status(200);
    expect(result.body).to.deep.equal(teamData);
  });
});
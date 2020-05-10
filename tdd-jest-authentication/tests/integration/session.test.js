//Biblioteca responsavél por lidar com requisições http
//Ela é mais indica do que o axios para teste
//Importantante ele é usada para teste, não para produção ou desenvolvimento
//O axios é melhor para produção e desenvolvimento
const request = require('supertest')

const app = require('../../src/app')
const truncate = require('../utils/truncate')
const factory = require('../factories')

describe('Authentication', () => {
  //Executa antes de cada teste
  //chamando a function truncate para limpar os dados anteriores
  // temos tbm beforeAll, afterEach, afterAll
  beforeEach(async () => {
    await truncate()
  })

  it('should authenticate with valid credentials', async () => {
    const user = await factory.create('User', {
      password: '1234',
    })

    const response = await request(app).post('/sessions').send({
      email: user.email,
      password: '1234',
    })
    //a function expect e basicamente passado o retorno esperado apos a conclusão
    expect(response.status).toBe(200)
  })

  it('should not authenticate with invalid credentials', async () => {
    const user = await factory.create('User', {
      password: '1234',
    })

    const response = await request(app).post('/sessions').send({
      email: user.email,
      password: '12345',
    })

    expect(response.status).toBe(401)
  })

  it('should return jwt token when authenticated', async () => {
    const user = await factory.create('User', {
      password: '1234',
    })

    const response = await request(app).post('/sessions').send({
      email: user.email,
      password: '1234',
    })

    expect(response.body).toHaveProperty('token')
  })

  it('should be able to access private routes when authenticated', async () => {
    const user = await factory.create('User', {
      password: '1234',
    })

    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer ${user.generateToken()}`)

    expect(response.status).toBe(200)
  })

  it('should not be able to access private routes without jwt token', async () => {
    const response = await request(app).get('/dashboard')

    expect(response.status).toBe(401)
  })

  it('should not be able to access private routes with invalid jwt token', async () => {
    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer 16513gFFGJH`)

    expect(response.status).toBe(401)
  })
})

//a function describe representa uma categoria de teste;
//por exemplo esses teste dentro dessa decribe é destinado a autenticação.
//e dentro dela temos os teste a serem realizados.

//Nome da function "it" pode ser dado qualquer nome
//parametro 'nome do teste' geralmente deve ser bem descritivo
//deixando claro o objetivo do mesmo
// it('should receive JWT token when authenticated with valid credentials', () =>{

// })

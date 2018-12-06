const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')

chai.should()
chai.use(chaiHttp)

const endpointToTest = '/api/register'

describe('Registration', () => {
    it('should return a token when providing valid information', (done) => {
        chai.request(server)
            .post(endpointToTest)
            .send({
                'firstname': 'FirstName',
                'lastname': 'LastName',
                'email': 'test@test28.com',
                'password': 'secret'
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');

                const response = res.body;

                response.should.have.property('token').which.is.a('string');
                response.should.have.property('message').which.is.a('string');

                const validToken = res.body.token;

                module.exports = {
                    token: validToken
                }

                done();
            })
    })
});
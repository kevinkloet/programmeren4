const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')

chai.should()
chai.use(chaiHttp)

const endpointToTest = '/api/login'

describe('Person API POST', () => {
    it('should return a valid person when posting a valid object', (done) => {
        const token = require('./authentication.controller.test').token;
        chai.request(server)
            .post(endpointToTest)
            .set('x-access-token', token)
            .send({
                'firstname': 'FirstName',
                'lastname': 'LastName',
                'email': 'test@test.com',
                'password': 'secret'
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            })

        done();
    })

})
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('./server')

chai.should()
chai.use(chaiHttp)

const endpointToTest = '/api/games'

describe('Games API POST', () => {
    it('should return a valid game when posting a valid object', (done) => {

        chai.request(server)
            .post(endpointToTest)
            .send({
                'name': '  somename  ',
                'producer': '  someproducer   ',
                'year': 2020,
                'type': ' sometype '
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const Games = res.body
                Games.should.have.property('name').that.is.an('object')

                const name = Games.name
                name.should.have.property('firstname').equals('FirstName')
                name.should.have.property('lastname').equals('LastName')
                Games.should.have.property('email').equals('user@host.com')
                Games.should.not.have.property('password')
                done()
            })
    })

    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .post(endpointToTest)
            .set('x-access-token', 'in.valid.token')
            .send({
                'firstname': '  FirstName  ',
                'lastname': '  LastName   ',
                'email': ' user@host.com ',
                'password': ' secret '
            })
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.a('object')
                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(401)
                error.should.have.property('datetime')
                done()
            })
    })

    it('should throw an error when no firstname is provided', (done) => {
        const token = require('./authentication.test').token
        chai.request(server)
            .post(endpointToTest)
            .set('x-access-token', token)
            .send({
                'lastname': '  LastName   ',
                'email': ' user@host.com ',
                'password': ' secret '
            })
            .end((err, res) => {
                res.should.have.status(422)
                res.body.should.be.a('object')

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(422)
                error.should.have.property('datetime')

                done()
            })
    })

    it.skip('should throw an error when no valid firstname is provided', (done) => {
        // Write your test here
        done()
    })

    it.skip('should throw an error when no lastname is provided', (done) => {
        // Write your test here
        done()
    })

    it.skip('should throw an error when no valid lastname is provided', (done) => {
        // Write your test here
        done()
    })

})

describe('Games API GET', () => {
    it('should return an array of Games', (done) => {
        chai.request(server)
            .get(endpointToTest)
            .end(function (err, res) {
                // Check the response
                res.body.should.be.a('array')
                res.body[0].should.have.property('id').which.is.a('number')
                res.body[0].should.have.property('name').which.is.a('string')
                res.body[0].should.have.property('producer').which.is.a('string')
                res.body[0].should.have.property('year').which.is.a('number')
                res.body[0].should.have.property('type').which.is.a('string')
                expect(err).to.be.null
                expect(res).to.have.status(200)
                if (err != null) {
                    assert(false, err)
                }
                assert(true)
                done()
            })
    })
    it('should return the game with the :id', (done) => {
        chai.request(server)
            .get(endpointToTest + '/0')
            .end(function (err, res) {
                //Check the request
                res.body.should.be.a('object')
                res.body.should.have.property('id').which.is.a('number').which.eql(0)
                res.body.should.have.property('name').which.is.a('string')
                res.body.should.have.property('producer').which.is.a('string')
                res.body.should.have.property('year').which.is.a('number')
                res.body.should.have.property('type').which.is.a('string')
                expect(err).to.be.null
                expect(res).to.have.status(200)
                if (err != null) {
                    assert(false, err)
                }
                assert(true)
                done();
            })
    })

})

describe('Games API PUT', () => {
    it('should return the updated Games when providing valid input', (done) => {
        const token = require('./authentication.test').token
        // console.log('token = ' + token)
        chai.request(server)
            .put(endpointToTest + '/0')
            .set('x-access-token', token)
            .send({
                'firstname': '  NewFirstName  ',
                'lastname': '  NewLastName   ',
                'email': ' user@host.com ',
                'password': ' secret '
            })
            .end((err, res) => {
                // Check: 
                // Verify that the Games that we get is the updated Games.
                res.should.have.status(200)
                res.body.should.be.a('object')

                const response = res.body
                response.should.have.property('name').which.is.an('object')
                const name = response.name
                name.should.have.property('firstname').equals('NewFirstName')
                name.should.have.property('lastname').equals('NewLastName')

                // Double check:
                // Send a GET-request to verify that the Games has been updated.
                chai.request(server)
                    .get('/api/Gamess')
                    .set('x-access-token', token)
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.an('array')
                        const result = res.body
                        result[0].name.should.have.property('firstname').equals('NewFirstName')
                        result[0].name.should.have.property('lastname').equals('NewLastName')

                        done()
                    })
            })
    })
})

describe('Games API DELETE', () => {
    var gametest = new game(100, 'DeleteTest', 'DeleteCompany', 2018, 'RPG')
    it.skip('should return http 200 when deleting a Games with existing id', (done) => {
        chai.request(server)
            .post(endpointToTest)
            .send(gametest)
            .end((err, res) => {
                // Check properties of object in the request
                gametest.name.should.be.a('string')
                gametest.producer.should.be.a('string')
                gametest.year.should.be.a('number')
                gametest.type.should.be.a('string')

                // Check the response
                res.body.should.be.a('object')
                res.body.should.have.property('name').eql(gametest.name).which.is.a('string').to.have.lengthOf(gametest.name.length)
                res.body.should.have.property('producer').eql(gametest.producer).which.is.a('string').to.have.lengthOf(gametest.producer.length)
                res.body.should.have.property('year').eql(gametest.year).which.is.a('number')
                res.body.should.have.property('type').eql(gametest.type).which.is.a('string').to.have.lengthOf(gametest.type.length)

                // Check if post was a succes
                expect(res).to.have.status(200)
                expect(err).to.be.null

                // Delete the one we just added
                chai.request(server).del(endpointToTest + "/100").end(err, res, next => {
                    expect(res).to.have.status(200)
                    response.should.be.a('object')
                    res.body.should.have.property('name').eql(gametest.name).which.is.a('string').to.have.lengthOf(gametest.name.length)
                    res.body.should.have.property('producer').eql(gametest.producer).which.is.a('string').to.have.lengthOf(gametest.producer.length)
                    res.body.should.have.property('year').eql(gametest.year).which.is.a('number')
                    res.body.should.have.property('type').eql(gametest.type).which.is.a('string').to.have.lengthOf(gametest.type.length)
                    next
                })
                if (err != null) {
                    assert(false, err)
                } else {
                    assert(true, 'De game is verwijderd')
                }
                done()
            })
    })
})
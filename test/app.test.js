const app = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
chai.use(chaiHttp);
var id;
var idlist= [];

var userCreds = {
    "username": "edzel", "password": "1234"
}

var authenticatedUser = chai.request.agent(app)

before((done)=>{
    chai.request(app).post('/api/user/register').send(userCreds).end(
        (err, res)=>{
            expect(res).to.have.status(200);
                expect(res.body.status).to.equals("success");
                done();
        }
    )
});

beforeEach((done)=>{
    authenticatedUser.post('/api/user/login').set("Connection", "keep-alive").send(userCreds).end((err, res)=>{
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("success");
        done();
    })
})

describe("App Test", () => {
    it("Health-check", done => {
        authenticatedUser.get('/api/health-check').
            end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.status).to.equals("alive");
                done();
            });
    });

    it("Add ToDo", done => {
        authenticatedUser.post("/api/todo/add").send({
            "title": "Test title", 
            "todo": "Test todo body"
        }).end((err, res)=>{
            id = res.body.result._id;
            expect(res).to.have.status(200);
            expect(res.body.status).to.equals("success");
            expect(res.body.result.title).to.equals("Test title");
            expect(res.body.result.todo).to.equals("Test todo body");
            expect(res.body.result.done).to.equals(false);
            done();
        })
    })
    it("Add ToDo 2", done => {
        authenticatedUser.post("/api/todo/add").send({
            "title": "Test title", 
            "todo": "Test todo body"
        }).end((err, res)=>{
            idlist.push(res.body.result._id);
            expect(res).to.have.status(200);
            expect(res.body.status).to.equals("success");
            expect(res.body.result.title).to.equals("Test title");
            expect(res.body.result.todo).to.equals("Test todo body");
            expect(res.body.result.done).to.equals(false);
            done();
        })
    });
    it("Get ToDo", done =>{
        authenticatedUser.get("/api/todo/show").query({
            pageSize: 1, 
            pageSize: 50
        }).end((err, res)=>{
            expect(res).to.have.status(200);
            expect(res.body.result.data[0].title).to.equals("Test title");
            expect(res.body.result.data[0].todo).to.equals("Test todo body");
            done();
        });
    });
    it("Get Specific todo", done=>{
        authenticatedUser.get("/api/todo/show").query({
            id: id
        }).end((err, res)=>{
            expect(res).to.have.status(200);
            expect(res.body.result.data[0].title).to.equals("Test title");
            expect(res.body.result.data[0].todo).to.equals("Test todo body");
            done();
        })
    }), 
    it("Update todo", done=>{
        authenticatedUser.put("/api/todo/update").send({
            id: id, 
            done: true
        }).end((err, res)=>{
            expect(res).to.have.status(200);
            expect(res.body.result.done).to.equals(true);
            done();
        })
    })
    it("Delete todo", done=>{
        authenticatedUser.delete("/api/todo/delete").send({
            "id": id
        }).end((err, res)=>{
            expect(res).to.have.status(200);
            expect(res.body.status).to.equals("success");
            done();
        });
    })
    it("Batch Delete", done =>{
        authenticatedUser.delete("/api/todo/batchDelete").send({
            "idList": idlist
        }).end((err, res)=>{
            expect(res).to.have.status(200);
            done();
        })
    })
    it("Logout", done => {
        authenticatedUser.get("/api/user/logout").end((err, res)=>{
            expect(res).to.have.status(200);
            expect(res.body.status).to.equals("success");
            done();
        })
    })
});
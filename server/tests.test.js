const request = require('supertest')
const app = require('./index')

describe("POST /api/auth/login", () => {

    describe("Login", () => {
        test("Fill the all fields to login", async () => {
            body = {
                email: "",
                password: ""
            }
            const response = await request(app).post("/api/auth/login").send(body)
            expect(response.statusCode).toBe(202)
        })
        test("Email or password is incorect", async () => {
            body = {
                email: "...",
                password: "..."
            }
            const response = await request(app).post("/api/auth/login").send(body)
            expect(response.statusCode).toBe(202)
        })
        test("Succes login", async () => {
            body = {
                email: "manager@gmail.com",
                password: "111"
            }
            const response = await request(app).post("/api/auth/login").send(body)
            expect(response.statusCode).toBe(200)
        })
    })

    describe("Logout", () => {
        test("You are logout", async () => {
            const response = await request(app).get("/api/auth/logout")
            expect(response.statusCode).toBe(200)
        })
    })

})

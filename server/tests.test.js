const request = require('supertest')
const app = require('./index')

describe("Authentification", () => {
    describe("POST /api/auth/login", () => {
        let body = {
            email: "",
            password: ""
        }
        test("Fill the all fields to login", async () => {
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

    describe("GET /api/auth/logout", () => {
        test("You are logout", async () => {
            const response = await request(app).get("/api/auth/logout")
            expect(response.statusCode).toBe(200)
        })
    })
})

describe("Statistique", () => {
    describe("GET /", () => {
        test("get statistique", async () => {
            const response = await request(app).get("/")
            expect(response.statusCode).toBe(200)
        })
    })
})

describe("Employees", () => {
    let body = {
        username: '',
        email: '',
        organisme: ''
    }
    describe("GET /employee", () => {
        test("get employes and organismes", async () => {
            const response = await request(app).get("/")
            expect(response.statusCode).toBe(200)
        })
    })
    describe("POST /add-employee", () => {
        test("Fill the all fields", async () => {
            const response = await request(app).post("/add-employee").send(body)
            expect(response.statusCode).toBe(202)
        })
    })
    describe("POST /delete-employee", () => {
        test("Employee not existed", async () => {
            const response = await request(app).delete("/delete-employee/00000")
            expect(response.statusCode).toBe(202)
        })
    })
})

describe("Organismes", () => {
    let body = {
        name: ''
    }
    describe("GET /organisme", () => {
        test("get organismes", async () => {
            const response = await request(app).get("/")
            expect(response.statusCode).toBe(200)
        })
    })
    describe("POST /add-organisme", () => {
        test("Fill the all fields", async () => {
            const response = await request(app).post("/add-organisme").send(body)
            expect(response.statusCode).toBe(202)
        })
    })
    describe("POST /update-organisme", () => {
        test("Organisme not existed", async () => {
            const response = await request(app).put("/update-organisme/00000")
            expect(response.statusCode).toBe(202)
        })
    })
    describe("POST /delete-organisme", () => {
        test("Organisme not existed", async () => {
            const response = await request(app).delete("/delete-organisme/00000")
            expect(response.statusCode).toBe(202)
        })
    })
})

describe("Formations", () => {
    describe("GET /formation", () => {
        test("get formations", async () => {
            const response = await request(app).get("/formation")
            expect(response.statusCode).toBe(200)
        })
    })
    describe("POST /add-formation", () => {
        let body = {
            name: '',
            dateDebut: '',
            dateFin: '',
            image: ''
        }
        test("Fill the all fields", async () => {
            const response = await request(app).post("/add-formation").send(body)
            expect(response.statusCode).toBe(202)
        })
        test("Formation not existed", async () => {
            const response = await request(app).put("/update-formation/00000")
            expect(response.statusCode).toBe(202)
        })
        test("Formation not existed", async () => {
            const response = await request(app).delete("/delete-formation/00000")
            expect(response.statusCode).toBe(202)
        })
    })
})

describe("Employees formation", () => {
    describe("GET /formation-employee", () => {
        test("get formation-employee and formations and employees", async () => {
            const response = await request(app).get("/formation")
            expect(response.statusCode).toBe(200)
        })
    })
    describe("POST /formation-to-employee", () => {
        let body = {
            formation: '',
            employee: ''
        }
        test("Fill the all fields", async () => {
            const response = await request(app).post("/add-formation").send(body)
            expect(response.statusCode).toBe(202)
        })
        test("Employe-formation not existed", async () => {
            const response = await request(app).delete("/delete-employe-formation/00000")
            expect(response.statusCode).toBe(202)
        })
    })
})
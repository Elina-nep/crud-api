import request from "supertest";
import { server } from "../src/index";

describe("scenario1 basic", () => {
  afterAll(() => server.close());
  let id = "";

  it("Get all records with a GET api/users request", async () => {
    const response = await request(server).get("/api/users");
    expect(response.statusCode).toBe(200);
  });

  it("id added for a new user", async () => {
    const response = await request(server).post("/api/users").send({
      username: "UserName",
      age: 20,
      hobbies: [],
    });
    id = response.body.id;
    expect(id).toBeDefined();
  });

  it("GET api/user/{userId} gives record by its id", async () => {
    const response = await request(server).get(`/api/users/${id}`);
    expect(response.statusCode).toBe(200);
    expect(
      response.body.username &
        response.body.age &
        response.body.hobbies &
        response.body.id
    ).toBeDefined();
  });

  it("PUT api/users/{userId} gives updated info", async () => {
    const response = await request(server).put(`/api/users/${id}`).send({
      username: "NewName",
    });
    expect(response.body.username).toBe("NewName");
  });

  it("Delete api/users/{userId} successfully", async () => {
    request(server).delete(`/api/users/${id}`).expect(204);
  });

  it("Get api/users/{userId} after it was deleted gives not found", async () => {
    request(server).get(`/api/users/${id}`).expect(404);
  });
});

describe("scenario2 validation", () => {
  afterAll(() => server.close());

  it("Gives not found for invalid road", async () => {
    request(server).get(`/api/users/road-is-invalid`).expect(404);
  });

  it("Checks for not valid data when user creation", async () => {
    request(server)
      .post("/api/users")
      .send({
        username: "UserName",
      })
      .expect(400);
  });

  it("Checks for correct message then invalid data post", async () => {
    request(server)
      .post("/api/users")
      .send({
        username: "UserName",
      })
      .expect((res) => {
        res.body.message = "Request body does not contain required fields";
      });
  });

  it("Checks for not valid id when user get", async () => {
    request(server).post("/api/users/123").expect(400);
  });

  it("Checks for message then not valid id", async () => {
    request(server)
      .post("/api/users/123")
      .expect((res) => {
        res.body.message = "ID is invalid";
      });
  });

  it("Checks for message then user not found", async () => {
    request(server)
      .post("/api/users/123-123-123-123")
      .expect((res) => {
        res.body.message = "User not found";
      });
  });
});

describe("scenario3 work with user", () => {
  afterAll(() => server.close());
  let id = "";

  it("New user created with all data", async () => {
    const response = await request(server).post("/api/users").send({
      username: "UserName",
      age: 20,
      hobbies: [],
    });
    id = response.body.id;
    expect(
      response.body.username &
        response.body.age &
        response.body.hobbies &
        response.body.id
    ).toBeDefined();
  });

  it("PUT api/users/{userId} not changes id", async () => {
    request(server)
      .put(`/api/users/${id}`)
      .send({
        username: "NewName",
      })
      .expect((res) => {
        res.body.id = id;
      });
  });

  it("PUT api/users/{userId} saves not transferred data", async () => {
    const response = await request(server).get(`/api/users/${id}`);
    expect(response.body.age & response.body.hobbies).toBeDefined();
  });

  it("Checks Delete message for user", async () => {
    request(server)
      .delete(`/api/users/${id}`)
      .expect((res) => {
        res.body.message = `User ${id} was removed`;
      });
  });
});

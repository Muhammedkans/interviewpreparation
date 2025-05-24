
const app = require("../server");
const request = require("supertest");

describe("Integration Test - Backend API", () => {
  it("should return order confirmation", async () => {
    const res = await request(app).post("/order").send({ item: "Pizza" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Order placed for Pizza");
  });

  it("should return error for missing item", async () => {
    const res = await request(app).post("/order").send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Item required");
  });
});

import { describe, it, expect, beforeAll, afterAll } from "vitest";
import mongoose from "mongoose";
import { dbConnect } from "../src/db/index.js";
import dotenv from "dotenv";

dotenv.config();

describe("Real Database Connection", () => {

  beforeAll(async () => {
    await dbConnect();   // real connection
  });

  afterAll(async () => {
    await mongoose.connection.close();  // close connection after test
  });

  it("should connect to real database", () => {
    expect(mongoose.connection.readyState).toBe(1);
    // 1 = connected
  });

});
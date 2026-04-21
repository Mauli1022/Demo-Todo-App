import { describe, it, expect, vi, beforeEach } from "vitest";
import { createTodo } from "../src/controllers/todos.controller.js";
import { Todo } from "../src/models/todos.model.js";

vi.mock("../src/models/todos.model.js", () => {
  const mockSave = vi.fn();

  const MockTodo = vi.fn().mockImplementation(function (data) {
    // Copy data onto `this` so the controller's `newTodo` has the right fields
    Object.assign(this, data);
    // Always reference MockTodo.mockSave so resets/reassignments are picked up
    this.save = (...args) => MockTodo.mockSave(...args);
  });

  MockTodo.mockSave = mockSave;
  return { Todo: MockTodo };
});

describe("Todo Controller - createTodo", () => {
  let req;
  let res;

  beforeEach(() => {
    vi.clearAllMocks();
    Todo.mockSave.mockResolvedValue({});
    req = { body: {} };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
  });

  it("should return 400 if title is missing", async () => {
    req.body = { description: "test" };
    await createTodo(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Title is Required",
    });
    expect(Todo).not.toHaveBeenCalled();
  });

  it("should create todo successfully", async () => {
    const input = {
      title: "First Todo",
      description: "test",
      priority: "low",
      dueDate: null,
    };
    req.body = input;

    await createTodo(req, res);

    expect(Todo).toHaveBeenCalledTimes(1);
    expect(Todo).toHaveBeenCalledWith({
      title: input.title,
      description: input.description,
      priority: input.priority,
      dueDate: input.dueDate,
    });

    expect(Todo.mockSave).toHaveBeenCalledTimes(1);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Todo Created Successfully",
      todo: expect.objectContaining({ title: "First Todo" }),
    });
  });

  it("should return 500 if DB save fails", async () => {
    req.body = { title: "Test Todo" };
    Todo.mockSave.mockRejectedValue(new Error("DB connection lost"));

    await createTodo(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Internal Server Error",
    });
  });
});
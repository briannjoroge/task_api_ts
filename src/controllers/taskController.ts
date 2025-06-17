import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

export const defaultPage = (_req: Request, res: Response) => {
  res.send(`
            <h1>Welcome to the Task Api</h1>
            <p>To query all tasks, use <code>/task</code></p>
            <p>To query a specific task, use <code>/task/:id</code></p>
            <p>To create/update/delete you can use tools like postman to run the query using respective commands ( Get/Patch/Delete )</p>
            `);
};

export const getAllTasks = async (_req: Request, res: Response) => {
  try {
    const taskApi = await client.taskApi.findMany({
      where: {
        isComplete: false,
      },
    });
    res.status(200).json(taskApi);
  } catch (e) {
    res.status(500).json({ message: "Something went Wrong" });
  }
};

export const getSpecificTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const taskApi = await client.taskApi.findFirst({
      where: {
        id,
        isComplete: false,
      },
    });

    if (!taskApi) {
      res.status(400).json({ error: "Task not found!" });
    }
    res.status(200).json(taskApi);
  } catch (e) {
    res.status(500).json({ Message: "Something went wrong!" });
  }
};

export const createPost = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  try {
    const newTAsk = await client.taskApi.create({
      data: {
        title,
        description,
      },
    });
    res.status(200).json(newTAsk);
  } catch (e) {
    res.status(500).json({ message: "Something went Wrong" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const { id } = req.params;
  try {
    const taskExist = await client.taskApi.findFirst({
      where: {
        id,
        isComplete: false,
      },
    });

    if (!taskExist) {
      res.status(404).json({ error: "Task not found" });
    }

    const tasks = await client.taskApi.update({
      where: {
        id,
        isComplete: false,
      },
      data: {
        title: title && title,
        description: description && description,
      },
    });
    res.status(200).json(tasks);
  } catch (e) {
    res.status(500).json({ message: "Something went Wrong", e });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const taskExist = await client.taskApi.findFirst({
      where: {
        id,
        isComplete: false,
      },
    });

    if (!taskExist) {
      res.status(404).json({ message: "Task not found!" });
    }

    const deletedPost = await client.taskApi.update({
      where: {
        id,
      },
      data: {
        isComplete: true,
      },
    });
    res
      .status(200)
      .json({ message: "Task deleted successfully.", deletedPost });
  } catch (e) {
    res.status(500).json({ message: "Something went Wrong" });
  }
};

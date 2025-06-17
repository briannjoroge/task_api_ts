import express from "express";
import validateTaskInput from "../middlewares/validateTaskInput";
import {
  defaultPage,
  getAllTasks,
  getSpecificTask,
  createPost,
  updateTask,
  deleteTask,
} from "../controllers/taskController";

const router = express.Router();

router.get("/", defaultPage);
router.get("/", getAllTasks);
router.get("/:id", getSpecificTask);
router.post("/", validateTaskInput, createPost);
router.patch("/:id", validateTaskInput, updateTask);
router.delete("/:id", deleteTask);

export default router;

import Task from '../models/Task.js';
import Project from '../models/Project.js';

// @desc    Get tasks for a project
// @route   GET /api/tasks/:projectId
// @access  Private
const getTasks = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.projectId);
    
    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }

    if (project.createdBy.toString() !== req.user.id) {
      res.status(401);
      throw new Error('Not authorized to view these tasks');
    }

    const tasks = await Task.find({ projectId: req.params.projectId }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

// @desc    Create task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res, next) => {
  try {
    const { title, description, status, projectId } = req.body;

    if (!title || !projectId) {
      res.status(400);
      throw new Error('Please provide title and projectId');
    }

    const project = await Project.findById(projectId);
    
    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }

    if (project.createdBy.toString() !== req.user.id) {
      res.status(401);
      throw new Error('Not authorized to add task to this project');
    }

    const task = await Task.create({
      title,
      description,
      status: status || 'Todo',
      projectId,
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    const project = await Project.findById(task.projectId);
    
    if (project.createdBy.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    const project = await Project.findById(task.projectId);
    
    if (project.createdBy.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    await task.deleteOne();

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};

export {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};

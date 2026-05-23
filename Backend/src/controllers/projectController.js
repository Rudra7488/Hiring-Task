import Project from '../models/Project.js';

// @desc    Get projects
// @route   GET /api/projects
// @access  Private
const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

// @desc    Create project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      res.status(400);
      throw new Error('Please provide title and description');
    }

    const project = await Project.create({
      title,
      description,
      createdBy: req.user.id,
    });

    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }

    // Check for user
    if (project.createdBy.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedProject);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }

    // Check for user
    if (project.createdBy.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    await project.deleteOne();

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};

export {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
};

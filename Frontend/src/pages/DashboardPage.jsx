import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import toast from 'react-hot-toast';
import ProjectCard from '../components/ProjectCard';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Loader from '../components/Loader';
import { FiPlus } from 'react-icons/fi';

export default function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '' });
  const [editingProject, setEditingProject] = useState(null);

  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/projects');
      setProjects(data);
    } catch (error) {
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmitProject = async (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description) {
      toast.error('Please fill all fields');
      return;
    }
    try {
      if (editingProject) {
        const { data } = await api.put(`/projects/${editingProject._id}`, newProject);
        setProjects(projects.map((p) => (p._id === editingProject._id ? data : p)));
        toast.success('Project updated successfully');
      } else {
        const { data } = await api.post('/projects', newProject);
        setProjects([data, ...projects]);
        toast.success('Project created successfully');
      }
      handleCloseModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save project');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setNewProject({ title: '', description: '' });
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setNewProject({ title: project.title, description: project.description });
    setIsModalOpen(true);
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.delete(`/projects/${id}`);
      setProjects(projects.filter((p) => p._id !== id));
      toast.success('Project deleted');
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  if (loading)
    return (
      <div className="mt-32">
        <Loader />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Your Projects</h1>
          <p className="text-slate-500 mt-2 text-lg">Manage your workspaces and track progress</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <FiPlus className="h-4 w-4" /> New Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-24 bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-slate-300 shadow-sm">
          <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiPlus className="h-8 w-8 text-indigo-500" />
          </div>
          <h3 className="mt-2 text-lg font-bold text-slate-900">No projects yet</h3>
          <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
            Get started by creating a new project to organize your tasks and collaborate with your
            team.
          </p>
          <div className="mt-6">
            <Button onClick={() => setIsModalOpen(true)}>
              <FiPlus className="h-4 w-4 mr-2 inline" /> New Project
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onEdit={handleEditProject}
              onDelete={handleDeleteProject}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingProject ? 'Edit Project' : 'Create New Project'}
      >
        <form onSubmit={handleSubmitProject}>
          <Input
            label="Project Title"
            id="title"
            required
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            placeholder="e.g., Website Redesign"
          />
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              required
              rows={4}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              placeholder="What is this project about?"
            />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit">{editingProject ? 'Save Changes' : 'Create Project'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

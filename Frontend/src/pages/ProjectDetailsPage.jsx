import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import toast from 'react-hot-toast';
import TaskCard from '../components/TaskCard';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Loader from '../components/Loader';
import { FiPlus, FiArrowLeft } from 'react-icons/fi';

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'Todo' });

  const fetchProjectAndTasks = async () => {
    try {
      const [projectRes, tasksRes] = await Promise.all([
        api.get('/projects'), // We filter this to get the current project since there's no getProjectById API
        api.get(`/tasks/${id}`),
      ]);
      const currentProject = projectRes.data.find((p) => p._id === id);
      if (!currentProject) {
        toast.error('Project not found');
        navigate('/');
        return;
      }
      setProject(currentProject);
      setTasks(tasksRes.data);
    } catch {
      toast.error('Failed to load project details');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectAndTasks();
  }, [id]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTask.title) {
      toast.error('Task title is required');
      return;
    }
    try {
      const { data } = await api.post('/tasks', { ...newTask, projectId: id });
      setTasks([data, ...tasks]);
      setIsModalOpen(false);
      setNewTask({ title: '', description: '', status: 'Todo' });
      toast.success('Task created successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
    }
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    // Prevent duplicate updates if dropping in the same column
    const task = tasks.find(t => t._id === taskId);
    if (task && task.status === newStatus) return;

    try {
      const { data } = await api.put(`/tasks/${taskId}`, { status: newStatus });
      setTasks(tasks.map((t) => (t._id === taskId ? data : t)));
      toast.success(`Task moved to ${newStatus}`);
    } catch {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((t) => t._id !== taskId));
      toast.success('Task deleted');
    } catch {
      toast.error('Failed to delete task');
    }
  };

  // HTML5 Native Drag & Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow dropping
    e.currentTarget.classList.add('bg-slate-200/50'); // Temporary hover effect
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('bg-slate-200/50');
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-slate-200/50');
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      handleUpdateTaskStatus(taskId, newStatus);
    }
  };

  if (loading)
    return (
      <div className="mt-32">
        <Loader />
      </div>
    );
  if (!project) return null;

  const todoTasks = tasks.filter((t) => t.status === 'Todo');
  const inProgressTasks = tasks.filter((t) => t.status === 'In Progress');
  const doneTasks = tasks.filter((t) => t.status === 'Done');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col h-[calc(100vh-64px)] font-sans">
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800 mb-4 transition-colors"
        >
          <FiArrowLeft className="h-4 w-4 mr-1.5" /> Back to Dashboard
        </Link>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              {project.title}
            </h1>
            <p className="mt-3 text-slate-500 max-w-2xl text-lg leading-relaxed">
              {project.description}
            </p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 shadow-lg shadow-indigo-500/20"
          >
            <FiPlus className="h-4 w-4" /> Add New Task
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden mt-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full pb-4">
          
          {/* Todo Column */}
          <div 
            className="bg-slate-100/70 rounded-3xl p-5 flex flex-col h-full border border-slate-200/60 shadow-sm backdrop-blur-sm transition-colors duration-200"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'Todo')}
          >
            <div className="flex items-center justify-between mb-5 px-1">
              <h3 className="text-lg font-bold text-slate-700">To Do</h3>
              <span className="bg-slate-200 text-slate-700 py-1 px-3 rounded-full text-xs font-bold shadow-inner">
                {todoTasks.length}
              </span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 pb-10 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400">
              {todoTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onStatusChange={handleUpdateTaskStatus}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          </div>

          {/* In Progress Column */}
          <div 
            className="bg-indigo-50/70 rounded-3xl p-5 flex flex-col h-full border border-indigo-100/60 shadow-sm backdrop-blur-sm transition-colors duration-200"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'In Progress')}
          >
            <div className="flex items-center justify-between mb-5 px-1">
              <h3 className="text-lg font-bold text-indigo-700">In Progress</h3>
              <span className="bg-indigo-200/70 text-indigo-800 py-1 px-3 rounded-full text-xs font-bold shadow-inner">
                {inProgressTasks.length}
              </span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 pb-10 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-indigo-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-indigo-300">
              {inProgressTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onStatusChange={handleUpdateTaskStatus}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          </div>

          {/* Done Column */}
          <div 
            className="bg-emerald-50/70 rounded-3xl p-5 flex flex-col h-full border border-emerald-100/60 shadow-sm backdrop-blur-sm transition-colors duration-200"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'Done')}
          >
            <div className="flex items-center justify-between mb-5 px-1">
              <h3 className="text-lg font-bold text-emerald-700">Done</h3>
              <span className="bg-emerald-200/70 text-emerald-800 py-1 px-3 rounded-full text-xs font-bold shadow-inner">
                {doneTasks.length}
              </span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 pb-10 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-emerald-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-emerald-300">
              {doneTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onStatusChange={handleUpdateTaskStatus}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Task">
        <form onSubmit={handleCreateTask}>
          <Input
            label="Task Title"
            id="title"
            required
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            placeholder="e.g., Design homepage"
          />
          <div className="mb-4 mt-2">
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1"
            >
              Description (Optional)
            </label>
            <textarea
              id="description"
              rows={4}
              className="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50 focus:bg-white sm:text-sm transition-all duration-200"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              placeholder="Provide more details about this task..."
            />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Task</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { FiCalendar, FiTrash2, FiEdit2 } from 'react-icons/fi';

export default function ProjectCard({ project, onEdit, onDelete }) {
  const date = new Date(project.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100 transition-all duration-300 group flex flex-col h-full transform hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors truncate pr-2">
          <Link to={`/projects/${project._id}`} className="focus:outline-none">
            {project.title}
          </Link>
        </h3>
        <div className="flex space-x-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.preventDefault();
              onEdit(project);
            }}
            className="text-slate-400 hover:text-indigo-600 p-2 rounded-xl hover:bg-indigo-50 transition-all duration-200"
            title="Edit Project"
          >
            <FiEdit2 className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              onDelete(project._id);
            }}
            className="text-slate-400 hover:text-rose-600 p-2 rounded-xl hover:bg-rose-50 transition-all duration-200"
            title="Delete Project"
          >
            <FiTrash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="text-sm text-slate-600 mb-6 line-clamp-3 flex-grow leading-relaxed">
        {project.description}
      </p>

      <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-auto">
        <div className="flex items-center text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full gap-1.5">
          <FiCalendar className="h-3.5 w-3.5" />
          {date}
        </div>
        <Link
          to={`/projects/${project._id}`}
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200"
        >
          View Board &rarr;
        </Link>
      </div>
    </div>
  );
}

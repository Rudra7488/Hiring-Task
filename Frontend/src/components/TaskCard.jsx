import { FiClock, FiCheckCircle, FiCircle, FiTrash2 } from 'react-icons/fi';
import { MdDragIndicator } from 'react-icons/md';

export default function TaskCard({ task, onStatusChange, onDelete }) {
  const statusColors = {
    Todo: 'bg-slate-100 text-slate-700 border-slate-200',
    'In Progress': 'bg-blue-50 text-blue-700 border-blue-200',
    Done: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };

  const StatusIcon = {
    Todo: FiCircle,
    'In Progress': FiClock,
    Done: FiCheckCircle,
  }[task.status];

  const handleDragStart = (e) => {
    e.dataTransfer.setData('taskId', task._id);
    e.dataTransfer.effectAllowed = 'move';
    // Add opacity to the original card while dragging
    setTimeout(() => {
      e.target.classList.add('opacity-40');
    }, 0);
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('opacity-40');
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="bg-white p-4 rounded-2xl border border-slate-200 transition-all duration-200 group flex flex-col gap-3 shadow-sm hover:shadow-lg hover:-translate-y-0.5 cursor-grab active:cursor-grabbing"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-2">
          <div 
            className="mt-0.5 text-slate-300 hover:text-slate-500 p-0.5 rounded transition-colors"
            title="Drag to move"
          >
            <MdDragIndicator className="h-5 w-5" />
          </div>
          <h4 className="font-bold text-slate-800 leading-tight pt-0.5">{task.title}</h4>
        </div>
        <button
          onClick={() => onDelete(task._id)}
          className="text-slate-400 hover:text-rose-600 transition-colors p-1.5 rounded-lg hover:bg-rose-50 opacity-0 group-hover:opacity-100"
          title="Delete Task"
        >
          <FiTrash2 className="h-4 w-4" />
        </button>
      </div>

      {task.description && (
        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed ml-7">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between mt-1 pt-4 border-t border-slate-100">
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ml-7 ${statusColors[task.status]}`}
        >
          <StatusIcon className="h-3.5 w-3.5" />
          {task.status}
        </div>

        <select
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
          onClick={(e) => e.stopPropagation()}
          className="text-xs font-medium border border-slate-200 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 py-1.5 pl-2 pr-6 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer text-slate-700"
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
    </div>
  );
}

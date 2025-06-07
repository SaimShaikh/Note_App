
import React from 'react';
import { motion } from 'framer-motion';
import { Edit3, Trash2, Calendar, Tag } from 'lucide-react';
import { Note } from '../types/note';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getTagColor = (index: number) => {
    const colors = [
      'bg-blue-500/20 text-blue-300 border-blue-400/30',
      'bg-green-500/20 text-green-300 border-green-400/30',
      'bg-purple-500/20 text-purple-300 border-purple-400/30',
      'bg-pink-500/20 text-pink-300 border-pink-400/30',
      'bg-yellow-500/20 text-yellow-300 border-yellow-400/30',
      'bg-indigo-500/20 text-indigo-300 border-indigo-400/30',
    ];
    return colors[index % colors.length];
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      whileHover={{ y: -5 }}
      className="group relative"
    >
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-white line-clamp-2 flex-1">
            {note.title}
          </h3>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onEdit(note)}
              className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-colors border border-blue-400/30"
            >
              <Edit3 size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(note.id)}
              className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors border border-red-400/30"
            >
              <Trash2 size={16} />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <p className="text-gray-300 line-clamp-4 flex-1 mb-4">
          {note.content}
        </p>

        {/* Tags */}
        {note.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {note.tags.map((tag, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded-full text-xs font-medium border ${getTagColor(index)} flex items-center gap-1`}
              >
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-gray-600/50">
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <span>{formatDate(note.updatedAt)}</span>
          </div>
          {note.updatedAt !== note.createdAt && (
            <span className="text-xs">Updated</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default NoteCard;

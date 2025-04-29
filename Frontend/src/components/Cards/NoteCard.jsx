import React from 'react';
import { MdOutlinePushPin, MdCreate, MdDelete } from 'react-icons/md';
import moment from 'moment';

const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all ease-in-out">
      {/* Title & Pin Button */}
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-gray-500">{moment(date).format('DD MMM YYYY')}</span>
        </div>
        <MdOutlinePushPin 
          className={`cursor-pointer text-xl ${isPinned ? 'text-yellow-500' : 'text-gray-300'}`} 
          onClick={onPinNote} 
        />
      </div>

      {/* Content */}
      <p className="text-xs text-gray-600 mt-2">{content?.slice(0, 60)}...</p>

      {/* Tags & Action Buttons */}
      <div className="flex items-center justify-between mt-3">
        <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">{tags?.map((item) => `#${item}`)}</span>
        
        {/* Edit & Delete Buttons */}
        <div className="flex items-center space-x-2">
          <MdCreate 
            className="cursor-pointer text-green-500 hover:text-green-700 text-lg" 
            onClick={onEdit} 
          />
          <MdDelete 
            className="cursor-pointer text-red-500 hover:text-red-700 text-lg" 
            onClick={onDelete} 
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;

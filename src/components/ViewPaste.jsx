import React from 'react';
import { useSelector } from 'react-redux';

const ViewPaste = () => {
  const selectedPaste = useSelector((state) => state.paste.viewedPaste);
  
  if (!selectedPaste) {
    return <div>No Paste Selected</div>;
  }

  return (
    <div className="p-2 bg-white">
      <div className="text-2xl font-bold">{selectedPaste.title}</div>
      <div className="mt-4 text-lg">{selectedPaste.content}</div>
    </div>
  );
};

export default ViewPaste;

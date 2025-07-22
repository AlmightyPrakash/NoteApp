import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { removeFromPastes, setViewedPaste } from '../redux/pasteSlice';
import { useNavigate } from 'react-router-dom'; // Use navigate for redirection

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();  // For redirecting to paste view or edit

  // Erase function to remove a paste
  function erase(pasteId) {
    const confirmation = window.confirm("Are you sure you want to delete this paste?");
    if (confirmation) {
      dispatch(removeFromPastes(pasteId));
    }
  }

  // View paste function
  function handleView(pasteId) {
    dispatch(setViewedPaste(pasteId)); // Set the viewed paste in Redux
    navigate(`/pastes/${pasteId}`);  // Navigate to the paste view page
  }

  // Copy paste content to clipboard
  function handleCopy(content) {
    navigator.clipboard.writeText(content).then(() => {
      alert("Content copied to clipboard!");
    }).catch((error) => {
      alert("Failed to copy content: " + error);
    });
  }

  // Redirect to Home or Edit Page for updating the paste
  function handleUpdate(pasteId) {
    navigate(`/?pasteId=${pasteId}`);  // Redirect to Home page with pasteId to update
  }

  // Filter pastes based on search term
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div>
        <input
          className="w-80 p-2 mt-4 border border-gray-400 rounded-2xl"
          type="search"
          placeholder="Search Paste"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-5 mt-7 border-2 p-10 border-gray-500">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div key={paste._id} className="p-4 border-2 rounded bg-gray-300 min-w-[680px] h-60 flex flex-col items-center relative hover:scale-105 transition-transform duration-300 hover:shadow-lg hover:shadow-indigo-500/50">
              <div className="mb-4 text-lg text-center italic capitalize font-serif hover:text-blue-400">
                {paste.title}
              </div>
              <div className="flex gap-1.5 absolute bottom-2 right-2">
                <button onClick={() => handleView(paste._id)} className="border-2 border-gray-600 p-1 text-xs rounded-xl hover:bg-indigo-100">View</button>
                <button onClick={() => handleCopy(paste.content)} className="border-2 border-gray-600 p-1 text-xs rounded-xl hover:bg-indigo-100">Copy</button>
                <button onClick={() => handleUpdate(paste._id)} className="border-2 border-gray-600 p-1 text-xs rounded-xl hover:bg-indigo-100">Update</button>
                <button onClick={() => erase(paste._id)} className="border-2 border-gray-600 p-1 text-xs rounded-xl hover:bg-indigo-100">Remove</button>
                <button className="border-2 border-gray-600 p-1 text-xs rounded-xl hover:bg-indigo-100">Share</button>
              </div>
            </div>
          ))
        ) : (
          <div>No results found</div>
        )}
      </div>
    </div>
  );
};

export default Paste;

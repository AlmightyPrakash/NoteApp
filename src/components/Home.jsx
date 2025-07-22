import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const { pastes } = useSelector((state) => state.paste);

  useEffect(() => {
    if (pasteId) {
      const selectedPaste = pastes.find((p) => p._id === pasteId);
      if (selectedPaste) {
        setTitle(selectedPaste.title);
        setContent(selectedPaste.content);
      }
    }
  }, [pasteId, pastes]);

  const handlePaste = () => {
    if (!title.trim() || !content.trim()) {
      toast.warning("Title and content cannot be empty!");
      return;
    }

    const paste = {
      _id: pasteId || uuidv4(),
      title,
      content,
    };

    try {
      if (pasteId) {
        dispatch(updateToPastes(paste));
        toast.success("Paste updated!");
      } else {
        dispatch(addToPastes(paste));
        toast.success("Paste created!");
        setTitle("");
        setContent("");
      }
    } catch (error) {
      console.error("Error saving paste:", error);
      toast.error("Something went wrong while saving your paste.");
    }
  };

  return (
    <div className="min-h-[85vh] max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">
        {pasteId ? "Edit Paste" : "Create Paste"}
      </h2>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter title"
          className="border p-3 rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Write something..."
          className="border p-3 h-72 rounded-md"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button
          onClick={handlePaste}
          disabled={!title.trim() || !content.trim()}
          className="p-3 px-6 rounded-lg bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>
    </div>
  );
};

export default Home;

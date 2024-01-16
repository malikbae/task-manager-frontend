import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Message from "./Message";

function InputTask({ modalOpen, setModalOpen }) {
  const [name, setName] = useState("");
  const [completed, setCompleted] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/v1/tasks", {
        name,
        completed,
      });
      setMessage({ type: "success", text: response.data.msg });
      setTimeout(() => {
        navigate(0);
      }, 3000);
    } catch (error) {
      setMessage({ type: "error", text: error.response.data.msg });
    }
  };

  return (
    <dialog id="my_modal_3" className={`modal ${modalOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <button onClick={() => setModalOpen(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <form onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg">Add New Task</h3>
          {message && <Message message={message} />}
          <div className="modal-action">
            <input type="text" placeholder="Type here" className="input input-bordered w-full" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-control mt-4">
            <label className="cursor-pointer label w-28">
              <span className="label-text">Completed</span>
              <input type="checkbox" className="checkbox checkbox-success" name="completed" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
            </label>
          </div>
          <button type="submit" className="btn btn-neutral mt-4">
            Submit
          </button>
        </form>
      </div>
    </dialog>
  );
}

export default InputTask;

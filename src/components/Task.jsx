import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Message from "./Message";

function Task({ task }) {
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [modalOpenDelete, setModalOpenDelete] = useState(false);

  const uuid = task.uuid;
  const [name, setName] = useState(task.name);
  const [completed, setCompleted] = useState(task.completed);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const editTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:3000/api/v1/tasks/${uuid}`, {
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

  const deleteTask = async (uuid) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/v1/tasks/${uuid}`);
      setMessage({ type: "success", text: response.data.msg });
      setTimeout(() => {
        navigate(0);
      }, 3000);
    } catch (error) {
      setMessage({ type: "error", text: error.response.data.msg });
    }
  };

  return (
    <tr key={task.id}>
      <td className={`w-full ${task.completed ? "line-through" : ""}`}>{task.name}</td>
      <td className="flex gap-5">
        <FiEdit onClick={() => setModalOpenEdit(true)} className="text-yellow-500 cursor-pointer" size={24} />
        <dialog id="my_modal_3" className={`modal ${modalOpenEdit ? "modal-open" : ""}`}>
          <div className="modal-box">
            <button onClick={() => setModalOpenEdit(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <form onSubmit={editTask}>
              <h3 className="font-bold text-lg text-center">Edit Task</h3>
              {message && <Message message={message} />}
              <div className="modal-action">
                <input type="text" placeholder="Type here" className="input input-bordered w-full" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="form-control mt-4">
                <label className="cursor-pointer label w-28">
                  <span className="label-text">Completed</span>
                  <input type="checkbox" className="checkbox checkbox-success" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
                </label>
              </div>
              <div className="flex justify-center">
                <button type="submit" className="btn btn-neutral mt-4">
                  Edit
                </button>
              </div>
            </form>
          </div>
        </dialog>
        <FiTrash2 onClick={() => setModalOpenDelete(true)} className="text-red-500 cursor-pointer  " size={25} />
        <dialog id="my_modal_3" className={`modal ${modalOpenDelete ? "modal-open" : ""}`}>
          <div className="modal-box">
            <button onClick={() => setModalOpenDelete(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <h3 className="text-lg mt-4">Apakah Anda yakin ingin menghapus data?</h3>
            {message && <Message message={message} />}
            <div className="modal-action">
              <button onClick={() => deleteTask(task.uuid)} className="btn btn-neutral">
                Yes
              </button>
            </div>
          </div>
        </dialog>
      </td>
    </tr>
  );
}

export default Task;

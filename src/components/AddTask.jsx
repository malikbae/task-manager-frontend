import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import InputTask from "./InputTask";

function AddTask() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setModalOpen(true)} className="btn btn-primary w-full">
        ADD NEW TASK <AiOutlinePlus size={16} />
      </button>
      <InputTask modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
}

export default AddTask;

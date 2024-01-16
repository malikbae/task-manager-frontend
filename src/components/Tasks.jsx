import { useEffect, useState } from "react";
import Task from "./Task";
import axios from "axios";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getAllTask();
  }, []);

  const getAllTask = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/tasks");
    setTasks(response.data.tasks);
  };

  const tests = [
    {
      id: 1,
      uuid: "c11a85fb-29f8-4b47-9e96-7c8be1f59ee4",
      name: "belajar",
      completed: 1,
    },
    {
      id: 2,
      uuid: "d2858634-84b7-4b89-b567-d3ee2889369c",
      name: "bermain",
      completed: 0,
    },
    {
      id: 3,
      uuid: "4000967e-a125-4772-a34c-96a5577c9a2a",
      name: "bekerja",
      completed: 1,
    },
  ];

  const activeTasks = tasks.filter((task) => task.completed === 0);
  const completedTasks = tasks.filter((task) => task.completed === 1);

  return (
    <div className="overflow-x-auto">
      <div className="badge badge-accent">Active Tasks</div>
      <table className="table mt-4">
        {/* head */}
        <thead>
          <tr>
            <th>Tasks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {activeTasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </tbody>
      </table>
      <div className="badge badge-accent mt-8">Completed Tasks</div>
      <table className="table mt-4">
        {/* head */}
        <thead>
          <tr>
            <th>Tasks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {completedTasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tasks;

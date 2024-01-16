import AddTask from "../components/AddTask";
import Tasks from "../components/Tasks";

function Page() {
  return (
    <div className="max-w-2xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Task Manager</h1>
        <AddTask />
      </div>
      <Tasks />
    </div>
  );
}

export default Page;

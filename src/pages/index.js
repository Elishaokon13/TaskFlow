import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { PlusCircle, Trash2, CheckCircle, Circle, Menu, X } from "lucide-react";
import TaskManagerABI from "./api/TaskManagerABI.json"; // Import the ABI

const TaskDApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, title: "", message: "", type: "" });

  const address = useAddress();
  const contractAddress = "0x7F57f46EA40910978D3BDdb98884a871A2A4d1A7"; // Update with your deployed contract address
  const [contract, setContract] = useState(null); // State for contract instance

  const showToast = (title, message, type = "success") => {
    setToast({ show: true, title, message, type });
    setTimeout(() => setToast({ show: false, title: "", message: "", type: "" }), 3000);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && address) {
      // Initialize provider and contract on the client side
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, TaskManagerABI, signer);
      setContract(contractInstance);
      loadTasks(contractInstance);
    }
  }, [address]);

  const loadTasks = async (contractInstance) => {
    try {
      const data = await contractInstance.getTasks();
      setTasks(
        data.map((task) => ({
          id: task.id.toNumber(),
          name: task.name,
          isCompleted: task.isCompleted,
        }))
      );
    } catch (error) {
      showToast("Error Loading Tasks", error.message, "error");
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      setIsLoading(true);
      const tx = await contract.addTask(newTask);
      await tx.wait(); // Wait for the transaction to be mined
      setNewTask("");
      await loadTasks(contract);
      showToast("Task Added", "Your task has been successfully added to the blockchain.");
    } catch (error) {
      showToast("Error Adding Task", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteTask = async (id) => {
    try {
      setIsLoading(true);
      const tx = await contract.completeTask(id);
      await tx.wait();
      await loadTasks(contract);
      showToast("Task Completed", "Task marked as completed.");
    } catch (error) {
      showToast("Error Completing Task", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      setIsLoading(true);
      const tx = await contract.deleteTask(id);
      await tx.wait();
      await loadTasks(contract);
      showToast("Task Deleted", "Task has been removed.");
    } catch (error) {
      showToast("Error Deleting Task", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      {/* Toast Notifications */}
      {toast.show && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-transform ${
            toast.type === "error" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
          }`}
        >
          <h4 className="font-semibold">{toast.title}</h4>
          <p className="text-sm">{toast.message}</p>
        </div>
      )}

      {/* Navbar */}
      <nav className="bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-purple-600">TaskFlow</h1>
            </div>
            <div className="hidden sm:flex items-center">
              <ConnectWallet className="!bg-purple-600 !text-white hover:!bg-purple-700" btnTitle="Connect Wallet" />
            </div>
            <div className="sm:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 p-2"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="sm:hidden bg-white border-t border-gray-200 p-4">
            <ConnectWallet className="!bg-purple-600 !text-white hover:!bg-purple-700 w-full" btnTitle="Sign In" />
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto p-6">
        {!address ? (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-8 text-center">
            <p className="text-purple-800">
              Connect your wallet to manage your tasks on the blockchain.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-xl mt-8">
            <div className="bg-purple-600 p-6">
              <h2 className="text-2xl font-bold text-white text-center">My Tasks</h2>
            </div>
            <div className="p-6">
              <form onSubmit={handleAddTask} className="flex gap-2">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Enter task name"
                  className="border text-black rounded-lg p-2 flex-1"
                />
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v2a6 6 0 100 12v2a8 8 0 01-8-8z"
                      />
                    </svg>
                  ) : (
                    "Add Task"
                  )}
                </button>
              </form>

              {/* Task List */}
              <ul className="mt-4">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex items-center justify-between p-2 bg-gray-100 rounded-lg mb-2"
                  >
                    <div className="flex items-center">
                      {task.isCompleted ? (
                        <CheckCircle className="text-green-600 w-6 h-6" />
                      ) : (
                        <Circle className="text-gray-600 w-6 h-6" />
                      )}
                      <span
                        className={`ml-2 ${
                          task.isCompleted ? "line-through text-gray-400" : "text-gray-800"
                        }`}
                      >
                        {task.name}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {!task.isCompleted && (
                        <button
                          onClick={() => handleCompleteTask(task.id)}
                          className="text-green-600 hover:text-green-800"
                          disabled={isLoading}
                        >
                          Complete
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-red-600 hover:text-red-800"
                        disabled={isLoading}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDApp;

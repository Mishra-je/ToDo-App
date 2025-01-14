import React, { useState } from "react";
import { User, Trash2, Check, Plus } from "lucide-react";
import { FaEdit } from "react-icons/fa";
const TodoList = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAuth = (credentials) => {
    setIsAuthenticated(true);
    setUser({
      name: credentials.name || "User",
      email: credentials.email,
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const startEditing = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: editText } : todo))
    );
    setEditId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditText("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const AuthForm = ({ isLogin, onSubmit, onToggle }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit({ email, password, name });
    };

    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          {isLogin ? "Sign In" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded border focus:ring-2 focus:ring-blue-500"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded border focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded border focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <button
          onClick={onToggle}
          className="mt-4 text-sm text-blue-500 hover:text-blue-600"
        >
          {isLogin ? "Need an account?" : "Already have an account?"}
        </button>
      </div>
    );
  };

  const UserProfile = ({ user, onLogout }) => {
    return (
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-center flex-col space-y-3">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <User size={40} className="text-blue-500" />
          </div>
          <h2 className="text-lg font-semibold dark:text-white">{user.name}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {user.email}
          </p>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="bg-gray-100 dark:bg-slate-800 rounded-lg shadow-xl dark:shadow-slate-700/20 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-3 border-b-2 lg:border-b-0 lg:border-r-2 border-slate-100 dark:border-slate-700 p-4">
              <h2 className="text-lg font-semibold mb-4 dark:text-white">
                Filter
              </h2>
              <div className="space-y-2">
                {["all", "active", "completed"].map((filterOption) => (
                  <button
                    key={filterOption}
                    onClick={() => setFilter(filterOption)}
                    className={`w-full px-4 py-2 rounded text-left capitalize ${
                      filter === filterOption
                        ? "bg-blue-500 text-white"
                        : "hover:bg-slate-50 dark:hover:bg-slate-700 dark:text-white"
                    }`}
                  >
                    {filterOption}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 border-b-2 lg:border-b-0 lg:border-r-2 border-slate-100 dark:border-slate-700">
              <div className="p-4 md:p-6 space-y-6">
                <form onSubmit={addTodo} className="flex gap-2">
                  <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new todo..."
                    className="flex-1 px-4 py-2 rounded border border-slate-200 focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  >
                    <Plus size={24} />
                  </button>
                </form>

                <div className="space-y-2">
                  {filteredTodos.map((todo) => (
                    <div
                      key={todo.id}
                      className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-700 rounded"
                    >
                      <button
                        onClick={() => toggleTodo(todo.id)}
                        className={`p-1 rounded-full ${
                          todo.completed ? "bg-green-500" : "bg-slate-200"
                        }`}
                      >
                        <Check size={16} className="text-white" />
                      </button>
                      {editId === todo.id ? (
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="flex-1 px-2 py-1 rounded border"
                        />
                      ) : (
                        <span
                          className={`flex-1 dark:text-white ${
                            todo.completed ? "line-through text-slate-500" : ""
                          }`}
                        >
                          {todo.text}
                        </span>
                      )}

                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                      {editId === todo.id ? (
                        <>
                          <button
                            onClick={() => saveEdit(todo.id)}
                            className="text-green-500 hover:text-green-600"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="text-red-500 hover:text-red-600"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => startEditing(todo.id, todo.text)}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          <FaEdit size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              {isAuthenticated ? (
                <UserProfile user={user} onLogout={handleLogout} />
              ) : (
                <AuthForm
                  isLogin={isLogin}
                  onSubmit={handleAuth}
                  onToggle={() => setIsLogin(!isLogin)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  removeTodo,
  editTodo,
  toggleComplete,
} from "../redux/features/todoSlice";

export default function TodoList() {
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");

  const todos = useSelector((state) => state.todo.todos); // hämtar todos från state
  const dispatch = useDispatch(); //här dispatchas action

  // Hantering av add funktionen
  function handleAddTodo() {
    if (newTodo.trim()) {
      dispatch(
        addTodo({
          id: Date.now(),
          text: newTodo,
          completed: false,
        })
      );
      setNewTodo("");
    }
  }

  function handleToggleComplete(id) {
    dispatch(toggleComplete({ id }));
  }

  function handleRemoveTodo(id) {
    dispatch(removeTodo({ id }));
  }

  function handleEditTodo(id) {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditingId(id);
    setEditedText(todoToEdit.text);
  }
  function handleSaveEdit(id) {
    if (editedText.trim()) {
      dispatch(
        editTodo({
          id,
          updatedTodo: { text: editedText },
        })
      );
      setEditingId(null);
      setEditedText("");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Todo List
        </h1>
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
            className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleAddTodo}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition duration-300"
          >
            Add Todo
          </button>
        </div>
        <ul className="space-y-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-50 p-4 rounded-md border border-gray-200"
            >
              {editingId === todo.id ? (
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="w-full px-2 py-1 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <span
                  className={`cursor-pointer ${
                    todo.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                  onClick={() => handleToggleComplete(todo.id)}
                >
                  {todo.text}
                </span>
              )}

              <div className="flex space-x-2">
                {editingId === todo.id ? (
                  <button
                    onClick={() => handleSaveEdit(todo.id)}
                    className="px-3 py-1 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-300"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditTodo(todo.id)}
                    className="px-3 py-1 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => handleRemoveTodo(todo.id)}
                  className="px-3 py-1 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

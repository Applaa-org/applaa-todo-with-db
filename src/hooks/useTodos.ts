import { useState, useEffect, useCallback } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo, type Todo } from '@/lib/api';
import { showError, showSuccess } from '@/utils/toast';
import { toast } from "sonner";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTodos();
      setTodos(data);
    } catch (err: any) {
      console.error('Failed to load todos:', err);
      setError(err.message || 'Failed to load todos');
      showError('Failed to load your tasks.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const addTodo = async (title: string, priority: 'low' | 'medium' | 'high') => {
    const loadingToast = toast.loading("Adding new task...");
    try {
      const newTodo = await createTodo({ title, priority });
      setTodos(prevTodos => [newTodo, ...prevTodos]);
      toast.success("Task added successfully!", { id: loadingToast });
    } catch (err) {
      console.error('Failed to create todo:', err);
      toast.error("Failed to add task.", { id: loadingToast });
    }
  };

  const toggleTodo = async (id: number, completed: boolean) => {
    const originalTodos = [...todos];
    const updatedTodo = todos.find(t => t.id === id);
    if (!updatedTodo) return;

    setTodos(todos.map(t => t.id === id ? { ...t, completed } : t));

    try {
      await updateTodo(id, { completed });
      showSuccess(`Task marked as ${completed ? 'complete' : 'incomplete'}.`);
    } catch (err) {
      console.error('Failed to update todo:', err);
      showError('Failed to update task status.');
      setTodos(originalTodos);
    }
  };
  
  const editTodo = async (id: number, title: string, priority: 'low' | 'medium' | 'high') => {
    const loadingToast = toast.loading("Updating task...");
    const originalTodos = [...todos];
    const updatedTodo = todos.find(t => t.id === id);
    if (!updatedTodo) return;

    setTodos(todos.map(t => t.id === id ? { ...t, title, priority } : t));

    try {
      await updateTodo(id, { title, priority });
      toast.success("Task updated successfully!", { id: loadingToast });
    } catch (err) {
      console.error('Failed to update todo:', err);
      toast.error("Failed to update task.", { id: loadingToast });
      setTodos(originalTodos);
    }
  };

  const removeTodo = async (id: number) => {
    const loadingToast = toast.loading("Deleting task...");
    const originalTodos = [...todos];
    setTodos(todos.filter(t => t.id !== id));
    try {
      await deleteTodo(id);
      toast.success("Task deleted successfully!", { id: loadingToast });
    } catch (err) {
      console.error('Failed to delete todo:', err);
      toast.error("Failed to delete task.", { id: loadingToast });
      setTodos(originalTodos);
    }
  };

  return { todos, loading, error, addTodo, toggleTodo, editTodo, removeTodo, refresh: loadTodos };
}
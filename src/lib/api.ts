const API_URL = 'http://168.231.116.44:3001/api';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
}

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_URL}/todos`);
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Failed to fetch todos:", errorText);
    throw new Error('Failed to fetch todos');
  }
  const data = await response.json();
  // Sort by creation date, newest first
  return data.sort((a: Todo, b: Todo) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function createTodo(todoData: { title: string; priority: 'low' | 'medium' | 'high' }): Promise<Todo> {
  const response = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...todoData, completed: false }),
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Failed to create todo:", errorText);
    throw new Error('Failed to create todo');
  }
  return response.json();
}

export async function updateTodo(id: number, updates: Partial<Omit<Todo, 'id' | 'created_at' | 'updated_at'>>): Promise<Todo> {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Failed to update todo:", errorText);
    throw new Error('Failed to update todo');
  }
  return response.json();
}

export async function deleteTodo(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Failed to delete todo:", errorText);
    throw new Error('Failed to delete todo');
  }
}
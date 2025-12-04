import { useTodos } from '@/hooks/useTodos';
import { TodoItem } from './TodoItem';
import { AddTodoForm } from './AddTodoForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ListChecks, AlertCircle } from 'lucide-react';

export function TodoList() {
  const { todos, loading, error, addTodo, toggleTodo, editTodo, removeTodo } = useTodos();

  const completedCount = todos.filter(t => t.completed).length;
  const pendingCount = todos.length - completedCount;

  return (
    <div className="max-w-3xl mx-auto">
      <AddTodoForm onAdd={addTodo} />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ListChecks className="h-5 w-5" />
              Your Tasks
            </div>
            <div className="text-sm font-normal text-muted-foreground">
              {pendingCount} pending / {completedCount} completed
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="space-y-3">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {!loading && !error && todos.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              <p className="font-medium">You're all caught up!</p>
              <p className="text-sm">Add a new task to get started.</p>
            </div>
          )}
          {!loading && !error && todos.length > 0 && (
            <div>
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={removeTodo}
                  onEdit={editTodo}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
import { useState } from 'react';
import { Todo } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Pencil, Trash2, Save, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string, priority: 'low' | 'medium' | 'high') => void;
}

const priorityStyles = {
  low: 'border-l-4 border-green-500',
  medium: 'border-l-4 border-yellow-500',
  high: 'border-l-4 border-red-500',
};

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedPriority, setEditedPriority] = useState<'low' | 'medium' | 'high'>(todo.priority);

  const handleSave = () => {
    if (editedTitle.trim()) {
      onEdit(todo.id, editedTitle.trim(), editedPriority);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedTitle(todo.title);
    setEditedPriority(todo.priority);
    setIsEditing(false);
  };

  return (
    <Card className={cn("mb-3 transition-all hover:shadow-md", priorityStyles[todo.priority])}>
      <CardContent className="p-4 flex items-center">
        <Checkbox
          id={`todo-${todo.id}`}
          checked={todo.completed}
          onCheckedChange={(checked) => onToggle(todo.id, !!checked)}
          className="mr-4"
        />
        {isEditing ? (
          <div className="flex-grow flex items-center gap-2">
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="h-9"
            />
            <Select value={editedPriority} onValueChange={(value: 'low' | 'medium' | 'high') => setEditedPriority(value)}>
              <SelectTrigger className="w-[120px] h-9">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div className="flex-grow">
            <label
              htmlFor={`todo-${todo.id}`}
              className={cn(
                "font-medium cursor-pointer",
                todo.completed ? "line-through text-muted-foreground" : ""
              )}
            >
              {todo.title}
            </label>
            <p className="text-xs text-muted-foreground">
              Added {formatDistanceToNow(new Date(todo.created_at), { addSuffix: true })}
            </p>
          </div>
        )}
        <div className="ml-4 flex items-center space-x-2">
          {isEditing ? (
            <>
              <Button variant="ghost" size="icon" onClick={handleSave} className="h-8 w-8">
                <Save className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleCancel} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)} className="h-8 w-8">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => onDelete(todo.id)} className="h-8 w-8 text-red-500 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
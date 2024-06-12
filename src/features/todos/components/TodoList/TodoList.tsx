import { todosTestIdVocabulary } from '../../todosTestIdVocabulary';
import { TodoForm } from './TodoForm';
import { TodoView } from './TodoView';
import styles from './TodoList.module.scss';
import { EntityIdContract, TodoBodyContract, TodoContract } from '~/contracts/contracts';

export interface TodoListProps {
  todoList: TodoContract[];
  onPatch: (todo: TodoContract) => void;
  setEditId: (id: EntityIdContract | null) => void;
  editId: EntityIdContract | null;
  onDelete: (id: EntityIdContract) => void;
  disabled: boolean;
  onAdd: (todoBody: TodoBodyContract) => void;
  addFormRerenderCounter: number;
  children?: React.ReactNode;
}

const PLACEHOLDER = 'What needs to be done?';

export function TodoList({
  editId,
  setEditId,
  onPatch,
  todoList,
  onDelete,
  disabled,
  onAdd,
  addFormRerenderCounter,
  children,
}: TodoListProps) {
  const handleViewDoneToggle = (todo: TodoContract) => {
    setEditId(null);
    onPatch({ ...todo, isDone: !todo.isDone });
  };

  const handlePatch = (text: TodoContract['text'], todo: TodoContract) => {
    onPatch({ ...todo, text });
  };

  const handleAdd = (text: TodoContract['text']) => {
    onAdd({ isDone: false, text });
  };

  return (
    <div className={styles.TodoList}>
      <div className={styles.listItem}>{children}</div>
      <div className={styles.listItem}>
        <TodoForm
          disabled={disabled}
          placeholder={PLACEHOLDER}
          text={''}
          onSubmit={handleAdd}
          key={addFormRerenderCounter}
          dataTestId={todosTestIdVocabulary.todoListAddForm}
        />
      </div>
      {todoList.map((todo, index) => (
        <li key={todo.id} className={styles.listItem} data-testid={todosTestIdVocabulary.todoListItemTemplate(index)}>
          {editId !== todo.id && (
            <TodoView
              isDone={todo.isDone}
              text={todo.text}
              onDelete={() => onDelete(todo.id)}
              onDoneToggle={() => handleViewDoneToggle(todo)}
              onEdit={() => setEditId(todo.id)}
              disabled={disabled}
            />
          )}
          {editId === todo.id && (
            <TodoForm
              onCancel={() => setEditId(null)}
              onSubmit={(text) => handlePatch(text, todo)}
              text={todo.text}
              disabled={disabled}
              placeholder={PLACEHOLDER}
              dataTestId={todosTestIdVocabulary.todoListEditForm}
            />
          )}
        </li>
      ))}
    </div>
  );
}

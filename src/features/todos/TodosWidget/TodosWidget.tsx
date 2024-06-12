import { useEffect, useState } from 'react';
import { TodoList } from '../components/TodoList';
import { TodoManager } from '../components/TodoManager';
import { EntityIdContract, TodoBodyContract, TodoContract, TodoStatusContract } from '~/contracts/contracts';
import {
  useAddTodoListRequest,
  useClearCompletedListRequest,
  useDeleteTodoListRequest,
  useFetchTodoListRequest,
  usePatchTodoListRequest,
} from '~/api/todos';
import { Spinner } from '~/ui/Spinner';

export function TodoWidget() {
  const [todoStatus, setTodoStatus] = useState<TodoStatusContract>(TodoStatusContract.ALL);
  const [addFormRerenderCounter, setAddFormRerenderCounter] = useState(0);
  const [editId, setEditId] = useState<EntityIdContract | null>(null);
  const addTodoListRequest = useAddTodoListRequest();
  const fetchTodoListRequest = useFetchTodoListRequest();
  const patchTodoListRequest = usePatchTodoListRequest();
  const deleteTodoListRequest = useDeleteTodoListRequest();
  const clearCompletedListRequest = useClearCompletedListRequest();

  const isLoading =
    fetchTodoListRequest.isLoading ||
    patchTodoListRequest.isLoading ||
    deleteTodoListRequest.isLoading ||
    addTodoListRequest.isLoading ||
    clearCompletedListRequest.isLoading;

  useEffect(() => {
    fetchTodoListRequest.run([{ todoStatus: TodoStatusContract.ALL }]);
  }, []);

  const handleAdd = (todoBody: TodoBodyContract) => {
    setEditId(null);
    addTodoListRequest.run([{ todoBody }], {
      onSuccess: () =>
        fetchTodoListRequest.run([{ todoStatus }], {
          onSuccess: () => {
            setAddFormRerenderCounter((prev) => prev + 1);
          },
        }),
    });
  };

  const handlePatch = (todo: TodoContract) => {
    const { id: todoId, ...todoBody } = todo;
    patchTodoListRequest.run([{ todoId, todoBody }], {
      onSuccess: () => {
        fetchTodoListRequest.run([{ todoStatus }], { onSuccess: () => setEditId(null) });
      },
    });
  };

  const handleDelete = (id: EntityIdContract) => {
    setEditId(null);
    deleteTodoListRequest.run([{ todoId: id }], {
      onSuccess: () => {
        fetchTodoListRequest.run([{ todoStatus }]);
      },
    });
  };

  const handleChangeTodoStatus = (todoStatus: TodoStatusContract) => {
    fetchTodoListRequest.run([{ todoStatus }], { onSuccess: () => setTodoStatus(todoStatus) });
  };

  const handleClearCompletion = () => {
    clearCompletedListRequest.run([], {
      onSuccess: () => {
        fetchTodoListRequest.run([{ todoStatus }]);
      },
    });
  };

  return (
    <>
      <Spinner isShow={isLoading} />
      {fetchTodoListRequest.data && (
        <TodoList
          todoList={fetchTodoListRequest.data}
          onPatch={handlePatch}
          editId={editId}
          setEditId={setEditId}
          onDelete={handleDelete}
          disabled={isLoading}
          onAdd={handleAdd}
          addFormRerenderCounter={addFormRerenderCounter}
        >
          <TodoManager
            onChangeTodoStatus={handleChangeTodoStatus}
            todoStatus={todoStatus}
            onClearComplete={handleClearCompletion}
            itemsCount={fetchTodoListRequest.data.length}
          />
        </TodoList>
      )}
    </>
  );
}

export type EntityIdContract = string;

export interface TodoBodyContract {
  text: string;
  isDone: boolean;
}

export interface TodoContract extends TodoBodyContract {
  id: EntityIdContract;
}

export enum TodoStatusContract {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  ALL = 'ALL',
}

export interface MockApiGateContract {
  fetchTodoList(params: { todoStatus: TodoStatusContract }): Promise<TodoContract[]>;
  addTodo(params: { todoBody: TodoBodyContract }): Promise<EntityIdContract>;
  patchTodo(params: { todoId: EntityIdContract; todoBody: TodoBodyContract }): Promise<void>;
  deleteTodo(params: { todoId: EntityIdContract }): Promise<void>;
  clearCompleted(): Promise<void>;
}

export enum MockApiGateErrorMessagesContract {
  UNKNOWN_TODO_ID = 'UNKNOWN_TODO_ID',
}

import { MockApiGateConstructorData } from './mockApiGate.types';
import {
  MockApiGateContract,
  MockApiGateErrorMessagesContract,
  TodoBodyContract,
  TodoContract,
  TodoStatusContract,
} from '~/contracts/contracts';

export class MockApiGate implements MockApiGateContract {
  private dependencies: MockApiGateConstructorData;
  public constructor(dependencies: MockApiGateConstructorData) {
    this.dependencies = dependencies;
  }

  public async fetchTodoList(params: { todoStatus: TodoStatusContract }): Promise<TodoContract[]> {
    await this.dependencies.makeDelay();

    return this.dependencies.store.filter((todo) => {
      if (params.todoStatus === TodoStatusContract.ACTIVE) {
        return todo.isDone === false;
      }
      if (params.todoStatus === TodoStatusContract.COMPLETED) {
        return todo.isDone === true;
      }
      return true;
    });
  }

  public async addTodo(params: { todoBody: TodoBodyContract }): Promise<string> {
    await this.dependencies.makeDelay();

    const id = this.dependencies.getUniqueId();
    this.dependencies.store.push({
      id,
      ...params.todoBody,
    });

    this.dependencies.saveStore();

    return id;
  }

  public async patchTodo(params: { todoId: string; todoBody: TodoBodyContract }): Promise<void> {
    await this.dependencies.makeDelay();
    const index = this.dependencies.store.findIndex((todo) => todo.id === params.todoId);
    if (index === -1) {
      throw new Error(MockApiGateErrorMessagesContract.UNKNOWN_TODO_ID);
    }
    this.dependencies.store[index] = { id: params.todoId, ...params.todoBody };
    this.dependencies.saveStore();
  }

  public async deleteTodo(params: { todoId: string }): Promise<void> {
    await this.dependencies.makeDelay();
    const index = this.dependencies.store.findIndex((todo) => todo.id === params.todoId);
    if (index === -1) {
      throw new Error(MockApiGateErrorMessagesContract.UNKNOWN_TODO_ID);
    }
    this.dependencies.store.splice(index, 1);
    this.dependencies.saveStore();
  }

  public async clearCompleted(): Promise<void> {
    await this.dependencies.makeDelay();
    const result = this.dependencies.store.filter((todo) => !todo.isDone);
    this.dependencies.store.splice(0, this.dependencies.store.length);
    this.dependencies.store.push(...result);
    this.dependencies.saveStore();
  }
}

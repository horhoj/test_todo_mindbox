import { vi, expect, test } from 'vitest';

import { MockApiGateErrorMessagesContract, TodoContract, TodoStatusContract } from '~/contracts/contracts';
import { MockApiGate } from '~/mockApiGate/mockApiGate';
import { MockApiGateConstructorData } from '~/mockApiGate/mockApiGate.types';

const makeTodo = (n: number, isDone: boolean): TodoContract => ({ id: `id_${n}`, isDone, text: `text_${n}` });

const makeDefaultTestStore = (n: number): TodoContract[] => [
  makeTodo(1 + n, false),
  makeTodo(2 + n, true),
  makeTodo(3 + n, false),
];

test.each([1, 22])('addTodo должен быть выполнен корректно', async (n) => {
  const store: MockApiGateConstructorData['store'] = makeDefaultTestStore(n);
  const makeDelay = vi.fn();
  makeDelay.mockReturnValue(() => Promise.resolve());
  const getUniqueId = vi.fn();
  const { id, ...todoBody } = makeTodo(n, true);
  getUniqueId.mockReturnValue(id);
  const saveStore = vi.fn();
  const gate = new MockApiGate({ store, makeDelay, getUniqueId, saveStore });
  const response = await gate.addTodo({ todoBody });
  expect(response).toBe(id);
  expect(getUniqueId).toHaveBeenCalledTimes(1);
  expect(makeDelay).toHaveBeenCalledTimes(1);
  expect(saveStore).toHaveBeenCalledTimes(1);
  expect(store).toEqual([...makeDefaultTestStore(n), makeTodo(n, true)]);
});

test.each([1, 22])('fetchTodo должен вернуть все элементы', async (n) => {
  const store: MockApiGateConstructorData['store'] = makeDefaultTestStore(n);
  const makeDelay = vi.fn();
  makeDelay.mockReturnValue(() => Promise.resolve());
  const getUniqueId = vi.fn();
  const saveStore = vi.fn();
  const gate = new MockApiGate({ store, makeDelay, getUniqueId, saveStore });
  const response = await gate.fetchTodoList({ todoStatus: TodoStatusContract.ALL });
  expect(getUniqueId).toHaveBeenCalledTimes(0);
  expect(makeDelay).toHaveBeenCalledTimes(1);
  expect(saveStore).toHaveBeenCalledTimes(0);
  expect(response).toEqual(makeDefaultTestStore(n));
});

test.each([1, 22])('fetchTodo должен вернуть только активные таски', async (n) => {
  const store: MockApiGateConstructorData['store'] = makeDefaultTestStore(n);
  const makeDelay = vi.fn();
  makeDelay.mockReturnValue(() => Promise.resolve());
  const getUniqueId = vi.fn();
  const saveStore = vi.fn();
  const gate = new MockApiGate({ store, makeDelay, getUniqueId, saveStore });
  const response = await gate.fetchTodoList({ todoStatus: TodoStatusContract.ACTIVE });
  expect(getUniqueId).toHaveBeenCalledTimes(0);
  expect(makeDelay).toHaveBeenCalledTimes(1);
  expect(saveStore).toHaveBeenCalledTimes(0);
  expect(response).toEqual([makeTodo(1 + n, false), makeTodo(3 + n, false)]);
});

test.each([1, 22])('fetchTodo должен вернуть только завершенные таски', async (n) => {
  const store: MockApiGateConstructorData['store'] = makeDefaultTestStore(n);
  const makeDelay = vi.fn();
  makeDelay.mockReturnValue(() => Promise.resolve());
  const getUniqueId = vi.fn();
  const saveStore = vi.fn();
  const gate = new MockApiGate({ store, makeDelay, getUniqueId, saveStore });
  const response = await gate.fetchTodoList({ todoStatus: TodoStatusContract.COMPLETED });
  expect(getUniqueId).toHaveBeenCalledTimes(0);
  expect(makeDelay).toHaveBeenCalledTimes(1);
  expect(saveStore).toHaveBeenCalledTimes(0);
  expect(response).toEqual([makeTodo(2 + n, true)]);
});

test.each([1, 22])('patchTodo должен отработать корректно', async (n) => {
  const store: MockApiGateConstructorData['store'] = makeDefaultTestStore(n);
  const makeDelay = vi.fn();
  makeDelay.mockReturnValue(() => Promise.resolve());
  const getUniqueId = vi.fn();
  const saveStore = vi.fn();
  const gate = new MockApiGate({ store, makeDelay, getUniqueId, saveStore });
  const patchedTodo: TodoContract = { ...makeDefaultTestStore(n)[1], isDone: false, text: 'new text' };
  const { id, ...todoBody } = patchedTodo;
  await gate.patchTodo({ todoId: id, todoBody });
  expect(getUniqueId).toHaveBeenCalledTimes(0);
  expect(makeDelay).toHaveBeenCalledTimes(1);
  expect(saveStore).toHaveBeenCalledTimes(1);
  const expectStore = makeDefaultTestStore(n);
  expectStore[1] = patchedTodo;
  expect(store).toEqual(expectStore);
});

test.each([1, 22])('patchTodo должен вернуть ошибку, если todoId некорректен', async (n) => {
  const store: MockApiGateConstructorData['store'] = makeDefaultTestStore(n);
  const makeDelay = vi.fn();
  makeDelay.mockReturnValue(() => Promise.resolve());
  const getUniqueId = vi.fn();
  const saveStore = vi.fn();
  const gate = new MockApiGate({ store, makeDelay, getUniqueId, saveStore });
  const patchedTodo: TodoContract = {
    isDone: false,
    text: 'new text',
    id: 'incorrect ID',
  };
  const { id, ...todoBody } = patchedTodo;
  await expect(gate.patchTodo({ todoId: id, todoBody })).rejects.toEqual(
    new Error(MockApiGateErrorMessagesContract.UNKNOWN_TODO_ID),
  );
  expect(getUniqueId).toHaveBeenCalledTimes(0);
  expect(makeDelay).toHaveBeenCalledTimes(1);
  expect(saveStore).toHaveBeenCalledTimes(0);
  const expectStore = makeDefaultTestStore(n);
  expect(store).toEqual(expectStore);
});

test.each([1, 22])('deleteTodo должен должен отработать корректно', async (n) => {
  const store: MockApiGateConstructorData['store'] = makeDefaultTestStore(n);
  const makeDelay = vi.fn();
  makeDelay.mockReturnValue(() => Promise.resolve());
  const getUniqueId = vi.fn();
  const saveStore = vi.fn();
  const gate = new MockApiGate({ store, makeDelay, getUniqueId, saveStore });
  await gate.deleteTodo({ todoId: makeDefaultTestStore(n)[1].id });
  expect(getUniqueId).toHaveBeenCalledTimes(0);
  expect(makeDelay).toHaveBeenCalledTimes(1);
  expect(saveStore).toHaveBeenCalledTimes(1);
  const expectStore = makeDefaultTestStore(n);
  expectStore.splice(1, 1);
  expect(store).toEqual(expectStore);
});

test.each([1, 22])('deleteTodo должен вернуть ошибку, если todoId некорректен', async (n) => {
  const store: MockApiGateConstructorData['store'] = makeDefaultTestStore(n);
  const makeDelay = vi.fn();
  makeDelay.mockReturnValue(() => Promise.resolve());
  const getUniqueId = vi.fn();
  const saveStore = vi.fn();
  const gate = new MockApiGate({ store, makeDelay, getUniqueId, saveStore });
  const id = 'incorrect id';
  await expect(gate.deleteTodo({ todoId: id })).rejects.toEqual(
    new Error(MockApiGateErrorMessagesContract.UNKNOWN_TODO_ID),
  );
  expect(getUniqueId).toHaveBeenCalledTimes(0);
  expect(makeDelay).toHaveBeenCalledTimes(1);
  expect(saveStore).toHaveBeenCalledTimes(0);
  const expectStore = makeDefaultTestStore(n);
  expect(store).toEqual(expectStore);
});

test.each([1, 22])('clearCompleted должен отработать корректно', async (n) => {
  const store: MockApiGateConstructorData['store'] = makeDefaultTestStore(n);
  const makeDelay = vi.fn();
  makeDelay.mockReturnValue(() => Promise.resolve());
  const getUniqueId = vi.fn();
  const saveStore = vi.fn();
  const gate = new MockApiGate({ store, makeDelay, getUniqueId, saveStore });
  await gate.clearCompleted();
  expect(getUniqueId).toHaveBeenCalledTimes(0);
  expect(makeDelay).toHaveBeenCalledTimes(1);
  expect(saveStore).toHaveBeenCalledTimes(1);
  const expectStore = makeDefaultTestStore(n).filter((todo) => !todo.isDone);
  expect(store).toEqual(expectStore);
});

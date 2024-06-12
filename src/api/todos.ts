import { useRequest } from './useRequest';
import { mockApiGate } from '~/mockApiGate';

export const useFetchTodoListRequest = () => useRequest({ fetchCb: mockApiGate.fetchTodoList.bind(mockApiGate) });

export const useAddTodoListRequest = () => useRequest({ fetchCb: mockApiGate.addTodo.bind(mockApiGate) });

export const usePatchTodoListRequest = () => useRequest({ fetchCb: mockApiGate.patchTodo.bind(mockApiGate) });

export const useDeleteTodoListRequest = () => useRequest({ fetchCb: mockApiGate.deleteTodo.bind(mockApiGate) });

export const useClearCompletedListRequest = () => useRequest({ fetchCb: mockApiGate.clearCompleted.bind(mockApiGate) });

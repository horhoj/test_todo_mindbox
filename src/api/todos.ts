import { useRequest } from './useRequest';
import { mockApiGate } from '~/mockApiGate';

export const useFetchTodoListRequest = () => useRequest(mockApiGate.fetchTodoList.bind(mockApiGate));

export const useAddTodoListRequest = () => useRequest(mockApiGate.addTodo.bind(mockApiGate));

export const usePatchTodoListRequest = () => useRequest(mockApiGate.patchTodo.bind(mockApiGate));

export const useDeleteTodoListRequest = () => useRequest(mockApiGate.deleteTodo.bind(mockApiGate));

export const useClearCompletedListRequest = () => useRequest(mockApiGate.clearCompleted.bind(mockApiGate));

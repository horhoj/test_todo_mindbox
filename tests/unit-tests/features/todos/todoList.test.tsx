import { fireEvent, render, screen, within } from '@testing-library/react';
import { vi } from 'vitest';
import { TodoBodyContract, TodoContract } from '~/contracts/contracts';
import { TodoList } from '~/features/todos/components/TodoList';
import { todosTestIdVocabulary } from '~/features/todos/todosTestIdVocabulary';

describe('тесты для компонента todoList', () => {
  test('проверим сценарий добавления нового туду', () => {
    const todoList: TodoContract[] = [];
    // мокаем колбеки
    const onAdd = vi.fn();
    const onDelete = vi.fn();
    const onPatch = vi.fn();
    const setEditId = vi.fn();
    // рендерим
    render(
      <TodoList
        todoList={todoList}
        onAdd={onAdd}
        disabled={false}
        editId={null}
        addFormRerenderCounter={0}
        onDelete={onDelete}
        onPatch={onPatch}
        setEditId={setEditId}
      />,
    );
    // находим форму добавления туду
    const addForm = screen.getByTestId(todosTestIdVocabulary.todoListAddForm);
    // находим в ней инпут
    const input = within(addForm).getByTestId(todosTestIdVocabulary.todoFormInput);
    // проверяем что в инпуте пустое значение
    expect(input).toHaveValue('');
    // находим кнопку добавления туду
    const saveBtn = within(addForm).getByTestId(todosTestIdVocabulary.todoFormSaveBtn);
    // кликаем по ней
    fireEvent.click(saveBtn);
    // проверяем что калбек для создания нового туду не сработал, так как введено пустое значение
    expect(onAdd).toHaveBeenCalledTimes(0);
    //  изменим значение в инпуте
    fireEvent.change(input, { target: { value: 'test value' } });
    // кликаем по кнопке сохранения
    fireEvent.click(saveBtn);
    // проверим что калбек создания нового туду был вызван нужное кол-во раз
    expect(onAdd).toHaveBeenCalledTimes(1);
    // и с нужными параметрами
    expect(onAdd).toHaveBeenLastCalledWith({ isDone: false, text: 'test value' } as TodoBodyContract);
    // проверим что остальные колбеки не были вызваны
    expect(onDelete).toHaveBeenCalledTimes(0);
    expect(onPatch).toHaveBeenCalledTimes(0);
    expect(setEditId).toHaveBeenCalledTimes(0);
    // проверим что кнопка отмены отсутствует на форме добавления туду
    const cancelBtn = within(addForm).queryByTestId(todosTestIdVocabulary.todoFormCancelBtn);
    expect(cancelBtn).toBe(null);
  });

  test('проверка рендеринга списка туду', () => {
    const todoList: TodoContract[] = [
      { id: '1', isDone: false, text: 'todo 1' },
      { id: '2', isDone: true, text: 'todo 2' },
      { id: '3', isDone: false, text: 'todo 3' },
      { id: '4', isDone: true, text: 'todo 4' },
    ];
    // мокаем колбеки
    const onAdd = vi.fn();
    const onDelete = vi.fn();
    const onPatch = vi.fn();
    const setEditId = vi.fn();
    // рендерим
    render(
      <TodoList
        todoList={todoList}
        onAdd={onAdd}
        disabled={false}
        editId={null}
        addFormRerenderCounter={0}
        onDelete={onDelete}
        onPatch={onPatch}
        setEditId={setEditId}
      />,
    );
    for (let i = 0; i < todoList.length; i++) {
      // найдем элемент для текущего туду
      const todoItemWrapper = screen.getByTestId(todosTestIdVocabulary.todoListItemTemplate(i));
      expect(todoItemWrapper).toBeInTheDocument();
      // проверим отрисовался ли текст с туду внутри элемента туду
      expect(within(todoItemWrapper).getByText(todoList[i].text)).toBeInTheDocument();

      // найдем кнопку смены статуса
      const statusToggleBtn = within(todoItemWrapper).getByTestId(todosTestIdVocabulary.todoViewStatusToggle);
      // проверим наличие иконки статуса "выполнено" внутри найденной
      // если isDone === true тогда иконка есть, иначе нет
      expect(within(statusToggleBtn).queryByTestId(todosTestIdVocabulary.todoViewCheckIcon) === null).toBe(
        !todoList[i].isDone,
      );

      // сделаем клик по данной кнопке
      fireEvent.click(statusToggleBtn);
      // проверим срабатываем колбека
      expect(onPatch).toHaveBeenCalledTimes(i + 1);
      expect(onPatch).toHaveBeenLastCalledWith({ ...todoList[i], isDone: !todoList[i].isDone });

      expect(setEditId).toHaveBeenCalledTimes(2 * (i + 1) - 1);
      expect(setEditId).toHaveBeenLastCalledWith(null);
      // найдем кнопку редактирования
      const editBtn = within(todoItemWrapper).getByTestId(todosTestIdVocabulary.todoViewEditBtn);
      fireEvent.click(editBtn);
      // долен быть вызван колбек, который установит текущий редактируемый элемент в значение ид туду
      expect(setEditId).toHaveBeenCalledTimes(2 * (i + 1));
      expect(setEditId).toHaveBeenLastCalledWith(todoList[i].id);
      // найдем кнопку удаления
      const deleteBtn = within(todoItemWrapper).getByTestId(todosTestIdVocabulary.todoViewDeleteBtn);
      fireEvent.click(deleteBtn);
      // долен быть вызван колбек, который удалит текущий элемент туду по его ид
      expect(onDelete).toHaveBeenCalledTimes(i + 1);
      expect(onDelete).toHaveBeenLastCalledWith(todoList[i].id);
    }
  });

  test.each([0, 1, 2, 3])('проверка редактирования туду', (i) => {
    const todoList: TodoContract[] = [
      { id: '1', isDone: false, text: 'todo 1' },
      { id: '2', isDone: true, text: 'todo 2' },
      { id: '3', isDone: false, text: 'todo 3' },
      { id: '4', isDone: true, text: 'todo 4' },
    ];

    // мокаем колбеки

    const onAdd = vi.fn();
    const onDelete = vi.fn();
    const onPatch = vi.fn();
    const setEditId = vi.fn();
    // рендерим с текущим ид для редактирования
    render(
      <TodoList
        todoList={todoList}
        onAdd={onAdd}
        disabled={false}
        editId={todoList[i].id}
        addFormRerenderCounter={0}
        onDelete={onDelete}
        onPatch={onPatch}
        setEditId={setEditId}
      />,
    );
    // найдем все элементы списка и проверим что форма редактирования отразилась только для текущего элемента списка
    for (let j = 0; j < todoList.length; j++) {
      // найдем элемент для текущего туду
      const todoItemWrapper = screen.getByTestId(todosTestIdVocabulary.todoListItemTemplate(j));
      expect(todoItemWrapper).toBeInTheDocument();
      if (j === i) {
        // проверим что для нужного элемента показывается форма редактирования
        expect(within(todoItemWrapper).getByTestId(todosTestIdVocabulary.todoListEditForm)).toBeInTheDocument();
        expect(within(todoItemWrapper).queryByTestId(todosTestIdVocabulary.todoView)).toBeNull();
      } else {
        // проверим что для для остальных элементов  показывается вьюха
        expect(within(todoItemWrapper).queryByTestId(todosTestIdVocabulary.todoListEditForm)).toBeNull();
        expect(within(todoItemWrapper).getByTestId(todosTestIdVocabulary.todoView)).toBeInTheDocument();
      }
    }
    // найдем элемент для текущего туду
    const todoItemWrapper = screen.getByTestId(todosTestIdVocabulary.todoListItemTemplate(i));
    expect(todoItemWrapper).toBeInTheDocument();
    // найдем форму редактирования
    const editForm = within(todoItemWrapper).getByTestId(todosTestIdVocabulary.todoListEditForm);
    expect(editForm).toBeInTheDocument();
    // проверим срабатывание кнопки отмены
    const cancelBtn = within(editForm).getByTestId(todosTestIdVocabulary.todoFormCancelBtn);
    fireEvent.click(cancelBtn);
    expect(setEditId).toHaveBeenCalledTimes(1);
    expect(setEditId).toHaveBeenLastCalledWith(null);
    // проверим НЕ срабатывание кнопки сохранения при пустом значении инпута формы, для чего очистим содержимое инпута
    const input = within(editForm).getByTestId(todosTestIdVocabulary.todoFormInput);
    fireEvent.change(input, { target: { value: '' } });
    const saveBtn = within(editForm).getByTestId(todosTestIdVocabulary.todoFormSaveBtn);
    fireEvent.click(saveBtn);
    expect(onPatch).toHaveBeenCalledTimes(0);
    // введем новое значение
    const NEW_TEXT = 'new text';
    fireEvent.change(input, { target: { value: NEW_TEXT } });
    // проверим что кнопка сохранения теперь отрабатывает
    fireEvent.click(saveBtn);
    expect(onPatch).toHaveBeenCalledTimes(1);
    expect(onPatch).toHaveBeenLastCalledWith({ ...todoList[i], text: NEW_TEXT });
    // проверим общую правильность вызова колбеков
    expect(onAdd).toHaveBeenCalledTimes(0);
    expect(onPatch).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledTimes(0);
    expect(setEditId).toHaveBeenCalledTimes(1);
  });
});

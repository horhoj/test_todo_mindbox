import classNames from 'classnames';
import { SvgIcon } from '../SvgIcon';
import { todosTestIdVocabulary } from '../../todosTestIdVocabulary';
import styles from './TodoView.module.scss';
import { TodoContract } from '~/contracts/contracts';
import checkmarkIcon from '~/assets/checkmarkIcon.svg';
import editIcon from '~/assets/editIcon.svg';
import deleteIcon from '~/assets/deleteIcon.svg';

export interface TodoViewProps {
  isDone: boolean;
  text: TodoContract['text'];
  onDoneToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
  disabled: boolean;
}

export function TodoView({ isDone, onDelete, onDoneToggle, onEdit, text, disabled }: TodoViewProps) {
  return (
    <div className={styles.TodoView} data-testid={todosTestIdVocabulary.todoView}>
      <div className={styles.todoDataWrapper}>
        <button
          onClick={onDoneToggle}
          className={styles.activeStatusButton}
          disabled={disabled}
          data-testid={todosTestIdVocabulary.todoViewStatusToggle}
        >
          {isDone && <SvgIcon src={checkmarkIcon} data-testid={todosTestIdVocabulary.todoViewCheckIcon} />}
        </button>
        <div className={classNames(isDone && styles.textTodoIsDone, styles.text)}>{text}</div>
      </div>
      <div className={styles.actionButtonsWrapper}>
        <button
          className={styles.actionButton}
          onClick={onEdit}
          disabled={disabled}
          data-testid={todosTestIdVocabulary.todoViewEditBtn}
        >
          <SvgIcon src={editIcon} />
        </button>
        <button
          className={styles.actionButton}
          onClick={onDelete}
          disabled={disabled}
          data-testid={todosTestIdVocabulary.todoViewDeleteBtn}
        >
          <SvgIcon src={deleteIcon} />
        </button>
      </div>
    </div>
  );
}

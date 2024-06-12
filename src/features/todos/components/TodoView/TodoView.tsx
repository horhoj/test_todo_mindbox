import classNames from 'classnames';
import { SvgIcon } from '../SvgIcon';
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
    <div className={styles.TodoView}>
      <div className={styles.todoDataWrapper}>
        <button onClick={onDoneToggle} className={styles.activeStatusButton} disabled={disabled}>
          {isDone && <SvgIcon src={checkmarkIcon} />}
        </button>
        <div className={classNames(isDone && styles.textTodoIsDone, styles.text)}>{text}</div>
      </div>
      <div className={styles.actionButtonsWrapper}>
        <button className={styles.actionButton} onClick={onEdit} disabled={disabled}>
          <SvgIcon src={editIcon} />
        </button>
        <button className={styles.actionButton} onClick={onDelete} disabled={disabled}>
          <SvgIcon src={deleteIcon} />
        </button>
      </div>
    </div>
  );
}

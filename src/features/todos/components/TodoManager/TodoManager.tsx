import classNames from 'classnames';
import styles from './TodoManager.module.scss';
import { TodoStatusContract } from '~/contracts/contracts';
import { getUUID } from '~/utils/getUUID';

interface TodoManagerProps {
  onClearComplete: () => void;
  todoStatus: TodoStatusContract;
  onChangeTodoStatus: (todoStatus: TodoStatusContract) => void;
  itemsCount: number;
}

const STATUS_CONFIG_BUTTONS: { todoStatus: TodoStatusContract; label: string; id: string }[] = [
  { todoStatus: TodoStatusContract.ALL, label: 'All', id: getUUID() },
  { todoStatus: TodoStatusContract.ACTIVE, label: 'Active', id: getUUID() },
  { todoStatus: TodoStatusContract.COMPLETED, label: 'Completed', id: getUUID() },
];

export function TodoManager({ onClearComplete, onChangeTodoStatus, todoStatus, itemsCount }: TodoManagerProps) {
  return (
    <div className={styles.TodoManager}>
      <span>items: {itemsCount}</span>
      <div>
        {STATUS_CONFIG_BUTTONS.map((config) => (
          <button
            key={config.id}
            onClick={() => onChangeTodoStatus(config.todoStatus)}
            className={classNames(config.todoStatus === todoStatus && styles.activeStatus, styles.TodoManagerButton)}
          >
            {config.label}
          </button>
        ))}
      </div>
      <button onClick={onClearComplete} className={styles.TodoManagerButton}>
        ClearCompleted
      </button>
    </div>
  );
}

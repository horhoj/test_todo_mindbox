import { useState } from 'react';
import { SvgIcon } from '../SvgIcon';
import { todosTestIdVocabulary } from '../../../todosTestIdVocabulary';
import styles from './TodoForm.module.scss';
import { TodoContract } from '~/contracts/contracts';
import saveIcon from '~/assets/saveIcon.svg';
import exitIcon from '~/assets/exitIcon.svg';

export interface TodoFormPropsContract {
  text: TodoContract['text'];
  onSubmit: (text: TodoContract['text']) => void;
  onCancel?: () => void;
  disabled: boolean;
  placeholder: string;
  dataTestId: string;
}

export function TodoForm({ onCancel, onSubmit, text, disabled, placeholder, dataTestId }: TodoFormPropsContract) {
  const [value, setValue] = useState(text);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim() !== '') {
      onSubmit(value.trim());
    }
  };

  return (
    <form className={styles.TodoForm} onSubmit={handleFormSubmit} data-testid={dataTestId}>
      <input
        type="text"
        value={value}
        autoFocus={true}
        className={styles.input}
        readOnly={disabled}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        data-testid={todosTestIdVocabulary.todoFormInput}
      />

      <div className={styles.actionButtonsWrapper}>
        <button
          className={styles.actionButton}
          type={'submit'}
          disabled={disabled}
          data-testid={todosTestIdVocabulary.todoFormSaveBtn}
        >
          <SvgIcon src={saveIcon} />
        </button>
        {Boolean(onCancel) && (
          <button
            className={styles.actionButton}
            type={'button'}
            onClick={onCancel}
            disabled={disabled}
            data-testid={todosTestIdVocabulary.todoFormCancelBtn}
          >
            <SvgIcon src={exitIcon} />
          </button>
        )}
      </div>
    </form>
  );
}

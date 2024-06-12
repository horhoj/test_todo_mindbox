import styles from './App.module.scss';
import { TodoWidget } from '~/features/todos/TodosWidget';

export function App() {
  return (
    <div className={styles.App}>
      <TodoWidget />
    </div>
  );
}

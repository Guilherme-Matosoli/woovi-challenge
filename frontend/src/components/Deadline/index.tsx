import styles from "./styles.module.css";

interface DeadlineProps {
  time: Date
}

export function Deadline({ time }: DeadlineProps) {
  const date = new Date(time);
  const month = String(date.getMonth()).length == 1 ? "0" + date.getMonth() : date.getMonth();
  const day = String(date.getDate()).length == 1 ? "0" + date.getDate() : date.getDate();

  const formatedDate = `${day}/${month}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`

  return (
    <div className={styles.container}>
      <span>Prazo de pagamento:</span>
      <strong>{formatedDate}</strong>
    </div>
  )
}

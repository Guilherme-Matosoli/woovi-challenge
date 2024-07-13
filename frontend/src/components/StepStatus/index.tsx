import styles from "./styles.module.css";

interface StepStatusProps {
  haveNext: boolean,
  checked: boolean,
  actual: boolean
}

export function StepStatus({ haveNext, checked, actual }: StepStatusProps) {
  return (
    <div className={`${styles.container} ${actual && styles.actual} ${haveNext && styles.next} ${checked && styles.checked}`}>
      {
        checked && <img src="/checked-icon.svg" alt="Etapa concluída" />
      }
    </div>
  )
}

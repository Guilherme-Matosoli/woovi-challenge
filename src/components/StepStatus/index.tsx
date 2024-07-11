import styles from "./styles.module.css";

interface StepStatusProps {
  haveNext?: boolean,
  checked?: boolean
}

export function StepStatus({ haveNext, checked }: StepStatusProps) {
  return (
    <div className={`${styles.container} ${haveNext && styles.next} ${checked && styles.checked}`}>
      {
        checked && <img src="/checked-icon.svg" alt="Etapa concluída" />
      }
    </div>
  )
}

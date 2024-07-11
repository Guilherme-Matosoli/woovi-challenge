import styles from "./styles.module.css";

interface BenefitFlagProps {
  text: string
}

export function BenefitFlag({ text }: BenefitFlagProps) {
  return (
    <div className={styles.container}>
      <span className={styles.text}>
        {text}
      </span>
    </div>
  )
};

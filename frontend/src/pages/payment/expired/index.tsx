import styles from "./styles.module.css";

export function Expired() {
  return (
    <article className={styles.container}>
      <div className={styles.circle}>
        <img
          src="/denied-icon.svg"
          alt="Negado"
        />
      </div>

      <h3>
        Prazo de pagamento expirado
      </h3>
    </article>
  )
}

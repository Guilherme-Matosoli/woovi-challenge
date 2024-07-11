import styles from "./styles.module.css";

export function Footer() {
  return (
    <footer className={styles.container}>
      <img
        src="/security-badge.svg"
        alt="Ícone de segurança"
      />

      <span className={styles.text}>
        Pagamento 100% seguro via:
      </span>

      <img
        src="/footer-logo.svg"
        alt="Woovi"
      />
    </footer>
  )
}

import styles from "./styles.module.css"

export function Header() {
  return (
    <header className={styles.container}>
      <a href="https://woovi.com/#home" target="_blank">
        <img
          src="/logo.svg"
          alt="Woovi"
        />
      </a>
    </header>
  )
}

import { ApprovedIcon } from "../ApprovedIcon";
import styles from "./styles.module.css";


export function Success() {
  return (
    <article className={styles.container}>
      <ApprovedIcon />

      <h2>
        Pagamento realizado com sucesso!
      </h2>
    </article>
  )
}

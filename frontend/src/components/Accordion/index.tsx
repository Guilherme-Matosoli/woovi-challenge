import styles from "./styles.module.css";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";


export function AccordionUsage() {
  return (
    <div>
      <Accordion className={styles.container}>
        <AccordionSummary
          expandIcon={<img src="/accordion-icon.svg" />}
          aria-controls="panel1-content"
          id="panel1-header"
          className={styles.text}
        >
          Como funciona?
        </AccordionSummary>

        <AccordionDetails className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

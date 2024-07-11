import styles from "./styles.module.css";
import { QRCodeSVG } from "qrcode.react";

interface QrCodeProps {
  value: string
}

export function QrCode({ value }: QrCodeProps) {
  return (
    <div className={styles.container}>
      <QRCodeSVG value={value} className={styles.qrcode} />
    </div>
  )
}

import { Container } from "./styles";
import { QRCodeSVG } from "qrcode.react";

interface QrCodeProps {
  value: string
}

export function QrCode({ value }: QrCodeProps) {
  return (
    <Container>
      <QRCodeSVG value={value} className="qrcode" />
    </Container>
  )
}

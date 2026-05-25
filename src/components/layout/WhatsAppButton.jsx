export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919999999999"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="whatsapp-button"
    >
      {/* Pulse ring */}
      <span className="whatsapp-pulse-ring" />
      <img src="/icons/whatsapp.svg" alt="WhatsApp" style={{ width: '28px', height: '28px' }} />
    </a>
  );
}

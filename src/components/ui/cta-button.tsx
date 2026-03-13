import React from 'react';

type CtaVariant = 'dark' | 'on-white' | 'on-green';

interface CtaButtonProps {
  variant?: CtaVariant;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
}

/**
 * Botão CTA padronizado da Águia Digital
 *
 * variant="dark"     → fundo preto   — botão verde, hover branco
 * variant="on-white" → fundo branco  — botão preto, hover verde
 * variant="on-green" → fundo verde   — botão preto, hover branco
 */
const CtaButton = ({
  variant = 'dark',
  href,
  onClick,
  children,
  className = '',
  type = 'button',
  style,
}: CtaButtonProps) => {
  const classes = `cta-btn cta-btn--${variant} ${className}`.trim();
  const content = <span className="cta-btn__text">{children}</span>;

  if (href) {
    return (
      <a href={href} className={classes} style={style}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} style={style}>
      {content}
    </button>
  );
};

export default CtaButton;

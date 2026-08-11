export const headerData = {
  links: [
    { text: 'Sobre', href: '#sobre' },
    { text: 'Serviços', href: '#servicos' },
    { text: 'Contactos', href: '#contactos' },
  ],
  socialLinks: [
    {
      ariaLabel: 'Instagram de Sara Pereira Arquitetura',
      icon: 'tabler:brand-instagram',
      href: 'https://www.instagram.com/sarapereira.arquitetura',
    },
  ],
  actions: [{ text: 'Falar sobre um projeto', href: '#contactos', variant: 'primary' as const }],
};

export const footerData = {
  links: [],
  secondaryLinks: [],
  socialLinks: [
    {
      ariaLabel: 'Instagram de Sara Pereira Arquitetura',
      icon: 'tabler:brand-instagram',
      href: 'https://www.instagram.com/sarapereira.arquitetura',
    },
  ],
  footNote: `© ${new Date().getFullYear()} Sara Pereira Arquitetura · Tomar`,
};

export const contact = {
  email: 'sarapereira.arquitetura@hotmail.com',
  phone: '+351 913 993 165',
  telephone: 'tel:+351913993165',
  whatsapp: 'https://wa.me/351913993165',
  instagram: 'https://www.instagram.com/sarapereira.arquitetura',
};

export const contactChannels = [
  {
    label: 'WhatsApp',
    detail: 'Conversar sobre o meu projeto',
    href: contact.whatsapp,
    icon: 'tabler:brand-whatsapp',
    type: 'whatsapp',
    external: true,
  },
  {
    label: 'Email',
    detail: contact.email,
    href: `mailto:${contact.email}`,
    icon: 'tabler:mail',
    type: 'email',
    external: false,
  },
  {
    label: 'Telefone',
    detail: contact.phone,
    href: contact.telephone,
    icon: 'tabler:phone',
    type: 'phone',
    external: false,
  },
  {
    label: 'Instagram',
    detail: '@sarapereira.arquitetura',
    href: contact.instagram,
    icon: 'tabler:brand-instagram',
    type: 'instagram',
    external: true,
  },
];

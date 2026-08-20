const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.classList.toggle('open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Tutup menu' : 'Buka menu');
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Buka menu');
}));

const contactDialog = document.querySelector('.contact-dialog');
const contactForm = document.querySelector('#contact-form');
const dialogClose = document.querySelector('.dialog-close');
const formStatus = document.querySelector('.form-status');

document.querySelectorAll('[data-contact-trigger]').forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    contactDialog.showModal();
    contactDialog.querySelector('input[name="name"]').focus();
  });
});

dialogClose.addEventListener('click', () => contactDialog.close());

contactDialog.addEventListener('click', (event) => {
  if (event.target === contactDialog) contactDialog.close();
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const subject = `Percakapan baru dari ${data.get('name')}`;
  const body = [
    `Nama: ${data.get('name')}`,
    `Email: ${data.get('email')}`,
    `Organisasi: ${data.get('company') || '-'}`,
    '',
    'Konteks:',
    data.get('message')
  ].join('\n');

  formStatus.textContent = 'Membuka aplikasi email Anda…';
  window.location.href = `mailto:halo@myland.id?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

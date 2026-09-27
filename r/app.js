const favicon = document.createElement('link');
favicon.rel = 'icon';
favicon.type = 'image/jpeg';
favicon.href = 'assets/acb-contact-logo.jpg';
document.head.appendChild(favicon);

const menuButton = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? '×' : '☰';
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: .1 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const contactForm = document.querySelector('#contact-form');

contactForm?.addEventListener('submit', event => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  const data = new FormData(contactForm);
  const name = String(data.get('name') || '').trim();
  const phone = String(data.get('phone') || '').trim();
  const email = String(data.get('email') || '').trim();
  const country = String(data.get('country') || '').trim();
  const message = String(data.get('message') || '').trim();
  const subject = `Визний зөвлөгөөний хүсэлт — ${name}`;
  const body = [
    'Сайн байна уу,',
    '',
    'Визний зөвлөгөө авах хүсэлт илгээж байна.',
    '',
    `Нэр: ${name}`,
    `Утас: ${phone}`,
    `Буцах имэйл: ${email}`,
    `Сонирхож буй улс: ${country}`,
    `Товч мэдээлэл: ${message || 'Оруулаагүй'}`
  ].join('\n');

  contactForm.querySelector('.form-status').textContent = 'Имэйл апп нээгдэж байна. Бэлэн болсон имэйлийг илгээнэ үү.';
  window.location.href = `mailto:acb.mongolia@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

(() => {
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('.nav');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const opened = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(opened));
      menu.setAttribute('aria-label', opened ? 'Close navigation' : 'Open navigation');
      menu.textContent = opened ? '×' : '☰';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-label', 'Open navigation');
      menu.textContent = '☰';
    }));
  }
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });
    items.forEach((item, index) => {
      item.style.transitionDelay = (index % 4) * 65 + 'ms';
      observer.observe(item);
    });
  } else items.forEach(item => item.classList.add('is-visible'));
  const enquiry = document.getElementById('enquiry');
  const interest = document.getElementById('interest');
  const message = document.getElementById('message');
  const note = document.getElementById('form-note');
  if (enquiry) enquiry.addEventListener('click', () => {
    const topic = interest ? interest.value : 'Product enquiry';
    const detail = message && message.value.trim() ? '\nDetails: ' + message.value.trim() : '';
    const draft = 'Hello Nassets Technology Ltd., I would like to enquire about: ' + topic + '.' + detail;
    if (navigator.share) {
      navigator.share({ title: 'Nassets product enquiry', text: draft }).catch(() => {});
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(draft).then(() => {
        if (note) note.textContent = 'Enquiry text copied. Add the official WhatsApp/contact details to enable direct sending.';
      }).catch(() => {
        if (note) note.textContent = draft;
      });
    } else if (note) note.textContent = draft;
  });
})();
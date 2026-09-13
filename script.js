// Mobile menu toggle
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburgerBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Active section highlighting (desktop nav + rail)
  const sections = document.querySelectorAll('section[id]');
  const deskLinks = document.querySelectorAll('#deskLinks a');
  const railLinks = document.querySelectorAll('#rail a');

  const setActive = (id) => {
    deskLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
    railLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));

  // Inquiry modal
  const inquiryModal = document.getElementById('inquiryModal');
  const inquiryOpenBtn = document.getElementById('inquiryOpenBtn');
  const inquiryCloseBtn = document.getElementById('inquiryCloseBtn');
  const inquiryContactLink = document.getElementById('inquiryContactLink');

  const openInquiry = () => {
    inquiryModal.classList.add('open');
    inquiryCloseBtn.focus();
    document.body.style.overflow = 'hidden';
  };
  const closeInquiry = () => {
    inquiryModal.classList.remove('open');
    document.body.style.overflow = '';
    inquiryOpenBtn.focus();
  };

  inquiryOpenBtn.addEventListener('click', openInquiry);
  inquiryCloseBtn.addEventListener('click', closeInquiry);
  inquiryContactLink.addEventListener('click', closeInquiry);
  inquiryModal.addEventListener('click', (e) => {
    if (e.target === inquiryModal) closeInquiry();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && inquiryModal.classList.contains('open')) closeInquiry();
  });

  // Booking form
  const bookingForm = document.getElementById('bookingForm');
  bookingForm.addEventListener('submit', () => {
    const name = document.getElementById('bookName').value.trim();
    const contactInfo = document.getElementById('bookContact').value.trim();
    const service = document.getElementById('bookService').value;
    const date = document.getElementById('bookDate').value;
    const time = document.getElementById('bookTime').value;
    const notes = document.getElementById('bookNotes').value.trim();

    if (!name || !contactInfo || !date || !time) return;

    const subject = encodeURIComponent('Booking request — ' + service);
    const body = encodeURIComponent(
      'Name: ' + name + '\n' +
      'Contact: ' + contactInfo + '\n' +
      'Service: ' + service + '\n' +
      'Preferred date: ' + date + '\n' +
      'Preferred time: ' + time + '\n' +
      'Notes: ' + (notes || '—')
    );
    window.location.href = 'mailto:drlldanny@gmail.com?subject=' + subject + '&body=' + body;
  });

  // Contact form
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', () => {
    const cName = document.getElementById('contactName').value.trim();
    const cEmail = document.getElementById('contactEmail').value.trim();
    const cMessage = document.getElementById('contactMessage').value.trim();

    if (!cName || !cEmail) return;

    const subject = encodeURIComponent('Website inquiry from ' + cName);
    const body = encodeURIComponent(
      'Name: ' + cName + '\n' +
      'Email: ' + cEmail + '\n' +
      'Message: ' + (cMessage || '—')
    );
    window.location.href = 'mailto:drlldanny@gmail.com?subject=' + subject + '&body=' + body;
  });

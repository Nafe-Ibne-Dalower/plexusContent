// ================================
// HAMBURGER / MOBILE NAV
// ================================
const hamburger = document.querySelector(".hamburger");
const mobileNav = document.querySelector(".mobile-nav");
const header = document.querySelector(".header");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileNav.classList.toggle("active");
});

document.querySelectorAll(".mobile-nav #nava, .mobile-cta").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileNav.classList.remove("active");
  });
});

document.addEventListener("click", (e) => {
  if (
    mobileNav.classList.contains("active") &&
    !mobileNav.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    hamburger.classList.remove("active");
    mobileNav.classList.remove("active");
  }
});

// ================================
// STICKY NAVBAR + ACTIVE SECTIONS
// ================================
window.addEventListener("scroll", () => {
  header.classList.toggle("sticky", window.scrollY > 100);

  document.querySelectorAll("section").forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      document.querySelectorAll("header nav a").forEach(link => link.classList.remove("active"));
      let activeLink = document.querySelector("header nav a[href*=" + id + "]");
      if (activeLink) activeLink.classList.add("active");
    }
  });
});

// ================================
// TYPED.JS
// ================================
new Typed(".multiple-text1", {
  strings: [
    "Medical Blogs",
    "Health Articles",
    "Research Content",
    "SEO Medical Writing",
  ],
  typeSpeed: 40,
  backSpeed: 70,
  backDelay: 2000,
  loop: true,
});

// ================================
// CONTACT FORM — Web3Forms
// ================================
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');
const formError   = document.getElementById('formError');

if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const btnText = submitBtn.querySelector('span');

    // Loading state
    btnText.textContent = 'Sending...';
    submitBtn.disabled  = true;
    formSuccess.style.display = 'none';
    formError.style.display   = 'none';

    const formData = new FormData(contactForm);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        // Success
        btnText.textContent    = '✓ Sent!';
        submitBtn.style.background = '#00b894';
        formSuccess.style.display  = 'block';
        contactForm.reset();

        setTimeout(() => {
          btnText.textContent        = 'Send Message';
          submitBtn.style.background = '';
          submitBtn.disabled         = false;
          formSuccess.style.display  = 'none';
        }, 4000);

      } else {
        throw new Error('Failed');
      }

    } catch(err) {
      // Error
      btnText.textContent        = '✗ Failed';
      submitBtn.style.background = '#e74c3c';
      formError.style.display    = 'block';

      setTimeout(() => {
        btnText.textContent        = 'Send Message';
        submitBtn.style.background = '';
        submitBtn.disabled         = false;
      }, 3000);
    }
  });
}

// =====================
// MEETING MODAL
// =====================
const modal = document.getElementById('meetingModal');
const openBtns = [
  document.getElementById('openModal'),
  document.getElementById('openModalMobile')
];
const closeBtn = document.getElementById('closeModal');

openBtns.forEach(btn => {
  if (btn) btn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // ADD THESE 3 LINES
    modalLoaded = false;
    document.querySelector('.meeting-modal-body').style.display = '';
    document.getElementById('modalSuccess').classList.remove('active');
  });
});

closeBtn.addEventListener('click', (e) => {
  modal.classList.remove('active');
  document.body.style.overflow = '';
});

// Close on overlay click
// modal.addEventListener('click', (e) => {
//   if (e.target === modal) {
//     modal.classList.remove('active');
//     document.body.style.overflow = '';
//   }
// });

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Detect Google Form submission
let modalLoaded = false;
const iframe = document.querySelector('.meeting-modal-frame iframe');

iframe.addEventListener('load', () => {
  if (modalLoaded) {
    document.querySelector('.meeting-modal-body').style.display = 'none';
    document.getElementById('modalSuccess').classList.add('active');
  }
  modalLoaded = true;
});
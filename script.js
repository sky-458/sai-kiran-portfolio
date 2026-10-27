document.documentElement.classList.add('js-enabled');

const EMAIL = 'Parlapalli1330@careerattainment.com';
const year = document.getElementById('current-year');
if (year) year.textContent = new Date().getFullYear();

// Responsive navigation.
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.getElementById('nav-menu');
function closeMenu() {
  if (!menuToggle || !navMenu) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation menu');
  navMenu.classList.remove('open');
}
if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    const willOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(willOpen));
    menuToggle.setAttribute('aria-label', willOpen ? 'Close navigation menu' : 'Open navigation menu');
    navMenu.classList.toggle('open', willOpen);
  });
  navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 850) closeMenu(); });
}

// Scroll reveal: fail open so content remains visible if IntersectionObserver is unavailable.
const revealItems = [...document.querySelectorAll('.reveal')];
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('is-visible'));
}

// Highlight the current section in the main navigation.
const navLinks = [...document.querySelectorAll('.nav-link')];
const navSections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window) {
  const activeObserver = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach(link => {
      const active = link.getAttribute('href') === `#${visible.target.id}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-24% 0px -62% 0px', threshold: [0, .15, .3, .5] });
  navSections.forEach(section => activeObserver.observe(section));
}

// Skill group filtering.
const skillButtons = [...document.querySelectorAll('[data-skill-filter]')];
const skillCards = [...document.querySelectorAll('[data-skill-category]')];
skillButtons.forEach(button => button.addEventListener('click', () => {
  const group = button.dataset.skillFilter;
  skillButtons.forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  skillCards.forEach(card => { card.hidden = group !== 'all' && card.dataset.skillCategory !== group; });
}));

// Project category filtering.
const projectButtons = [...document.querySelectorAll('[data-filter]')];
const projectCards = [...document.querySelectorAll('[data-project-category]')];
projectButtons.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  projectButtons.forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  projectCards.forEach(card => { card.hidden = filter !== 'all' && card.dataset.projectCategory !== filter; });
}));

// Resume-based case studies. No fabricated live demos or repository URLs are added.
const caseStudies = {
  healthcare: {
    category: 'ANALYTICS & BUSINESS INTELLIGENCE', title: 'Healthcare Data Analytics',
    intro: 'A healthcare analytics project focused on bringing multiple years of records into a cleaner, more useful reporting layer. Dashboard visuals on this website are custom illustrations, not screenshots of a deployed BI system.',
    stats: [['50K+', 'patient records cleaned and merged'], ['4', 'interactive Power BI dashboards'], ['30%', 'reduction in reporting time']],
    blocks: [
      ['Problem', 'Multi-year healthcare records need consistent preparation and clear reporting to make trend analysis more accessible.'],
      ['Approach', 'Cleaned and merged 50,000+ patient records spanning five years using Python, Pandas, and SQL, then organized the resulting metrics into interactive Power BI dashboards.'],
      ['Work completed', 'Built four dashboards for healthcare trend and KPI exploration. Developed insights to identify opportunities for a 12% improvement in predictive care accuracy.'],
      ['Tools', 'Python · Pandas · SQL · Power BI'],
      ['Outcome', 'Reporting time was reduced by 30%. The 12% predictive-care figure represents an opportunity identified in the project, not a claim of a deployed model improvement.']
    ], context: 'Privacy note: this portfolio uses no patient records. Only aggregated project details from the resume are presented.'
  },
  fincloud: {
    category: 'CLOUD SECURITY & RISK MANAGEMENT', title: 'FinCloud Capital — AWS Security',
    intro: 'A cloud-security and risk-management project using simulated breach scenarios and audit datasets to test detection and response workflows.',
    stats: [['40%', 'reduction in excessive permissions'], ['20+', 'risks covered in assessment'], ['NIST CSF', 'aligned risk assessment']],
    blocks: [
      ['Problem', 'Cloud environments benefit from clear access boundaries, audit visibility, and a structured way to review risks.'],
      ['Approach', 'Simulated breach scenarios with S3 and CloudTrail datasets to exercise detection and response workflows.'],
      ['Work completed', 'Implemented least-privilege IAM policies and delivered risk assessments aligned with the NIST Cybersecurity Framework.'],
      ['Tools', 'AWS S3 · AWS CloudTrail · IAM · NIST Cybersecurity Framework'],
      ['Outcome', 'The project reported a 40% reduction in excessive permissions across accounts and assessed more than 20 risks.']
    ], context: 'Implementation context: the project is presented as a project case study, not as evidence of an endorsement by an AWS product team or a claim that FinCloud Capital is a real employer.'
  },
  cruze: {
    category: 'PRODUCT RESEARCH & REQUIREMENTS', title: 'CLU Cruze — Campus Ride-Sharing App',
    intro: 'A proposed campus mobility solution designed around student commuting costs, safety, stakeholder needs, and practical requirements.',
    stats: [['~4,000', 'students in the target context'], ['20', 'functional + non-functional requirements'], ['15–20%', 'estimated potential cost reductions']],
    blocks: [
      ['Problem', 'Student commuting can be expensive and coordination needs to respect campus safety policies.'],
      ['Approach', 'Developed a ride-sharing solution concept for approximately 4,000 students, with requirements and stakeholder planning.'],
      ['Work completed', 'Created 14 functional and 6 non-functional requirements, a stakeholder register with 10+ roles, and a work breakdown structure with 30+ tasks. Proposed ID-based payments, emergency SOS, and live tracking.'],
      ['Tools and methods', 'Product requirements · Stakeholder analysis · Work breakdown structure · Campus mobility and safety planning'],
      ['Outcome', 'Estimated potential commuting cost reductions of 15–20%; this is an estimate for the proposed solution, not a measured result from a live deployment.']
    ], context: 'Status: proposed solution and project design. No live application or deployed service is claimed.'
  },
  erp: {
    category: 'ENTERPRISE SYSTEMS RESEARCH', title: 'ERP & Enterprise Systems Research',
    intro: 'A structured comparison of enterprise platforms to support implementation planning and risk-aware evaluation.',
    stats: [['4', 'enterprise platforms evaluated'], ['25+', 'criteria considered'], ['10–15%', 'potential savings estimate']],
    blocks: [
      ['Objective', 'Compare Workday, Yardi, SAP, and Oracle across criteria that matter during an enterprise platform decision.'],
      ['Approach', 'Evaluated platforms using more than 25 criteria, including return on investment, scalability, integration, and security.'],
      ['Work completed', 'Prepared project charters, risk registers, implementation strategies, and work breakdown structure documentation.'],
      ['Tools and methods', 'Enterprise systems evaluation · Requirements analysis · Risk management · Implementation planning'],
      ['Outcome', 'Outlined strategies associated with potential deployment cost savings of 10–15%. This was a proposed estimate, not a confirmed realized saving.']
    ], context: 'The comparison visual is an illustrative matrix, not a published ranking of the platforms.'
  },
  'ml-labs': {
    category: 'DATA SCIENCE & MACHINE LEARNING', title: 'Data Science & Machine Learning Labs',
    intro: 'Reproducible learning workflows spanning SQL-based fraud dataset analysis and classic ML benchmark datasets, linked to IBM Data Science certification work.',
    stats: [['100K+', 'records in fraud-detection dataset'], ['35%', 'improvement in query performance'], ['85–90%', 'reported accuracy on selected datasets']],
    blocks: [
      ['Objective', 'Practice data analysis and machine learning with documented workflows that can be reproduced and reviewed.'],
      ['Approach', 'Built SQL queries for a fraud-detection dataset with more than 100,000 records and developed models with the Iris and Pima Diabetes datasets.'],
      ['Work completed', 'Improved SQL query performance by 35% and documented more than five Jupyter notebook workflows on GitHub.'],
      ['Tools', 'Python · SQL · Scikit-learn · Jupyter Notebook'],
      ['Evaluation context', 'The reported 85–90% accuracy applies to the selected datasets and evaluation setup; it should not be interpreted as production performance or general clinical performance.']
    ], context: 'GitHub repository URLs were not included in the resume links available for this portfolio, so no repository link is fabricated.'
  }
};

const modal = document.getElementById('case-modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.querySelector('.modal-close');
let lastFocusedElement = null;
function openCase(key, trigger) {
  const data = caseStudies[key];
  if (!data || !modal || !modalContent) return;
  lastFocusedElement = trigger || document.activeElement;
  const stats = data.stats.map(([value,label]) => `<div class="modal-stat"><strong>${value}</strong><small>${label}</small></div>`).join('');
  const blocks = data.blocks.map(([heading,body]) => {
    if (heading === 'Tools' || heading === 'Tools and methods') {
      const tags = body.split(' · ').map(tag => `<span>${tag}</span>`).join('');
      return `<div class="modal-block"><h3>${heading}</h3><div class="modal-tech">${tags}</div></div>`;
    }
    return `<div class="modal-block"><h3>${heading}</h3><p>${body}</p></div>`;
  }).join('');
  modalContent.innerHTML = `<p class="modal-eyebrow">${data.category}</p><h2 id="modal-title">${data.title}</h2><p class="modal-intro" id="modal-intro">${data.intro}</p><div class="modal-stat-grid">${stats}</div>${blocks}<div class="modal-context">${data.context}</div>`;
  modal.hidden = false;
  document.body.classList.add('modal-open');
  modalClose?.focus();
}
function closeCase() {
  if (!modal || modal.hidden) return;
  modal.hidden = true;
  document.body.classList.remove('modal-open');
  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') lastFocusedElement.focus();
}
document.querySelectorAll('[data-open-case]').forEach(button => button.addEventListener('click', () => openCase(button.dataset.openCase, button)));
modalClose?.addEventListener('click', closeCase);
modal?.addEventListener('click', e => { if (e.target === modal) closeCase(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCase();
  if (e.key === 'Tab' && modal && !modal.hidden) {
    const focusable = [...modal.querySelectorAll('a[href],button:not([disabled]),input,textarea,[tabindex]:not([tabindex="-1"])')].filter(el => !el.hasAttribute('disabled'));
    if (!focusable.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

// Accessible, honest contact form: prepares an email draft; does not claim to send it.
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const formData = new FormData(contactForm);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const subject = String(formData.get('subject') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (formStatus) formStatus.textContent = 'Opening your default email app with a prepared draft. The message is not sent until you review and send it.';
    window.location.href = mailto;
  });
}

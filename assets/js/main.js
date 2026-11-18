/**
 * VerdeMetan - Główna logika interaktywna strony
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initDeliveryTabs();
  initFaqAccordion();
  initContactForm();
  initSmoothScroll();
});

/* ==========================================================================
   1. Nawigacja i Pasek Górny
   ========================================================================== */
function initNavbar() {
  const header = document.getElementById('main-header');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      const icon = mobileToggle.querySelector('svg');
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ==========================================================================
   2. Przełącznik Modeli Dystrybucji (Tabs)
   ========================================================================== */
function initDeliveryTabs() {
  const tabButtons = document.querySelectorAll('[data-delivery-tab]');
  const tabPanels = document.querySelectorAll('[data-delivery-panel]');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-delivery-tab');

      tabButtons.forEach(b => {
        b.classList.remove('active', 'border-emerald-500', 'text-emerald-400', 'bg-emerald-950/40');
        b.classList.add('border-transparent', 'text-slate-400');
        b.setAttribute('aria-selected', 'false');
      });

      btn.classList.add('active', 'border-emerald-500', 'text-emerald-400', 'bg-emerald-950/40');
      btn.classList.remove('border-transparent', 'text-slate-400');
      btn.setAttribute('aria-selected', 'true');

      tabPanels.forEach(panel => {
        if (panel.getAttribute('data-delivery-panel') === targetId) {
          panel.classList.remove('hidden');
          panel.classList.add('block', 'animate-fadeIn');
        } else {
          panel.classList.add('hidden');
          panel.classList.remove('block', 'animate-fadeIn');
        }
      });
    });
  });
}

/* ==========================================================================
   3. FAQ Akordeon
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const answer = item.querySelector('.faq-answer');
    const chevron = item.querySelector('.faq-chevron');

    if (!trigger || !answer) return;

    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          const otherChevron = otherItem.querySelector('.faq-chevron');
          if (otherTrigger && otherAnswer) {
            otherTrigger.setAttribute('aria-expanded', 'false');
            otherAnswer.style.maxHeight = null;
            otherItem.classList.remove('faq-open');
            if (otherChevron) otherChevron.style.transform = 'rotate(0deg)';
          }
        }
      });

      // Toggle current
      if (isExpanded) {
        trigger.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
        item.classList.remove('faq-open');
        if (chevron) chevron.style.transform = 'rotate(0deg)';
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        item.classList.add('faq-open');
        if (chevron) chevron.style.transform = 'rotate(180deg)';
      }
    });
  });
}

/* ==========================================================================
   4. Formularz Kontaktowy & Audyt Dostaw
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('audit-form');
  const toastSuccess = document.getElementById('toast-success');
  const modalSuccess = document.getElementById('modal-success');
  const modalClose = document.getElementById('modal-success-close');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic Validation
    const name = form.querySelector('[name="company_name"]');
    const email = form.querySelector('[name="email"]');
    const phone = form.querySelector('[name="phone"]');

    if (!name.value.trim() || !email.value.trim()) {
      alert('Proszę wypełnić wymagane pola: Nazwa firmy i E-mail.');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Przetwarzanie zapytania...
    `;

    // Simulate server submission
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      
      // Show confirmation modal
      if (modalSuccess) {
        modalSuccess.classList.remove('hidden');
        modalSuccess.classList.add('flex');
        document.body.style.overflow = 'hidden';
      }

      form.reset();
    }, 900);
  });

  if (modalClose && modalSuccess) {
    modalClose.addEventListener('click', () => {
      modalSuccess.classList.add('hidden');
      modalSuccess.classList.remove('flex');
      document.body.style.overflow = '';
    });
  }
}

/* ==========================================================================
   5. Smooth Scroll z kompensacją wysokości menu
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ==========================================================================
   6. Generator Karty Technicznej Biometanu (Pobieranie Specyfikacji)
   ========================================================================== */
window.downloadBiomethaneSpec = function() {
  const specText = `=======================================================================
VERDEMETAN POLSKA - KARTA CHARAKTERYSTYKI TECHNICZNEJ BIOMETANU
Zgodność z PN-EN 16723-1 / Dyrektywa RED II (2018/2001) / Grupa E (GZ-50)
=======================================================================

1. PARAMETRY FIZYKOCHEMICZNE (GRUPA E - WYSOKOMETANOWY):
- Zawartość metanu (CH4): min. 97.5% obj. (typowo 98.2% - 99.1%)
- Zawartość dwutlenku węgla (CO2): max. 1.5% obj.
- Zawartość tlenu (O2): max. 0.2% obj. (sieć dystrybucyjna) / max 0.001% (przesył)
- Wskaźnik Wobbego (Ws): 45.0 - 54.0 MJ/m3 (zgodnie z Taryfą OGP Gaz-System)
- Ciepło spalania (Hs): 38.0 - 41.5 MJ/m3 (10.5 - 11.5 kWh/m3)
- Wartość opałowa (Hi): min. 34.0 MJ/m3
- Zawartość siarki całkowitej: max. 20 mg/m3
- Zawartość H2S: max. 5 mg/m3
- Punkt rosy wody: poniżej -20°C przy ciśnieniu 5.5 MPa

2. ŚLAD WĘGLOWY I CERTYFIKACJA OZE:
- Wskaźnik emisyjności w EU ETS (Scope 1): 0.000 t CO2/MWh
- Redukcja emisji GHG w cyklu życia (LCA): od 75% do 115% vs kopalny gaz ziemny
- Certyfikacja: KZR INiG / ISCC EU / REDcert-EU
- Gwarancje Pochodzenia: Rejestr GDO Towarowej Giełdy Energii (TGE) / Urząd Regulacji Energetyki

3. MOŻLIWOŚCI ZASTĄPIENIA BEZPOŚREDNIEGO (DROP-IN):
- Kotły parowe i wodne: 100% kompatybilności, brak konieczności regulacji palników
- Turbiny i silniki kogeneracyjne CHP: 100% kompatybilności
- Piece przemysłowe (hutnictwo, ceramika, chemia): 100% kompatybilności
- Pojazdy Bio-LNG / Bio-CNG: 100% zgodności z normami Euro VI HDV

4. OBSŁUGA HANDLOWA:
VerdeMetan Sp. z o.o. | Koncesja Prezesa URE na obrót i dystrybucję paliw gazowych
kontakt@verdemetan.pl | infolinia B2B: +48 22 120 40 50
=======================================================================`;

  const blob = new Blob([specText], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'VerdeMetan-Karta-Techniczna-Biometanu.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

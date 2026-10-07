(function () {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const pad2 = (n) => String(n).padStart(2, '0');
  const hasIO = 'IntersectionObserver' in window;

  // =========================================
  // MENÚ RESPONSIVO
  // =========================================
  const toggle = $('menuToggle');
  const nav = $('navLinks');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // =========================================
  // NAVEGACIÓN ACTIVA AL DESPLAZARSE
  // =========================================
  if (hasIO && nav) {
    const navAnchors = nav.querySelectorAll('a');

    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navAnchors.forEach((a) => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
          });
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    document.querySelectorAll('section[id]').forEach((s) => activeObserver.observe(s));
  }

  // =========================================
  // ANIMACIÓN DE ELEMENTOS AL BAJAR
  // =========================================
  const revealEls = document.querySelectorAll('.reveal');

  if (hasIO) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    // Navegadores sin IntersectionObserver: mostrar todo
    revealEls.forEach((el) => el.classList.add('in'));
  }

  // =========================================
  // HERO - FONDO AUTOMÁTICO
  // =========================================
  const heroSlides = document.querySelectorAll('.hero-bg-slide');

  if (heroSlides.length > 1) {
    let heroIndex = 0;

    setInterval(() => {
      heroSlides[heroIndex].classList.remove('is-active');
      heroIndex = (heroIndex + 1) % heroSlides.length;
      heroSlides[heroIndex].classList.add('is-active');
    }, 3000);
  }

  // =========================================
  // CARRUSEL GENÉRICO (figuras y premios)
  // =========================================
  function createCarousel(items, ids, dotClass, dotLabel) {
    const img = $(ids.img);
    const title = $(ids.title);
    const desc = $(ids.desc);
    const num = $(ids.num);
    const dots = $(ids.dots);
    const prev = $(ids.prev);
    const next = $(ids.next);

    if (!items.length || !prev || !next || !img || !title || !desc || !num) return;

    let index = 0;

    function renderDots() {
      if (!dots) return;
      dots.innerHTML = '';

      items.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = dotClass + (i === index ? ' active' : '');
        dot.setAttribute('aria-label', dotLabel + (i + 1));
        dot.addEventListener('click', () => {
          index = i;
          render();
        });
        dots.appendChild(dot);
      });
    }

    function render() {
      const item = items[index];
      img.src = item.imagen;
      img.alt = item.titulo;
      title.textContent = item.titulo;
      desc.textContent = item.descripcion;
      num.textContent = pad2(index + 1) + ' / ' + pad2(items.length);
      renderDots();
    }

    prev.addEventListener('click', () => {
      index = (index - 1 + items.length) % items.length;
      render();
    });

    next.addEventListener('click', () => {
      index = (index + 1) % items.length;
      render();
    });

    render();
  }

  // =========================================
  // FIGURAS IMPORTANTES
  // =========================================
  const figuras = [
    {
      imagen: 'img/EMBAJADORA DE LOS ESTADOS UNIDOS Y EL MINISTRO LUIS MIGUE DE CAMPS.jpg',
      titulo: 'Embajadora de los Estados Unidos en República Dominicana',
      descripcion:
        'El viernes 18 de septiembre de 2026, en el marco de la ' +
        'visita oficial de la embajadora de los Estados Unidos ' +
        'al Ministerio de Educación, el Departamento de Informática ' +
        'Educativa realizó una exhibición de los recursos de ' +
        'robótica presentes en las escuelas públicas. En esta ' +
        'actividad tuvimos el honor de compartir con la embajadora ' +
        'y mostrarle nuestros proyectos.'
    },
    {
      imagen: 'img/abraham1.jpg',
      titulo: 'Abraham Dauhajre',
      descripcion:
        'Tuvimos el honor y el placer de contar con el apoyo constante de Abraham Dauhajre, ' +
        'una figura fundamental para el desarrollo de la robótica educativa y el programa FIRST ' +
        'en República Dominicana. A lo largo de nuestra trayectoria, hemos contado con su orientación, ' +
        'respaldo y acompañamiento, contribuyendo al crecimiento de nuestro equipo y a nuestra participación ' +
        'en competencias de robótica. Su compromiso con los jóvenes y con el desarrollo de la ciencia, la tecnología ' +
        'y la innovación ha sido un apoyo invaluable para nosotros.'
    },
    {
      imagen: 'img/Ancell.jpg',
      titulo: 'Ancell Scheker',
      descripcion:
        'Tuvimos el honor y el placer de contar con la visita ' +
        'a nuestras instalaciones de la Viceministra de Asuntos Técnicos y Pedagógicos ' +
        'del Ministerio de Educación de República Dominicana Ancell Scheker, ' +
        'la cual estuvo viendo nuestros proyectos y conociendo más del equipo.'
    },
    {
      imagen: 'img/Aileed decamps.jpg',
      titulo: 'Aileen Decamps',
      descripcion:
        'Como equipo tuvimos el honor de tener la visita de la Regidora de Santo Domingo Este ' +
        'Aileen Decamps, la cual es nuestra madrina y siempre podemos contar con su apoyo.'
    },
    {
      imagen: 'img/regidora2.jpg',
      titulo: 'Jehimy Esthefany Núñez Pérez',
      descripcion:
        'Tuvimos el honor de contar con su visita en nuestras instalaciones, ' +
        'y de poder encontrárnosla el día de la competencia en Miami y contar con su apoyo.'
    }
  ];

  createCarousel(
    figuras,
    {
      img: 'figuraImagen',
      title: 'figuraNombre',
      desc: 'figuraDescripcion',
      num: 'figuraNumero',
      dots: 'figuraPuntos',
      prev: 'figuraPrev',
      next: 'figuraNext'
    },
    'figura-punto',
    'Ir a la figura '
  );

  // =========================================
  // PREMIOS OBTENIDOS
  // =========================================
  const premios = [
    {
      imagen: 'img/LOGROS.jpg',
      titulo: 'Nuestros reconocimientos',
      descripcion:
        'Nuestros reconocimientos son una muestra del esfuerzo, la dedicación y el ' +
        'compromiso de todo el equipo. Cada logro refleja nuestras capacidades, el trabajo en ' +
        'conjunto y nuestras ganas de seguir creciendo, superando desafíos y alcanzando nuevas metas.'
    },
    {
      imagen: 'img/Stem For Everyone 2025.jpg',
      titulo: 'Stem For Everyone',
      descripcion:
        'En nuestro primer año 2025 tuvimos el honor de poder obtener el Stem For Everyone, un reconocimiento ' +
        'que representa nuestro compromiso con la educación STEM y con la creación de ' +
        'oportunidades para que más jóvenes puedan descubrir, aprender y crecer a través de la ciencia, ' +
        'la tecnología, la ingeniería y las matemáticas.'
    },
    {
      imagen: 'img/Spirit Award 2026.jpg',
      titulo: 'Team Spirit Award',
      descripcion:
        'En nuestro segundo año 2026, tuvimos el honor de poder obtener el Spirit Award, ' +
        'un reconocimiento que premia el entusiasmo, la unión, la energía y el espíritu de ' +
        'colaboración demostrado por un equipo durante la competencia. ' +
        'Este premio destacó nuestra pasión por la robótica, el compañerismo y la manera ' +
        'en que representamos los valores de FIRST, tanto dentro como fuera de la cancha.'
    },
    {
      imagen: 'img/Stem For Everyone 2026.jpg',
      titulo: 'Stem For Everyone',
      descripcion:
        'En nuestro segundo año 2026 pudimos obtener nuevamente el Stem For Everyone, un reconocimiento que ' +
        'reafirma nuestro compromiso con la educación STEM, la inclusión y ' +
        'el desarrollo de nuevas oportunidades para los jóvenes. Este logro refleja nuestro esfuerzo ' +
        'por inspirar, compartir conocimientos y demostrar que el talento y la innovación pueden ' +
        'transformar nuestro futuro.'
    }
  ];

  createCarousel(
    premios,
    {
      img: 'premioImagen',
      title: 'premioTitulo',
      desc: 'premioDescripcion',
      num: 'premioNumero',
      dots: 'premioPuntos',
      prev: 'premioPrev',
      next: 'premioNext'
    },
    'premio-punto',
    'Ir al premio '
  );

  // =========================================
  // FORMULARIOS (utilidades comunes)
  // =========================================
  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  // Marca/desmarca un campo y devuelve si es válido
  function check(wrapperId, valid) {
    const el = $(wrapperId);
    if (el) el.classList.toggle('invalid', !valid);
    return valid;
  }

  function showStatus(el, type, text) {
    if (!el) return;
    el.className = type;
    el.textContent = text;
  }

  // Envía el formulario a Web3Forms
  const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

  function sendForm(form) {
    const data = new FormData(form);

    // Si el bot marcó el campo trampa, no se envía
    if (data.get('botcheck')) return Promise.reject(new Error('Envío bloqueado.'));

    return fetch(WEB3FORMS_URL, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: data
    })
      .then((response) =>
        response.json().then(
          (json) => ({ ok: response.ok, status: response.status, json }),
          () => ({ ok: response.ok, status: response.status, json: {} })
        )
      )
      .then(({ ok, status, json }) => {
        if (ok && json.success) return json;
        if (status === 429) throw new Error('Has enviado demasiados mensajes. Espera un minuto e inténtalo de nuevo.');
        if (status === 400 || status === 422) throw new Error('Revisa los datos del formulario.');
        throw new Error('No pudimos enviar el mensaje. Inténtalo nuevamente.');
      })
      .catch((err) => {
        // Error de red (sin internet, bloqueado, etc.)
        if (err instanceof TypeError) throw new Error('No hay conexión. Revisa tu internet e inténtalo de nuevo.');
        throw err;
      });
  }

  // =========================================
  // LÍMITES: 500 caracteres y 3 envíos por minuto
  // =========================================
  const MAX_CHARS = 500;
  const MAX_SENDS = 3;
  const WINDOW_MS = 60 * 1000;
  const STORAGE_KEY = 'tm_envios';

  // Contador de caracteres bajo el textarea
  function addCounter(textarea) {
    if (!textarea) return;
    textarea.maxLength = MAX_CHARS;

    const counter = document.createElement('div');
    counter.style.cssText = 'margin-top:6px;text-align:right;font-size:.78rem;color:#565B68;';
    textarea.insertAdjacentElement('afterend', counter);

    const update = () => { counter.textContent = textarea.value.length + ' / ' + MAX_CHARS; };
    textarea.addEventListener('input', update);
    textarea.form.addEventListener('reset', () => setTimeout(update, 0));
    update();
  }

  addCounter($('s-mensaje'));
  addCounter($('c-msg'));

  // Devuelve true (y avisa) si ya se alcanzó el límite; si no, registra el envío
  function rateLimited(statusEl) {
    const now = Date.now();
    let sends = [];

    try {
      sends = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
        .filter((t) => now - t < WINDOW_MS);
    } catch (err) {
      sends = [];
    }

    if (sends.length >= MAX_SENDS) {
      const wait = Math.ceil((WINDOW_MS - (now - sends[0])) / 1000);
      showStatus(statusEl, 'bad', 'Has enviado demasiados mensajes. Espera ' + wait + ' segundos e inténtalo de nuevo.');
      return true;
    }

    sends.push(now);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(sends)); } catch (err) { /* sin storage */ }
    return false;
  }

  // =========================================
  // FORMULARIO DE PATROCINIO
  // =========================================
  const sponsorForm = $('sponsorForm');

  if (sponsorForm) {
    const pills = () => document.querySelectorAll('#tipoGroup .radio-pill');

    // Selección visual del tipo
    document.querySelectorAll('.radio-pill input').forEach((input) => {
      input.addEventListener('change', () => {
        pills().forEach((p) => p.classList.remove('checked'));
        const pill = input.closest('.radio-pill');
        if (pill) pill.classList.add('checked');
        const tipo = $('f-tipo');
        if (tipo) tipo.classList.remove('invalid');
      });
    });

    sponsorForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombre = $('s-nombre');
      const correo = $('s-correo');
      const tipo = sponsorForm.querySelector('input[name="tipo"]:checked');
      const status = $('formStatus');

      const results = [
        check('f-nombre', !!nombre && nombre.value.trim() !== ''),
        check('f-correo', !!correo && isEmail(correo.value.trim())),
        check('f-tipo', !!tipo)
      ];

      if (results.includes(false)) {
        showStatus(status, 'bad', 'Revisa los campos marcados en rojo antes de enviar.');
        return;
      }

      if (rateLimited(status)) return;

      // Guardar valores antes de resetear el formulario
      const nombreVal = nombre.value.trim();
      const correoVal = correo.value.trim();
      const tipoVal = tipo.value.toLowerCase();

      const btn = sponsorForm.querySelector('.submit-btn');
      if (btn) { btn.disabled = true; btn.textContent = 'Enviando...'; }

      sendForm(sponsorForm)
        .then(() => {
          showStatus(
            status,
            'ok',
            '¡Gracias, ' + nombreVal + '! Recibimos tu solicitud de ' + tipoVal +
              ' y te contactaremos pronto a ' + correoVal + '.'
          );
          sponsorForm.reset();
          pills().forEach((p) => p.classList.remove('checked'));
        })
        .catch((err) => showStatus(status, 'bad', err.message))
        .finally(() => { if (btn) { btn.disabled = false; btn.textContent = 'Enviar solicitud'; } });
    });
  }

  // =========================================
  // FORMULARIO DE CONTACTO
  // =========================================
  const contactForm = $('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombre = $('c-name');
      const correo = $('c-mail');
      const mensaje = $('c-msg');
      const status = $('contactStatus');

      const results = [
        check('c-nombre', !!nombre && nombre.value.trim() !== ''),
        check('c-correo', !!correo && isEmail(correo.value.trim())),
        check('c-mensaje', !!mensaje && mensaje.value.trim() !== '' && mensaje.value.length <= MAX_CHARS)
      ];

      if (results.includes(false)) {
        showStatus(status, 'bad', 'Completa los campos marcados en rojo.');
        return;
      }

      if (rateLimited(status)) return;

      const correoVal = correo.value.trim();

      const btn = contactForm.querySelector('.submit-btn');
      if (btn) { btn.disabled = true; btn.textContent = 'Enviando...'; }

      sendForm(contactForm)
        .then(() => {
          showStatus(status, 'ok', '¡Mensaje enviado! Te responderemos pronto a ' + correoVal + '.');
          contactForm.reset();
        })
        .catch((err) => showStatus(status, 'bad', err.message))
        .finally(() => { if (btn) { btn.disabled = false; btn.textContent = 'Enviar mensaje'; } });
    });
  }

  // =========================================
  // SUBMENÚS: hover en PC, toque en celular
  // =========================================
  const esPC = window.matchMedia('(min-width: 901px) and (hover: hover)');

  document.querySelectorAll('details.has-sub').forEach((menu) => {
    const open = () => { if (esPC.matches) menu.open = true; };
    const close = () => { if (esPC.matches) menu.open = false; };

    menu.addEventListener('mouseenter', open);
    menu.addEventListener('mouseleave', close);
    menu.addEventListener('focusin', open);

    menu.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') menu.open = false;
    });

    // En PC el clic no debe cerrarlo justo después de abrirlo con el mouse
    const resumen = menu.querySelector('summary');
    if (resumen) {
      resumen.addEventListener('click', (e) => {
        if (esPC.matches) e.preventDefault();
      });
    }
  });

  // =========================================
  // CARRUSEL DE PATROCINADORES
  // =========================================
  (function sponsorsMarquee() {
    const marquee = document.querySelector('.sponsors-marquee');
    const track = marquee && marquee.querySelector('.sponsors-track');
    if (!track) return;

    const SPEED = 30; // píxeles por segundo (más alto = más rápido)
    const originals = Array.from(track.children);
    let setWidth = 0;
    let x = 0;
    let last = 0;
    let paused = false;

    // Duplica los logos hasta cubrir el ancho visible + un ciclo completo
    function build() {
      track.querySelectorAll('[data-clone]').forEach((n) => n.remove());
      x = 0;
      setWidth = track.offsetWidth;
      if (!setWidth) return;

      while (track.offsetWidth < marquee.offsetWidth + setWidth) {
        originals.forEach((img) => {
          const copy = img.cloneNode();
          copy.alt = '';
          copy.setAttribute('aria-hidden', 'true');
          copy.setAttribute('data-clone', '');
          track.appendChild(copy);
        });
      }
    }

    function tick(t) {
      const dt = Math.min((t - (last || t)) / 1000, 0.1);
      last = t;

      if (!paused && setWidth) {
        x -= SPEED * dt;
        if (-x >= setWidth) x += setWidth; // reinicio invisible
        track.style.transform = 'translateX(' + x + 'px)';
      }
      requestAnimationFrame(tick);
    }

    marquee.addEventListener('mouseenter', () => { paused = true; });
    marquee.addEventListener('mouseleave', () => { paused = false; });
    marquee.addEventListener('touchstart', () => { paused = true; }, { passive: true });
    marquee.addEventListener('touchend', () => { paused = false; });

    window.addEventListener('resize', build);

    // Espera a que carguen las imágenes para medir bien los anchos
    const start = () => {
      build();
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        requestAnimationFrame(tick);
      }
    };

    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start);
  })();


})();

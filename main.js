/* ─── LOADER ─── */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('done'), 1600);
});

/* ─── CURSOR ─── */
const cur = document.getElementById('cur');
const dot = document.getElementById('cur-dot');
const ring = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

(function animCursor() {
  rx += (mx - rx) * .12;
  ry += (my - ry) * .12;
  cur.style.left = mx + 'px';
  cur.style.top = my + 'px';
  ring.style.left = (rx - 19) + 'px';
  ring.style.top = (ry - 19) + 'px';
  requestAnimationFrame(animCursor);
})();

document.querySelectorAll('a,button,.svc-item,.proj-card,.vision-card,.proc-card,.t-item').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

/* ─── NAV ─── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 60));

/* ─── SCROLL REVEAL ─── */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('vis');
      obs.unobserve(e.target);
    }
  });
}, { threshold: .1 });

document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale').forEach(el => obs.observe(el));

/* ─── COUNTERS ─── */
function animCount(el) {
  const target = +el.dataset.count;
  const suf = el.dataset.suf || '';
  let c = 0;
  const step = target / 50;
  const iv = setInterval(() => {
    c = Math.min(c + step, target);
    el.textContent = Math.round(c) + suf;
    if (c >= target) clearInterval(iv);
  }, 30);
}

const countObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animCount(e.target);
      countObs.unobserve(e.target);
    }
  });
}, { threshold: .5 });

document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));

/* ─── SMOOTH SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ─── EASTER EGG: KONAMI ─── */
const K = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let ki = 0;

document.addEventListener('keydown', e => {
  if (e.keyCode === K[ki]) {
    ki++;
    if (ki === K.length) { openEgg(); ki = 0; }
  } else {
    ki = 0;
  }
});

let lc = 0, lt;

document.querySelector('.logo').addEventListener('click', () => {
  lc++; clearTimeout(lt);
  lt = setTimeout(() => lc = 0, 1400);
  if (lc >= 5) { openEgg(); lc = 0; }
});

document.querySelector('.foot-logo').addEventListener('click', () => {
  lc++; clearTimeout(lt);
  lt = setTimeout(() => lc = 0, 1400);
  if (lc >= 5) { openEgg(); lc = 0; }
});

function openEgg() { document.getElementById('egg').classList.add('on'); }
function closeEgg() { document.getElementById('egg').classList.remove('on'); }

document.getElementById('egg').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeEgg();
});

/* ─── HAMBURGER MENU ─── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMenu(open) {
  hamburger.classList.toggle('open', open);
  mobileMenu.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

hamburger.addEventListener('click', () => toggleMenu(!hamburger.classList.contains('open')));

document.querySelectorAll('.mobile-link').forEach(a => {
  a.addEventListener('click', () => toggleMenu(false));
});

/* ─── PARALLAX HERO BG TEXT ─── */
document.addEventListener('scroll', () => {
  const bg = document.querySelector('.hero-bg-text');
  if (bg) bg.style.transform = `translate(-50%,calc(-50% + ${scrollY * .18}px)) scale(1)`;
});

/* ─── HOVER TILT on proj cards ─── */
document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `translateY(-6px) perspective(800px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

/* ─── TRADUCCIONES ─── */
const translations = {
  es: {
    /* Nav */
    'nav-vision': 'Visión', 'nav-services': 'Servicios', 'nav-projects': 'Proyectos',
    'nav-process': 'Proceso', 'nav-contact': 'Contacto',
    /* Hero */
    'hero-eyebrow': 'Security & Technology Consulting — El Salvador',
    'hero-desc': 'Arquitectura de seguridad integrada que combina inteligencia artificial, protección física y monitoreo continuo en un solo ecosistema para microempresas.',
    'hero-label': 'Proyectos IA activos',
    'hero-stat-1': 'Integrado', 'hero-stat-2': 'Monitoreo',
    /* Vision */
    'sec-label-01': 'Nuestra Propuesta',
    'sec-title-01': 'SEGURIDAD<br>INTELIGENTE',
    'sec-sub-01': 'Muchas microempresas carecen de sistemas de seguridad integrados. Las soluciones fragmentadas generan vulnerabilidades. Nosotros centralizamos la gestión de riesgos con tecnología real.',
    'vc-title-1': 'El Problema',  'vc-p-1': 'Las microempresas enfrentan riesgos laborales y tecnológicos sin sistemas unificados. Soluciones fragmentadas crean vulnerabilidades y baja eficiencia operativa.',
    'vc-title-2': 'La Visión',    'vc-p-2': 'Ser la empresa líder en consultoría de seguridad inteligente en la región, reconocida por innovar en sistemas integrados de protección que realmente funcionen.',
    'vc-title-3': 'La Solución',  'vc-p-3': 'Arquitectura centralizada que unifica diagnóstico de riesgos, tecnologías IA (QR, biometría, computer vision) y monitoreo continuo bajo modelo SaaS.',
    'vc-title-4': 'El Impacto',   'vc-p-4': 'Detección temprana de riesgos, control de accesos, prevención de accidentes y mantenimiento proactivo. Todo en un ecosistema que optimiza recursos desde el día uno.',
    /* Services */
    'sec-label-02': 'Servicios',
    'sec-title-02': 'LO QUE<br>OFRECEMOS',
    'sec-sub-02': 'Desde el diagnóstico inicial hasta el monitoreo continuo, cada etapa diseñada para proteger tu empresa con tecnología de vanguardia.',
    'svc-title-1': 'Diagnóstico de Riesgos',      'svc-desc-1': 'Evaluación integral de vulnerabilidades físicas y tecnológicas. Identificamos puntos ciegos antes de que se conviertan en incidentes reales.',
    'svc-title-2': 'Cámaras con IA',              'svc-desc-2': 'Sistemas de video inteligente con análisis en tiempo real, detección de comportamientos anómalos y alertas automáticas.',
    'svc-title-3': 'Reconocimiento Facial',        'svc-desc-3': 'Control de acceso biométrico de alta precisión. Registro automático de entrada y salida con detección de intrusos en tiempo real.',
    'svc-title-4': 'Control QR / Código de Barra','svc-desc-4': 'Registro y control de acceso mediante QR y barras. Gestión de inventarios, asistencia y trazabilidad de activos empresariales.',
    'svc-title-5': 'Monitoreo SaaS 24/7',          'svc-desc-5': 'Plataforma en la nube para supervisión continua. Dashboards en tiempo real, reportes automáticos y acceso desde cualquier dispositivo.',
    'svc-title-6': 'Mantenimiento Preventivo',     'svc-desc-6': 'Programa proactivo para equipos tecnológicos. Garantizamos que tu inversión funcione siempre al máximo rendimiento.',
    /* Projects */
    'sec-label-03': 'Proyectos Desarrollados',
    'sec-title-03': 'LO QUE HEMOS<br>CONSTRUIDO',
    'sec-sub-03': 'Sistemas reales funcionando. Cada proyecto, una solución específica a problemas concretos de seguridad laboral.',
    'proj-title-1': 'SISTEMA DE REGISTRO DE ASISTENCIA INSTITUCIONAL',
    'proj-desc-1': 'Solución completa que automatiza el registro de entrada y salida del personal. Integra lectores QR y reconocimiento facial para garantizar precisión y eliminar el fraude. Reportes automáticos y alertas en tiempo real para recursos humanos.',
    'proj-badge-1': 'Completado',
    'proj-title-2': 'DETECCIÓN DE MASCARILLAS CON IA',
    'proj-desc-2': 'Visión artificial que verifica en tiempo real el uso correcto del EPP. Genera alertas inmediatas ante incumplimientos.',
    'proj-title-3': 'DETECCIÓN DE CASCOS PARA CONSTRUCCIÓN',
    'proj-desc-3': 'Modelo IA entrenado para identificar el uso de cascos en zonas de construcción. Compatible con CCTV existente.',
    'proj-title-4': 'SISTEMA PARA DISCAPACIDAD VISUAL',
    'proj-desc-4': 'Describe imágenes en audio, detecta objetos peligrosos y emite alertas auditivas. Diseñado para autonomía e inclusión.',
    'proj-title-5': 'EMERGENCIA POR SEÑAL DE MANO',
    'proj-desc-5': 'Reconocimiento de gestos que detecta señales de socorro. Alerta automática a servicios de emergencia en segundos sin que la persona pueda hablar.',
    /* Process */
    'sec-label-04': 'Proceso',
    'sec-title-04': 'CÓMO<br>TRABAJAMOS',
    'sec-sub-04': 'Un proceso claro y estructurado que garantiza resultados medibles desde el primer día de implementación.',
    'proc-step-1': '// PASO 01', 'proc-title-1': 'DIAGNÓSTICO',     'proc-desc-1': 'Evaluación de riesgos y levantamiento de necesidades específicas de la empresa y su entorno.',
    'proc-step-2': '// PASO 02', 'proc-title-2': 'DISEÑO',          'proc-desc-2': 'Arquitectura personalizada según el perfil de riesgo y presupuesto disponible de la organización.',
    'proc-step-3': '// PASO 03', 'proc-title-3': 'IMPLEMENTACIÓN',  'proc-desc-3': 'Despliegue de tecnologías inteligentes integradas con sistemas existentes sin interrupciones.',
    'proc-step-4': '// PASO 04', 'proc-title-4': 'MONITOREO',       'proc-desc-4': 'Supervisión continua 24/7 con reportes, alertas automáticas y mantenimiento proactivo incluido.',
    /* Contact */
    'sec-label-05': 'Contáctanos',
    'contact-cta': '¿LISTO<br>PARA<br><span>PROTEGER</span><br>TU<br>EMPRESA?',
    'cinfo-label-1': 'País',      'cinfo-country': 'El Salvador, Centroamérica',
    'cinfo-label-2': 'Servicio',  'cinfo-service': 'Consultoría sin costo inicial',
    'cinfo-label-3': 'Modelo',    'cinfo-model': 'SaaS · Escalable · IA incluida',
    'form-label-nombre': 'Nombre', 'form-placeholder-nombre': 'Tu nombre completo',
    'form-label-empresa': 'Empresa','form-placeholder-empresa': 'Nombre de tu empresa',
    'form-label-email': 'Email',
    'form-label-tel': 'Teléfono', 'form-placeholder-tel': '+503 0000-0000',
    'form-label-servicio': 'Servicio de interés',
    'form-select-default': 'Selecciona un servicio...',
    'form-select-1': 'Diagnóstico de Riesgos', 'form-select-2': 'Cámaras con IA',
    'form-select-3': 'Reconocimiento Facial',  'form-select-4': 'Control QR / Código de Barra',
    'form-select-5': 'Monitoreo SaaS 24/7',    'form-select-6': 'Sistema integral completo',
    'form-label-msg': 'Mensaje',  'form-placeholder-msg': 'Cuéntanos sobre los desafíos de seguridad que enfrenta tu empresa...',
    'form-btn': 'ENVIAR SOLICITUD →',
    /* VSL */
    'nav-vsl': 'Visión Sin Límites',
    'vsl-sec-label': 'Programa Social',
    'vsl-sec-title': 'VISIÓN SIN<br><span class="vsl-accent">LÍMITES</span>',
    'vsl-sec-sub': 'Tecnología al servicio de quienes más lo necesitan. Un compromiso real con la inclusión y la autonomía.',
    'vsl-tag': '// PROGRAMA DE IMPACTO SOCIAL',
    'vsl-intro': '<strong>Visión Sin Límites</strong> es nuestro programa dedicado a desarrollar tecnología de inteligencia artificial accesible para personas con discapacidad visual. Creemos que la innovación debe ser inclusiva — y estamos construyendo las herramientas para hacerlo posible.',
    'vsl-feat-title-1': 'Descripción de entorno en audio',
    'vsl-feat-desc-1': 'La IA analiza la cámara en tiempo real y describe el entorno mediante voz sintetizada, permitiendo al usuario navegar con seguridad.',
    'vsl-feat-title-2': 'Detección de obstáculos y peligros',
    'vsl-feat-desc-2': 'Alertas auditivas inmediatas ante objetos, escaleras, vehículos o cualquier obstáculo detectado en el campo visual del usuario.',
    'vsl-feat-title-3': 'Lectura de texto e imágenes',
    'vsl-feat-desc-3': 'Reconocimiento óptico de caracteres que transforma cualquier texto impreso — letreros, documentos, etiquetas — en información auditiva al instante.',
    'vsl-feat-title-4': 'Diseñado con y para la comunidad',
    'vsl-feat-desc-4': 'Desarrollado en colaboración directa con personas con discapacidad visual para garantizar que cada función responda a necesidades reales.',
    'vsl-impact-header': 'IMPACTO DEL PROGRAMA',
    'vsl-stat-label-1': 'personas con discapacidad visual en el mundo',
    'vsl-stat-label-2': 'sin costo para personas beneficiarias',
    'vsl-stat-label-3': 'visión artificial e inteligencia de voz integradas',
    'vsl-quote': 'La tecnología más poderosa es aquella que devuelve autonomía a quienes se la han visto arrebatada.',
    'vsl-cta': 'CONOCER MÁS DEL PROGRAMA →',
    /* Footer */
    'foot-link-1': 'Visión', 'foot-link-2': 'Servicios', 'foot-link-3': 'Proyectos', 'foot-link-4': 'Visión Sin Límites', 'foot-link-5': 'Contacto',
    /* Lang toggle */
    'flag': '🇺🇸', 'lang-label': 'EN'
  },
  en: {
    /* Nav */
    'nav-vision': 'Vision', 'nav-services': 'Services', 'nav-projects': 'Projects',
    'nav-process': 'Process', 'nav-contact': 'Contact',
    /* Hero */
    'hero-eyebrow': 'Security & Technology Consulting — El Salvador',
    'hero-desc': 'Integrated security architecture combining artificial intelligence, physical protection, and continuous monitoring in a single ecosystem for micro-enterprises.',
    'hero-label': 'Active AI Projects',
    'hero-stat-1': 'Integrated', 'hero-stat-2': 'Monitoring',
    /* Vision */
    'sec-label-01': 'Our Proposal',
    'sec-title-01': 'INTELLIGENT<br>SECURITY',
    'sec-sub-01': 'Many micro-enterprises lack integrated security systems. Fragmented solutions create vulnerabilities. We centralize risk management with real technology.',
    'vc-title-1': 'The Problem', 'vc-p-1': 'Micro-enterprises face labor and technology risks without unified systems. Fragmented solutions create vulnerabilities and low operational efficiency.',
    'vc-title-2': 'The Vision',  'vc-p-2': 'To be the leading intelligent security consulting company in the region, recognized for innovating in integrated protection systems that actually work.',
    'vc-title-3': 'The Solution','vc-p-3': 'Centralized architecture that unifies risk diagnosis, AI technologies (QR, biometrics, computer vision), and continuous monitoring under a SaaS model.',
    'vc-title-4': 'The Impact',  'vc-p-4': 'Early risk detection, access control, accident prevention, and proactive maintenance. All in an ecosystem that optimizes resources from day one.',
    /* Services */
    'sec-label-02': 'Services',
    'sec-title-02': 'WHAT WE<br>OFFER',
    'sec-sub-02': 'From initial assessment to continuous monitoring, every stage designed to protect your business with cutting-edge technology.',
    'svc-title-1': 'Risk Assessment',        'svc-desc-1': 'Comprehensive evaluation of physical and technological vulnerabilities. We identify blind spots before they become real incidents.',
    'svc-title-2': 'AI Cameras',             'svc-desc-2': 'Smart video systems with real-time analysis, anomalous behavior detection, and automatic alerts.',
    'svc-title-3': 'Facial Recognition',     'svc-desc-3': 'High-precision biometric access control. Automatic check-in/out recording with real-time intruder detection.',
    'svc-title-4': 'QR / Barcode Control',   'svc-desc-4': 'Access registration and control via QR and barcodes. Inventory management, attendance, and asset traceability.',
    'svc-title-5': 'SaaS Monitoring 24/7',   'svc-desc-5': 'Cloud platform for continuous monitoring. Real-time dashboards, automatic reports, and access from any device.',
    'svc-title-6': 'Preventive Maintenance', 'svc-desc-6': 'Proactive program for technological equipment. We ensure your investment always runs at peak performance.',
    /* Projects */
    'sec-label-03': 'Developed Projects',
    'sec-title-03': 'WHAT WE HAVE<br>BUILT',
    'sec-sub-03': 'Real systems running. Each project, a specific solution to concrete workplace security problems.',
    'proj-title-1': 'INSTITUTIONAL ATTENDANCE REGISTRATION SYSTEM',
    'proj-desc-1': 'Complete solution that automates staff check-in and check-out. Integrates QR readers and facial recognition to ensure accuracy and eliminate fraud. Automatic reports and real-time alerts for HR.',
    'proj-badge-1': 'Completed',
    'proj-title-2': 'MASK DETECTION WITH AI',
    'proj-desc-2': 'Computer vision that verifies correct PPE usage in real time. Generates immediate alerts for non-compliance.',
    'proj-title-3': 'HELMET DETECTION FOR CONSTRUCTION',
    'proj-desc-3': 'AI model trained to identify helmet use in construction zones. Compatible with existing CCTV.',
    'proj-title-4': 'VISUAL IMPAIRMENT SYSTEM',
    'proj-desc-4': 'Describes images in audio, detects dangerous objects, and emits auditory alerts. Designed for autonomy and inclusion.',
    'proj-title-5': 'EMERGENCY HAND SIGNAL',
    'proj-desc-5': 'Gesture recognition that detects distress signals. Automatic alert to emergency services in seconds without the person needing to speak.',
    /* Process */
    'sec-label-04': 'Process',
    'sec-title-04': 'HOW WE<br>WORK',
    'sec-sub-04': 'A clear and structured process that guarantees measurable results from the first day of implementation.',
    'proc-step-1': '// STEP 01', 'proc-title-1': 'DIAGNOSIS',       'proc-desc-1': 'Risk assessment and identification of the company\'s specific needs and environment.',
    'proc-step-2': '// STEP 02', 'proc-title-2': 'DESIGN',          'proc-desc-2': 'Custom architecture based on the organization\'s risk profile and available budget.',
    'proc-step-3': '// STEP 03', 'proc-title-3': 'IMPLEMENTATION',  'proc-desc-3': 'Deployment of smart technologies integrated with existing systems without interruptions.',
    'proc-step-4': '// STEP 04', 'proc-title-4': 'MONITORING',      'proc-desc-4': 'Continuous 24/7 supervision with reports, automatic alerts, and proactive maintenance included.',
    /* Contact */
    'sec-label-05': 'Contact Us',
    'contact-cta': 'READY<br>TO<br><span>PROTECT</span><br>YOUR<br>BUSINESS?',
    'cinfo-label-1': 'Country',  'cinfo-country': 'El Salvador, Central America',
    'cinfo-label-2': 'Service',  'cinfo-service': 'Free initial consultation',
    'cinfo-label-3': 'Model',    'cinfo-model': 'SaaS · Scalable · AI included',
    'form-label-nombre': 'Name',    'form-placeholder-nombre': 'Your full name',
    'form-label-empresa': 'Company','form-placeholder-empresa': 'Your company name',
    'form-label-email': 'Email',
    'form-label-tel': 'Phone',      'form-placeholder-tel': '+503 0000-0000',
    'form-label-servicio': 'Service of interest',
    'form-select-default': 'Select a service...',
    'form-select-1': 'Risk Assessment',       'form-select-2': 'AI Cameras',
    'form-select-3': 'Facial Recognition',    'form-select-4': 'QR / Barcode Control',
    'form-select-5': 'SaaS Monitoring 24/7',  'form-select-6': 'Full integrated system',
    'form-label-msg': 'Message', 'form-placeholder-msg': 'Tell us about the security challenges your company faces...',
    'form-btn': 'SEND REQUEST →',
    /* VSL */
    'nav-vsl': 'Vision Without Limits',
    'vsl-sec-label': 'Social Program',
    'vsl-sec-title': 'VISION WITHOUT<br><span class="vsl-accent">LIMITS</span>',
    'vsl-sec-sub': 'Technology at the service of those who need it most. A real commitment to inclusion and autonomy.',
    'vsl-tag': '// SOCIAL IMPACT PROGRAM',
    'vsl-intro': '<strong>Vision Without Limits</strong> is our program dedicated to developing accessible artificial intelligence technology for people with visual impairments. We believe innovation must be inclusive — and we are building the tools to make it happen.',
    'vsl-feat-title-1': 'Audio environment description',
    'vsl-feat-desc-1': 'The AI analyzes the camera in real time and describes the environment through synthesized voice, allowing the user to navigate safely.',
    'vsl-feat-title-2': 'Obstacle and hazard detection',
    'vsl-feat-desc-2': 'Immediate audio alerts for objects, stairs, vehicles, or any obstacle detected in the user\'s field of view.',
    'vsl-feat-title-3': 'Text and image reading',
    'vsl-feat-desc-3': 'Optical character recognition that instantly transforms any printed text — signs, documents, labels — into auditory information.',
    'vsl-feat-title-4': 'Designed with and for the community',
    'vsl-feat-desc-4': 'Developed in direct collaboration with visually impaired people to ensure every feature responds to real needs.',
    'vsl-impact-header': 'PROGRAM IMPACT',
    'vsl-stat-label-1': 'people with visual impairment worldwide',
    'vsl-stat-label-2': 'free of charge for beneficiaries',
    'vsl-stat-label-3': 'computer vision and voice AI integrated',
    'vsl-quote': 'The most powerful technology is the one that gives back autonomy to those who have been deprived of it.',
    'vsl-cta': 'LEARN MORE ABOUT THE PROGRAM →',
    /* Footer */
    'foot-link-1': 'Vision', 'foot-link-2': 'Services', 'foot-link-3': 'Projects', 'foot-link-4': 'Vision Without Limits', 'foot-link-5': 'Contact',
    /* Lang toggle */
    'flag': '🇸🇻', 'lang-label': 'ES'
  }
};

let currentLang = 'es';

function applyLang(lang) {
  const t = translations[lang];

  const set = (sel, key, prop = 'textContent') => {
    const el = document.querySelector(sel);
    if (!el || t[key] === undefined) return;
    if (prop === 'innerHTML') el.innerHTML = t[key];
    else el[prop] = t[key];
  };

  // ── NAV desktop + mobile ──
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(a => {
    const href = a.getAttribute('href');
    if (href === '#vision') a.textContent = t['nav-vision'];
    else if (href === '#services') a.textContent = t['nav-services'];
    else if (href === '#projects') a.textContent = t['nav-projects'];
    else if (href === '#vision-sin-limites') a.textContent = t['nav-vsl'];
    else if (href === '#process') a.textContent = t['nav-process'];
    else if (href === '#contact') a.textContent = t['nav-contact'];
  });
  document.querySelectorAll('.mobile-link').forEach(a => {
    const href = a.getAttribute('href');
    if (href === '#vision') a.textContent = t['nav-vision'];
    else if (href === '#services') a.textContent = t['nav-services'];
    else if (href === '#projects') a.textContent = t['nav-projects'];
    else if (href === '#vision-sin-limites') a.textContent = t['nav-vsl'];
    else if (href === '#process') a.textContent = t['nav-process'];
    else if (href === '#contact') a.textContent = t['nav-contact'];
  });

  // ── HERO ──
  set('.hero-eyebrow', 'hero-eyebrow');
  set('.hero-desc', 'hero-desc');
  set('.hero-big-label', 'hero-label');
  const hstatLabels = document.querySelectorAll('.hstat-label');
  if (hstatLabels[0]) hstatLabels[0].textContent = t['hero-stat-1'];
  if (hstatLabels[1]) hstatLabels[1].textContent = t['hero-stat-2'];

  // ── VISION ──
  const visionLabel = document.querySelector('#vision .sec-label');
  if (visionLabel) visionLabel.innerHTML = t['sec-label-01'] + ' <span class="sec-num">01</span>';
  set('#vision .sec-title', 'sec-title-01', 'innerHTML');
  set('#vision .sec-subtitle', 'sec-sub-01');
  document.querySelectorAll('.vision-card').forEach((c, i) => {
    const n = i + 1;
    const h3 = c.querySelector('h3');
    const p  = c.querySelector('p');
    if (h3) h3.textContent = t[`vc-title-${n}`];
    if (p)  p.textContent  = t[`vc-p-${n}`];
  });

  // ── SERVICES ──
  const servicesLabel = document.querySelector('#services .sec-label');
  if (servicesLabel) servicesLabel.innerHTML = t['sec-label-02'] + ' <span class="sec-num" style="color:rgba(200,168,75,.4)">02</span>';
  set('#services .sec-title', 'sec-title-02', 'innerHTML');
  set('#services .sec-subtitle', 'sec-sub-02');
  document.querySelectorAll('.svc-item').forEach((item, i) => {
    const n = i + 1;
    const title = item.querySelector('.svc-title');
    const desc  = item.querySelector('.svc-desc');
    if (title) title.textContent = t[`svc-title-${n}`];
    if (desc)  desc.textContent  = t[`svc-desc-${n}`];
  });

  // ── PROJECTS ──
  const projectsLabel = document.querySelector('#projects .sec-label');
  if (projectsLabel) projectsLabel.innerHTML = t['sec-label-03'] + ' <span class="sec-num">03</span>';
  set('#projects .sec-title', 'sec-title-03', 'innerHTML');
  const projSubtitle = document.querySelector('#projects .wrap .sec-subtitle');
  if (projSubtitle) projSubtitle.textContent = t['sec-sub-03'];

  // Proyecto featured (proj-feat) — índice 1
  const featCard = document.querySelector('.proj-feat');
  if (featCard) {
    const titleEl = featCard.querySelector('.proj-title');
    const descEl  = featCard.querySelector('.proj-desc');
    const badge   = featCard.querySelector('.proj-badge.pb-done');
    if (titleEl) titleEl.textContent = t['proj-title-1'];
    if (descEl)  descEl.textContent  = t['proj-desc-1'];
    if (badge)   badge.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> ${t['proj-badge-1']}`;
  }

  // Proyectos en .proj-row (índices 2-5)
  document.querySelectorAll('.proj-row .proj-card').forEach((card, i) => {
    const n = i + 2;
    const titleEl = card.querySelector('.proj-title');
    const descEl  = card.querySelector('.proj-desc');
    if (titleEl && t[`proj-title-${n}`]) titleEl.textContent = t[`proj-title-${n}`];
    if (descEl  && t[`proj-desc-${n}`])  descEl.textContent  = t[`proj-desc-${n}`];
  });

  // ── PROCESS ──
  const processLabel = document.querySelector('#process .sec-label');
  if (processLabel) processLabel.innerHTML = t['sec-label-04'] + ' <span class="sec-num" style="color:rgba(26,111,232,.3)">04</span>';
  set('#process .sec-title', 'sec-title-04', 'innerHTML');
  set('#process .sec-subtitle', 'sec-sub-04');
  document.querySelectorAll('.proc-card').forEach((card, i) => {
    const n = i + 1;
    const stepEl  = card.querySelector('.proc-step-num');
    const titleEl = card.querySelector('.proc-title');
    const descEl  = card.querySelector('.proc-desc');
    if (stepEl  && t[`proc-step-${n}`])  stepEl.textContent  = t[`proc-step-${n}`];
    if (titleEl && t[`proc-title-${n}`]) titleEl.textContent = t[`proc-title-${n}`];
    if (descEl  && t[`proc-desc-${n}`])  descEl.textContent  = t[`proc-desc-${n}`];
  });

  // ── CONTACT ──
  const contactLabel = document.querySelector('#contact .sec-label');
  if (contactLabel) contactLabel.innerHTML = t['sec-label-05'] + ' <span class="sec-num">05</span>';
  set('.contact-big-text', 'contact-cta', 'innerHTML');
  const cinfoLabels = document.querySelectorAll('.cinfo-label');
  const cinfoVals   = document.querySelectorAll('.cinfo-val');
  if (cinfoLabels[0]) cinfoLabels[0].textContent = t['cinfo-label-1'];
  if (cinfoLabels[1]) cinfoLabels[1].textContent = t['cinfo-label-2'];
  if (cinfoLabels[2]) cinfoLabels[2].textContent = t['cinfo-label-3'];
  if (cinfoVals[0])   cinfoVals[0].textContent   = t['cinfo-country'];
  if (cinfoVals[1])   cinfoVals[1].textContent   = t['cinfo-service'];
  if (cinfoVals[2])   cinfoVals[2].textContent   = t['cinfo-model'];

  // ── FORM ──
  const labelFor = (id) => document.querySelector(`label[for="${id}"]`);
  if (labelFor('nombre'))   labelFor('nombre').textContent   = t['form-label-nombre'];
  if (labelFor('empresa'))  labelFor('empresa').textContent  = t['form-label-empresa'];
  if (labelFor('email'))    labelFor('email').textContent    = t['form-label-email'];
  if (labelFor('telefono')) labelFor('telefono').textContent = t['form-label-tel'];
  if (labelFor('servicio')) labelFor('servicio').textContent = t['form-label-servicio'];
  if (labelFor('mensaje'))  labelFor('mensaje').textContent  = t['form-label-msg'];

  const nombre   = document.getElementById('nombre');
  const empresa  = document.getElementById('empresa');
  const telefono = document.getElementById('telefono');
  const mensaje  = document.getElementById('mensaje');
  if (nombre)   nombre.placeholder   = t['form-placeholder-nombre'];
  if (empresa)  empresa.placeholder  = t['form-placeholder-empresa'];
  if (telefono) telefono.placeholder = t['form-placeholder-tel'];
  if (mensaje)  mensaje.placeholder  = t['form-placeholder-msg'];

  // Select de servicio
  const sel = document.getElementById('servicio');
  if (sel) {
    const opts = sel.querySelectorAll('option');
    const keys = ['form-select-default','form-select-1','form-select-2','form-select-3','form-select-4','form-select-5','form-select-6'];
    opts.forEach((opt, i) => { if (keys[i] && t[keys[i]]) opt.textContent = t[keys[i]]; });
  }

  set('.btn-submit span', 'form-btn');

  // ── FOOTER ──
  const footLinks = document.querySelectorAll('footer .foot-links a');
  const footKeys  = ['foot-link-1','foot-link-2','foot-link-3','foot-link-4','foot-link-5'];
  footLinks.forEach((a, i) => { if (footKeys[i]) a.textContent = t[footKeys[i]]; });

  // ── VISIÓN SIN LÍMITES ──
  const vslSection = document.getElementById('vision-sin-limites');
  if (vslSection) {
    const vslLabel = vslSection.querySelector('.sec-label');
    if (vslLabel) vslLabel.innerHTML = t['vsl-sec-label'] + ' <span class="sec-num">★</span>';
    const vslTitle = vslSection.querySelector('.sec-title');
    if (vslTitle) vslTitle.innerHTML = t['vsl-sec-title'];
    const vslSub = vslSection.querySelector('.sec-subtitle');
    if (vslSub) vslSub.textContent = t['vsl-sec-sub'];
    const vslTag = vslSection.querySelector('.vsl-tag');
    if (vslTag) vslTag.textContent = t['vsl-tag'];
    const vslIntro = vslSection.querySelector('.vsl-intro');
    if (vslIntro) vslIntro.innerHTML = t['vsl-intro'];
    const vslImpactHeader = vslSection.querySelector('.vsl-impact-header');
    if (vslImpactHeader) vslImpactHeader.textContent = t['vsl-impact-header'];
    const vslQuote = vslSection.querySelector('.vsl-quote');
    if (vslQuote) vslQuote.textContent = t['vsl-quote'];
    const vslCta = vslSection.querySelector('.vsl-cta');
    if (vslCta) vslCta.textContent = t['vsl-cta'];
    vslSection.querySelectorAll('.vsl-feat').forEach((feat, i) => {
      const n = i + 1;
      const titleEl = feat.querySelector('.vsl-feat-title');
      const descEl  = feat.querySelector('.vsl-feat-desc');
      if (titleEl && t[`vsl-feat-title-${n}`]) titleEl.textContent = t[`vsl-feat-title-${n}`];
      if (descEl  && t[`vsl-feat-desc-${n}`])  descEl.textContent  = t[`vsl-feat-desc-${n}`];
    });
    vslSection.querySelectorAll('.vsl-stat-label').forEach((el, i) => {
      const key = `vsl-stat-label-${i + 1}`;
      if (t[key]) el.textContent = t[key];
    });
  }

  // ── LANG BUTTON ──
  const flagEl  = document.getElementById('langFlag');
  const labelEl = document.getElementById('langLabel');
  if (flagEl)  flagEl.textContent  = t['flag'];
  if (labelEl) labelEl.textContent = t['lang-label'];
}

function toggleLang() {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  document.body.style.transition = 'opacity .2s';
  document.body.style.opacity = '0.7';
  setTimeout(() => {
    applyLang(currentLang);
    document.body.style.opacity = '1';
  }, 200);
}

/* ─── DARK MODE ─── */
let isDark = localStorage.getItem('zorDark') === 'true';

function applyDark(dark) {
  document.body.classList.toggle('dark-mode', dark);
  const lbl = document.getElementById('darkLabel');
  if (lbl) lbl.textContent = dark ? 'LIGHT' : 'DARK';
  localStorage.setItem('zorDark', dark);
}

function toggleDark() {
  isDark = !isDark;
  applyDark(isDark);
}

// Aplicar al cargar
applyDark(isDark);
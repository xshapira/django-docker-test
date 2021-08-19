// Import Alpine.js
import Alpine from 'alpinejs';
// Import focus-handling
import { focusHandling } from 'focus-handling';
// Import aos
import AOS from 'aos';
// Import sticky-js
import Sticky from 'sticky-js';

import * as component from './components';

window.Alpine = Alpine;
Alpine.start();
// queueMicrotask(() => {
//   Alpine.start();
// });

AOS.init({
  once: true,
  disable: 'phone',
  duration: 700,
  easing: 'ease-out-cubic',
});

// eslint-disable-next-line no-unused-vars
const sticky = new Sticky('[data-sticky]');

document.addEventListener('DOMContentLoaded', () => {
  focusHandling('outline');
});

window.components = component.default;

component.default.hamburgerMenu();

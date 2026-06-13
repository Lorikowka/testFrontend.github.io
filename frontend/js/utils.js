/**
 * utils.js — Вспомогательные функции
 */

function sanitizeText(value) {
  return String(value || '').replace(/[&<>'"]/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

// Маска для телефона +7 (999) 000-00-00
function initPhoneMask(phoneInput) {
  if (!phoneInput) return;

  phoneInput.addEventListener('input', function () {
    let val = this.value.replace(/\D/g, '');
    if (val.startsWith('8')) val = '7' + val.slice(1);
    if (!val.startsWith('7')) val = '7' + val;
    val = val.slice(0, 11);

    let formatted = '+7';
    if (val.length > 1) formatted += ' (' + val.slice(1, 4);
    if (val.length >= 4) formatted += ') ' + val.slice(4, 7);
    if (val.length >= 7) formatted += '-' + val.slice(7, 9);
    if (val.length >= 9) formatted += '-' + val.slice(9, 11);
    this.value = formatted;
  });

  phoneInput.addEventListener('keydown', function (e) {
    if (e.key === 'Backspace' && this.value === '+7') {
      e.preventDefault();
      this.value = '';
    }
  });

  phoneInput.addEventListener('focus', function () {
    if (!this.value) this.value = '+7 ';
  });

  phoneInput.addEventListener('blur', function () {
    if (this.value === '+7 ' || this.value === '+7') this.value = '';
  });
}

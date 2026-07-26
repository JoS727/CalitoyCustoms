const basePrice = 260;
const price = document.getElementById('build-price');
const form = document.getElementById('board-builder');
const menuButton = document.querySelector('.menu-button');
const nav = document.getElementById('site-nav');

document.getElementById('year').textContent = new Date().getFullYear();

function selectedValue(name) {
  return document.querySelector(`input[name="${name}"]:checked`);
}

function updatePrice() {
  const options = ['shape', 'wood', 'finish'];
  const total = options.reduce((sum, name) => sum + Number(selectedValue(name).dataset.price || 0), basePrice);
  price.textContent = `$${total.toLocaleString()}`;
}

document.querySelectorAll('#board-builder input[type="radio"]').forEach((input) => input.addEventListener('change', updatePrice));

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.querySelector('span').textContent = open ? '—' : '+';
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.querySelector('span').textContent = '+';
}));

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }
  const shape = selectedValue('shape').value;
  const wood = selectedValue('wood').value;
  const finish = selectedValue('finish').value;
  const name = document.getElementById('customer-name').value.trim();
  const email = document.getElementById('customer-email').value.trim();
  const note = document.getElementById('customer-note').value.trim() || 'No additional notes yet.';
  const subject = encodeURIComponent(`Calitoy Customs build brief — ${name}`);
  const body = encodeURIComponent(`CUSTOM BOARD BRIEF\n\nName: ${name}\nEmail: ${email}\nShape: ${shape}\nWood: ${wood}\nFinish: ${finish}\nStarting estimate: ${price.textContent}\n\nDirection / notes:\n${note}`);
  document.getElementById('build-notice').innerHTML = `Your brief is ready. <a href="mailto:joseph@tarosyn.com?subject=${subject}&body=${body}">SEND IT TO THE STUDIO →</a>`;
});

updatePrice();

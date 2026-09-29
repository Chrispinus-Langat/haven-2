const cakes = [
  { name: 'Velvet Cloud', detail: 'Vanilla bean · Raspberry · Rose', price: '$68', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85', tag: 'Bestseller' },
  { name: 'Midnight Ganache', detail: 'Dark chocolate · Sea salt · Espresso', price: '$74', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85', tag: 'Rich & indulgent' },
  { name: 'Strawberry Élan', detail: 'Fresh strawberry · Mascarpone · Lemon', price: '$72', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=85', tag: 'Seasonal' }
]

const cakeGrid = document.querySelector('#cakeGrid')
const bagCount = document.querySelector('#bagCount')
const bagButton = document.querySelector('#bagButton')
const menuButton = document.querySelector('#menuButton')
const mobileMenu = document.querySelector('#mobileMenu')
const form = document.querySelector('#contactForm')
const formMessage = document.querySelector('#formMessage')
let cartCount = 0

function renderCakes() {
  cakeGrid.innerHTML = cakes.map((cake) => `
    <article class="cake-card group">
      <div class="relative overflow-hidden rounded-2xl bg-blush">
        <img class="aspect-[4/5] w-full object-cover" src="${cake.image}" alt="${cake.name} cake" loading="lazy">
        <span class="absolute left-4 top-4 rounded-full bg-cream px-3 py-2 text-[10px] font-bold uppercase tracking-widest">${cake.tag}</span>
        <button class="add-cake absolute bottom-4 right-4 grid size-11 place-items-center rounded-full bg-cocoa text-xl text-cream shadow-lg transition hover:scale-105" data-cake="${cake.name}" aria-label="Add ${cake.name} to bag">+</button>
      </div>
      <div class="flex items-start justify-between gap-4 pt-4"><div><h3 class="display text-2xl">${cake.name}</h3><p class="mt-1 text-xs text-stone-500">${cake.detail}</p></div><strong class="text-sm">${cake.price}</strong></div>
    </article>`).join('')

  document.querySelectorAll('.add-cake').forEach((button) => button.addEventListener('click', () => {
    cartCount += 1
    bagCount.textContent = cartCount
    bagButton.setAttribute('aria-label', `Shopping bag, ${cartCount} items`)
    button.textContent = '✓'
    setTimeout(() => { button.textContent = '+' }, 900)
  }))
}

menuButton.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open')
  menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu')
  menuButton.querySelector('span').textContent = isOpen ? '×' : '☰'
})

document.querySelectorAll('#mobileMenu a').forEach((link) => link.addEventListener('click', () => mobileMenu.classList.remove('open')))

form.addEventListener('submit', (event) => {
  event.preventDefault()
  form.reset()
  formMessage.textContent = 'We got your note. We will be in touch soon with something sweet.'
  formMessage.classList.remove('hidden')
})

renderCakes()

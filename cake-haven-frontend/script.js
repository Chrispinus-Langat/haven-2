const cakes = [
  { name: 'Velvet Cloud', detail: 'Vanilla bean · Raspberry · Rose', price: 68, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85', tag: 'Bestseller' },
  { name: 'Midnight Ganache', detail: 'Dark chocolate · Sea salt · Espresso', price: 74, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85', tag: 'Rich & indulgent' },
  { name: 'Strawberry Élan', detail: 'Fresh strawberry · Mascarpone · Lemon', price: 72, image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=85', tag: 'Seasonal' },
]

const $ = (selector) => document.querySelector(selector)
const cakeGrid = $('#cakeGrid')
const bagCount = $('#bagCount')
const bagButton = $('#bagButton')
const menuButton = $('#menuButton')
const mobileMenu = $('#mobileMenu')
const cartDrawer = $('#cartDrawer')
const cartOverlay = $('#cartOverlay')
const cartItems = $('#cartItems')
const cartTotal = $('#cartTotal')
const toast = $('#toast')
const form = $('#contactForm')
const formMessage = $('#formMessage')
let cart = []
let toastTimer

function saveCart() {
  sessionStorage.setItem('cake-haven-cart', JSON.stringify(cart))
}

function loadCart() {
  try { cart = JSON.parse(sessionStorage.getItem('cake-haven-cart') || '[]') } catch { cart = [] }
}

function money(value) { return `$${value}` }
function showToast(message) {
  toast.textContent = message
  toast.classList.add('show')
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400)
}
function renderCakes() {
  cakeGrid.innerHTML = cakes.map((cake, index) => `
    <article class="cake-card reveal group" style="transition-delay:${index * 90}ms">
      <div class="relative overflow-hidden rounded-2xl bg-blush">
        <img class="aspect-[4/5] w-full object-cover" src="${cake.image}" alt="${cake.name} cake" loading="lazy">
        <span class="absolute left-4 top-4 rounded-full bg-cream px-3 py-2 text-[10px] font-bold uppercase tracking-widest">${cake.tag}</span>
        <button class="add-cake absolute bottom-4 right-4 grid size-11 place-items-center rounded-full bg-cocoa text-xl text-cream shadow-lg transition hover:scale-105" data-index="${index}" aria-label="Add ${cake.name} to bag">+</button>
      </div>
      <div class="flex items-start justify-between gap-4 pt-4"><div><h3 class="display text-2xl">${cake.name}</h3><p class="mt-1 text-xs text-stone-500">${cake.detail}</p></div><strong class="text-sm">${money(cake.price)}</strong></div>
    </article>`).join('')
  document.querySelectorAll('.add-cake').forEach((button) => button.addEventListener('click', () => addToCart(Number(button.dataset.index))))
}
function addToCart(index) {
  const cake = cakes[index]
  const existing = cart.find((item) => item.name === cake.name)
  if (existing) existing.quantity += 1
  else cart.push({ ...cake, quantity: 1 })
  renderCart()
  showToast(`${cake.name} added to your bag`)
}
function renderCart() {
  const count = cart.reduce((total, item) => total + item.quantity, 0)
  bagCount.textContent = count
  bagButton.setAttribute('aria-label', `Shopping bag, ${count} items`)
  cartTotal.textContent = money(cart.reduce((total, item) => total + item.price * item.quantity, 0))
  cartItems.innerHTML = cart.length ? cart.map((item, index) => `<div class="flex items-center gap-3"><img class="size-16 rounded-xl object-cover" src="${item.image}" alt="${item.name}"><div class="min-w-0 flex-1"><strong class="display block truncate text-lg">${item.name}</strong><span class="text-xs text-stone-500">${money(item.price)} each</span><div class="mt-2 inline-flex items-center rounded-full border border-stone-200 bg-white"><button class="quantity-button grid size-7 place-items-center text-sm" data-index="${index}" data-change="-1" aria-label="Decrease ${item.name}">−</button><span class="w-6 text-center text-xs font-semibold">${item.quantity}</span><button class="quantity-button grid size-7 place-items-center text-sm" data-index="${index}" data-change="1" aria-label="Increase ${item.name}">+</button></div></div><button class="remove-item rounded-full border border-stone-300 px-3 py-1 text-xs" data-index="${index}" aria-label="Remove ${item.name}">Remove</button></div>`).join('') : '<p class="text-sm text-stone-500">Your bag is waiting for something delicious.</p>'
  document.querySelectorAll('.quantity-button').forEach((button) => button.addEventListener('click', () => { const item = cart[Number(button.dataset.index)]; item.quantity += Number(button.dataset.change); if (item.quantity <= 0) cart.splice(Number(button.dataset.index), 1); renderCart() }))
  document.querySelectorAll('.remove-item').forEach((button) => button.addEventListener('click', () => { cart.splice(Number(button.dataset.index), 1); renderCart() }))
  saveCart()
}
function setCartOpen(open) {
  cartDrawer.classList.toggle('drawer-open', open)
  cartDrawer.style.transform = open ? 'translateX(0)' : 'translateX(100%)'
  cartOverlay.classList.toggle('overlay-open', open)
  cartOverlay.classList.toggle('hidden', !open)
  cartDrawer.setAttribute('aria-hidden', String(!open))
  if (open) $('#closeCart').focus()
}
bagButton.addEventListener('click', () => setCartOpen(true))
$('#closeCart').addEventListener('click', () => setCartOpen(false))
cartOverlay.addEventListener('click', () => setCartOpen(false))
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setCartOpen(false) })
menuButton.addEventListener('click', () => { const open = mobileMenu.classList.toggle('open'); menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); menuButton.querySelector('span').textContent = open ? '×' : '☰' })
document.querySelectorAll('#mobileMenu a').forEach((link) => link.addEventListener('click', () => { mobileMenu.classList.remove('open'); menuButton.setAttribute('aria-label', 'Open menu'); menuButton.querySelector('span').textContent = '☰' }))
form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const submitButton = form.querySelector('button[type="submit"]')
  const originalLabel = submitButton.innerHTML
  submitButton.disabled = true
  submitButton.innerHTML = 'Sending…'
  formMessage.classList.add('hidden')
  try {
    const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form))) })
    const result = await response.json()
    if (!response.ok) throw new Error(result.error)
    form.reset(); formMessage.textContent = 'We got your note. We will be in touch soon with something sweet.'; formMessage.classList.remove('hidden'); showToast('Your note is on its way')
  } catch (error) { formMessage.textContent = error.message || 'Something went wrong. Please try again.'; formMessage.classList.remove('hidden') }
  finally { submitButton.disabled = false; submitButton.innerHTML = originalLabel }
})
const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target) } }), { threshold: 0.12 })
loadCart()
renderCakes()
document.querySelectorAll('section, .cake-card').forEach((element) => { if (!element.classList.contains('cake-card')) element.classList.add('reveal'); observer.observe(element) })
renderCart()
const checkoutButton = $('#checkoutButton')
checkoutButton.addEventListener('click', () => { setCartOpen(false); showToast('Tell us about your celebration below') })
window.addEventListener('pageshow', () => document.body.classList.add('ready'))
if (window.location.protocol === 'file:') showToast('For contact forms, open this site through its deployed URL')

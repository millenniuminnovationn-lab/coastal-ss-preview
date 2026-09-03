const vehicles = [
  {slug:'jeep-grand-cherokee', name:'2013 Jeep Grand Cherokee', trim:'Laredo Sport Utility 4D', price:'$3,500', location:'Largo, FL'},
  {slug:'dodge-grand-caravan', name:'2018 Dodge Grand Caravan', trim:'SXT', price:'$3,600', location:'Largo, FL'},
  {slug:'ford-edge', name:'2008 Ford Edge', trim:'SEL · 135,000 miles', price:'$2,900', location:'Largo, FL'},
  {slug:'jeep-compass', name:'2017 Jeep Compass', trim:'High Altitude Sport Utility 4D', price:'$5,800', location:'Largo, FL'},
  {slug:'ford-focus', name:'2015 Ford Focus', trim:'SE Sedan 4D', price:'$3,500', location:'Largo, FL'}
];

const list = document.querySelector('#vehicle-list');
const select = document.querySelector('#vehicle-select');

if (list) vehicles.forEach((vehicle, index) => {
  const photos = Array.from({length:5}, (_, i) => `assets/inventory/${vehicle.slug}/0${i+1}.jpg`);
  const article = document.createElement('article');
  article.className = 'vehicle';
  article.innerHTML = `<div class="vehicle-media"><div class="slides">${photos.map((photo,i)=>`<img src="${photo}" alt="${vehicle.name}, photo ${i+1} of 5" loading="${i ? 'lazy' : 'eager'}">`).join('')}</div><div class="slider-controls"><button type="button" class="prev" aria-label="Previous photo">←</button><span class="dots" aria-label="Photo 1 of 5">${photos.map((_,i)=>`<i class="${i ? '' : 'active'}"></i>`).join('')}</span><button type="button" class="next" aria-label="Next photo">→</button></div></div><div class="vehicle-copy"><p class="availability">Available now</p><h3>${vehicle.name}</h3><p>${vehicle.trim}</p><div class="price-row"><strong>${vehicle.price}</strong><span>${vehicle.location}</span></div><a href="#visit" data-vehicle="${vehicle.name}">Schedule a look</a></div>`;
  list.append(article);
  if (select) select.insertAdjacentHTML('beforeend', `<option>${vehicle.name}</option>`);
});

document.querySelectorAll('.vehicle').forEach(card => {
  const rail = card.querySelector('.slides');
  const dots = [...card.querySelectorAll('.dots i')];
  const move = direction => rail.scrollBy({left: rail.clientWidth * direction, behavior:'smooth'});
  card.querySelector('.prev').addEventListener('click', () => move(-1));
  card.querySelector('.next').addEventListener('click', () => move(1));
  rail.addEventListener('scroll', () => { const active = Math.round(rail.scrollLeft / rail.clientWidth); dots.forEach((dot,i)=>dot.classList.toggle('active',i===active)); card.querySelector('.dots').setAttribute('aria-label',`Photo ${active+1} of 5`); }, {passive:true});
  card.querySelector('[data-vehicle]').addEventListener('click', event => { if (select) select.value = event.currentTarget.dataset.vehicle; });
});

document.querySelector('#appointment-form')?.addEventListener('submit', event => {
  event.preventDefault();
  event.currentTarget.querySelector('.form-status').textContent = 'Preview received locally. No request was sent.';
});

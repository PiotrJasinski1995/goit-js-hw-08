import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
const galleryList = document.querySelector('ul.gallery');

const galleryMarkup = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<li>
       <a class="gallery__item" href="${original}">
         <img
           class="gallery__image"npm start
           src="${preview}"
           alt="${description}"
         />
       </a>
     </li>`
  )
  .join('');

galleryList.insertAdjacentHTML('beforeend', galleryMarkup);
const gallery = new SimpleLightbox(`gallery, li > a`, {
  captionsData: 'alt',
  captionDelay: 250,
});

import './styles.css';
import menu from './menu.json';
import menuGalleryTemplate from './templates/menu-gallery.hbs';

// Добавь функционал изменения темы при нажатии (событие change) на чекбокс #theme-switch-toggle в тулбаре.
// По умолчанию тема светлая.
// При изменении темы, необходимо добавлять на элемент body класс light-theme или dark-theme.
// Выбранная тема должна сохраняться между перезагрузками страницы. Для хранения темы используй localStorage.
// Если при загрузке страницы тема тёмная, не забудь поставить свойство checked у чекбокса #theme-switch-toggle в true, чтобы ползунок сдвинулся в правильное положение.
// Для удобства хранения списка тем используй такое перечисление.

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const refs = {
  bodyRef: document.querySelector('body'),
  checkboxRef: document.querySelector('#theme-switch-toggle'),
  menuListRef: document.querySelector('.js-menu'),
};
const { bodyRef, checkboxRef, menuListRef } = refs;

setThemeOnLoad();

checkboxRef.addEventListener('change', onCheckboxChangeHandler);

// Шаблонизация
// Используя шаблонизатор Handlebars создай шаблон одного элемента меню. После чего,
// используя шаблон, создай разметку всего меню по данным из menu.json и добавь в DOM в ul.js - menu.

// Для иконок используется библиотека Material Icons, линк на веб-фонт уже есть в исходном HTML.
// Ниже указана разметка элемента меню которая должна получаться по шаблону (данные будут разные для каждого объекта).

createMenuMarkup();

function onCheckboxChangeHandler(event) {
  bodyRef.classList.toggle(Theme.DARK);
  event.currentTarget.checked
    ? localStorage.setItem('theme', Theme.DARK)
    : localStorage.setItem('theme', Theme.LIGHT);
}

function setThemeOnLoad() {
  if (localStorage.getItem('theme') !== Theme.DARK) return;
  bodyRef.classList.add(Theme.DARK);
  checkboxRef.checked = true;
}

function createMenuMarkup() {
  const markup = menuGalleryTemplate({ items: menu });
  console.log(markup);
  menuListRef.insertAdjacentHTML('afterbegin', markup);
}

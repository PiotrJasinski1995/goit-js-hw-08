import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('[name="email"]');
const messageInput = form.querySelector('[name="message"]');

form.addEventListener(
  'input',
  throttle(_event => {
    const formObj = {
      email: emailInput.value,
      message: messageInput.value,
    };
    save('feedback-form-state', formObj);
  }, 500)
);

form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = load('feedback-form-state');
  console.log(formData);
  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageInput.value = '';
});

window.addEventListener('DOMContentLoaded', _event => {
  const formData = load('feedback-form-state');

  if (formData) {
    emailInput.value = formData.email;
    messageInput.value = formData.message;
  }
});

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

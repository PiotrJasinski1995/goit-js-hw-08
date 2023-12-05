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

form.addEventListener('submit', _event => {
  localStorage.clear();
  emailInput.value = '';
  messageInput.value = '';
});

window.addEventListener('DOMContentLoaded', _event => {
  const formData = localStorage.getItem('feedback-form-state');

  if (formData !== '') {
    const formObj = load('feedback-form-state');
    emailInput.value = formObj.email;
    messageInput.value = formObj.message;
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

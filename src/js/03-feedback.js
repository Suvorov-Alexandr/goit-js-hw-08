import throttle from 'lodash.throttle';

const LOCAL_STORAGE_KEY = 'feedback-form-state';
const formRef = document.querySelector('.feedback-form');

formRef.addEventListener('input', throttle(onFormChange, 500));
formRef.addEventListener('submit', onFormSubmit);

init();

function onFormChange() {
  const email = formRef.elements.email.value;
  const message = formRef.elements.message.value;
  const formState = { email, message };
  const formStateJson = JSON.stringify(formState);
  localStorage.setItem(LOCAL_STORAGE_KEY, formStateJson);
}

function init() {
  const formStateJson = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (formStateJson) {
    const formState = JSON.parse(formStateJson);
    formRef.elements.message.value = formState.message;
    formRef.elements.email.value = formState.email;
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log({
    email: evt.currentTarget.elements.email.value,
    message: evt.currentTarget.elements.message.value,
  });
  evt.currentTarget.reset();
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

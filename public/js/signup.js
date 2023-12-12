const form = document.getElementById('form');
const username = document.getElementById('username-signup');
const usernameMessage = document.getElementById('username-message');
const email = document.getElementById('email-signup');
const emailMessage = document.getElementById('email-message');
const password = document.getElementById('password-signup');
const password2 = document.getElementById('confirm-password-signup');
const password2Message = document.getElementById('password2-message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();

  usernameMessage.classList.remove('error');
  usernameMessage.classList.add('success');
  emailMessage.classList.remove('error');
  emailMessage.classList.add('success');
  password2Message.classList.remove('error');
  password2Message.classList.add('success');

  if (passwordValue !== password2Value) {
    password2Message.innerText = 'Passwords do not match';
    password2Message.classList.remove('success');
    password2Message.classList.add('error');
  } else if (passwordValue.length < 8) {
    password2Message.innerText = 'Password must be at least 8 characters';
    password2Message.classList.remove('success');
    password2Message.classList.add('error');
  } else {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: usernameValue,
          email: emailValue,
          password: passwordValue,
        }),
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        const data = await response.json();
        if (data.error === 'Username already exists') {
          usernameMessage.innerText =
            'This username is already in use. Please choose another.';
          usernameMessage.classList.remove('success');
          usernameMessage.classList.add('error');
        } else if (data.error === 'Email already exists') {
          emailMessage.innerText = 'This email is already in use. Please use another.';
          emailMessage.classList.remove('success');
          emailMessage.classList.add('error');
        }
      }
    } catch (err) {
      console.error('Error during signup fetch: ', err);
    }
  }
});
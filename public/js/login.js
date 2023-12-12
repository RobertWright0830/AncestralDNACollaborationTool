const form = document.getElementById('form');
const username = document.getElementById('username-login');
const usernameLoginMessage = document.getElementById('username-login-message');
const password = document.getElementById('password-login');
const passwordLoginMessage = document.getElementById('password-login-message');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  usernameLoginMessage.classList.remove('error');
  usernameLoginMessage.classList.add('success');
  passwordLoginMessage.classList.remove('error');
  passwordLoginMessage.classList.add('success');

  try {
    if (usernameValue && passwordValue) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: usernameValue,
          password: passwordValue,
        }),
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        const data = await response.json();
        // eslint-disable-next-line quotes
        if (data.error === "Incorrect username or password") {
          usernameLoginMessage.innerText = 'Incorrect username or password. Please try again.';
          usernameLoginMessage.classList.remove('success');
          usernameLoginMessage.classList.add('error');
        }
      }
    }
  } catch (err) {
    console.error('Error during login fetch: ', err);
  }
});
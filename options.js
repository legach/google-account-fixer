const input = document.getElementById('authuser');
const status = document.getElementById('status');

chrome.storage.sync.get('authuser', ({ authuser = 0 }) => {
  input.value = authuser;
});

document.getElementById('save').addEventListener('click', async () => {
  const value = parseInt(input.value, 10);
  if (isNaN(value) || value < 0) return;
  await chrome.storage.sync.set({ authuser: value });
  status.textContent = 'Saved';
  setTimeout(() => { status.textContent = ''; }, 2000);
});

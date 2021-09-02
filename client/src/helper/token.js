const authToken = localStorage.getItem('authToken')
  ? JSON.parse(localStorage.getItem('authToken'))
  : null;

export const token = authToken || null;

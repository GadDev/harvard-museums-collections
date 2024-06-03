export const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://mocked-gom-bank-bb390a0d23a6.herokuapp.com/'

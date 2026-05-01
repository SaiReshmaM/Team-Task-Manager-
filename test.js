const http = require('http');

const data = JSON.stringify({
  username: 'test_admin',
  password: 'Password123'
});

const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/auth/signup',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, res => {
  console.log(`STATUS: ${res.statusCode}`);
  res.on('data', d => process.stdout.write(d));
});

req.on('error', e => console.error(e));
req.write(data);
req.end();

const http = require('http');

function request(path, method, body) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve({ status: res.statusCode, body: JSON.parse(data || '{}') });
            });
        });

        req.on('error', (e) => {
            reject(e);
        });

        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end();
    });
}

async function test() {
    console.log('--- Starting Tests ---');
    const timestamp = Date.now();
    const user = {
        username: `user_${timestamp}`,
        email: `user_${timestamp}@example.com`,
        password: 'password123'
    };

    // Test 1: Register
    try {
        console.log('Running Test 1: Register new user...');
        const regRes = await request('/api/register', 'POST', user);
        console.log(`Status: ${regRes.status}`);
        console.log(`Body:`, regRes.body);
        if (regRes.status === 201) {
            console.log('PASS: Registration successful');
        } else {
            console.log('FAIL: Registration failed');
        }
    } catch (e) {
        console.log('FAIL: Registration error', e.message);
    }

    // Test 2: Login
    try {
        console.log('\nRunning Test 2: Login with correct credentials...');
        const loginRes = await request('/api/login', 'POST', { email: user.email, password: user.password });
        console.log(`Status: ${loginRes.status}`);
        console.log(`Body:`, loginRes.body);
        if (loginRes.status === 200 && loginRes.body.token) {
            console.log('PASS: Login successful');
        } else {
            console.log('FAIL: Login failed');
        }
    } catch (e) {
        console.log('FAIL: Login error', e.message);
    }

    // Test 3: Login Fail
    try {
        console.log('\nRunning Test 3: Login with wrong password...');
        const loginFailRes = await request('/api/login', 'POST', { email: user.email, password: 'wrongpassword' });
        console.log(`Status: ${loginFailRes.status}`);
        if (loginFailRes.status === 401) {
            console.log('PASS: Login correctly rejected');
        } else {
            console.log('FAIL: Login should have failed');
        }
    } catch (e) {
        console.log('FAIL: Login error', e.message);
    }
}

test();

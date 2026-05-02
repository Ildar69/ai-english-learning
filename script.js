import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { SUPABASE_URL, SUPABASE_KEY } from './config.js';

const client = createClient(SUPABASE_URL, SUPABASE_KEY);

const title = document.querySelector('.left h1');

let time = 0;
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', function(e) {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
});

function animate() {
    time += 0.01;
    const autoX = Math.sin(time) * 5;
    const autoY = Math.cos(time) * 2;

    if (title) {
        title.style.transform = `translate(${mouseX + autoX}px, ${mouseY + autoY}px)`;
    }
    requestAnimationFrame(animate);
}

animate();

const authForm = document.getElementById('auth-form');

if (authForm) {
    authForm.addEventListener('submit', async function(e) {

        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const { data, error } = await client.auth.signUp({ email, password });

        if (error) {
            console.log('Ошибка:', error.message);
            alert('Ошибка: ' + error.message);
        } else {
            console.log('Успех:', data);
            alert('Проверьте почту для подтверждения регистрации!');
        }
    });
}
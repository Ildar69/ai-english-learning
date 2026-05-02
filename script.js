const SUPABASE_URL = 'https://jpkjtutplacfbcyjvgeu.supabase.co';
const SUPABASE_KEY = 'sb_publishable__1yNY7PiPl-nmzsOFPudFA_Mze9V6Bj';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

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
    title.style.transform = `translate(${mouseX + autoX}px, ${mouseY + autoY}px)`;
    requestAnimationFrame(animate);
}

animate();

document.querySelector('button').addEventListener('click', async function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { data, error } = await client.auth.signUp({ email, password });

    if (error) {
        console.log('Ошибка:', error.message);
    } else {
        console.log('Успех:', data);
    }
});


const submit = document.getElementById('submit');

// Form Submission
submit.addEventListener('click', e => {
  e.preventDefault();

  // Inner Html
  const post = document.getElementById('post');
  // Form
  const form = document.getElementById('form');
  // Img
  const img = document.getElementById('img');
  // Map
  const map = document.getElementById('map');
  // Values from input
  const name = document.getElementById('name').value;
  const hp = parseInt(document.getElementById('hp').value);
  // Character div (name, hp + image)
  const perso = document.getElementById('perso');

  // Hero creation
  fetch('http://localhost:1664/api/v1/create/hero', {
    method: 'POST',
    body: JSON.stringify({ name, hp })
  })
    .then(req => req.json())
    .then(res => (post.innerText += res.info))
    .then((form.style.display = 'none'))
    .then(() => {
      img.style.display = 'block',
      map.style.display = 'block';
    })
    .then(() => {
      // Global state
      let x = 0,
        y = 0,
        speed = 5,
        keyState = {};

      document.addEventListener('keyup', e => {
        keyState[e.keyCode] = false;

        switch (e.keyCode) {
          case 81:
            img.src = 'src/img/characters/left1.png';
            break;
          case 90:
            img.src = 'src/img/characters/up1.png';
            break;
          case 68:
            img.src = 'src/img/characters/right1.png';
            break;
          case 83:
            img.src = 'src/img/characters/down1.png';
            break;
        }
      });

      document.addEventListener('keydown', e => {
        keyState[e.keyCode] = true;
      });

      function gameLoop() {
        if (keyState[81]) {
          perso.style.left = `${speed * x--}px`;
          img.src = 'src/img/characters/moveLeft.gif';
        }
        if (keyState[90]) {
          perso.style.top = `${speed * y--}px`;
          img.src = 'src/img/characters/moveUp.gif';
        }
        if (keyState[68]) {
          perso.style.left = `${speed * x++}px`;
          img.src = 'src/img/characters/moveRight.gif';
        }
        if (keyState[83]) {
          perso.style.top = `${speed * y++}px`;
          img.src = 'src/img/characters/moveDown.gif';
        }
        setTimeout(gameLoop, 50);
      }
      gameLoop();
    });
});

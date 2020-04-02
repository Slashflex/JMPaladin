// UI
const submit = document.getElementById('submit'),
  post = document.getElementById('post'),
  form = document.getElementById('form'),
  perso = document.getElementById('perso'),
  loader = document.getElementById('loader'),
// Character
  char = document.getElementById('char'),
  charInfo = document.getElementById('charInfo'),
// Maps
  mapTown = document.getElementById('mapTown'),
  mapFight = document.getElementById('mapFight'),
  fightTile = document.getElementById('fightTile'),
// Map boundaries
  TOP_LEFT = 0,
  TOP_RIGHT = 53,
  BOTTOM_LEFT = 933,
  BOTTOM_RIGHT = 1160,
  //  startFight = document.getElementById('startFight');

// Movements detection
  directions = {
    key90: 'up1.png',
    key83: 'down1.png',
    key81: 'left1.png',
    key68: 'right1.png'
  };
let lastDirection = 83;

// Promise definition
const createCharPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Values from input
      const name = document.getElementById('name').value,
        hp = document.getElementById('hp').value;
      resolve(
        // Character creation Endpoint
        fetch('http://localhost:1664/api/v1/create/hero', {
          method: 'POST',
          body: JSON.stringify({ name, hp })
        })
          .then(req => req.json())
          .then(res => (post.innerText += res.info))
          .then((form.style.display = 'none'))
          .then(() => {
            (char.style.display = 'block'),
              (mapTown.style.display = 'block'),
              (charInfo.style.display = 'block'),
              (fightTile.style.display = 'none');
          })
          .then(() => {
            // Global state variables
            let x = parseInt(perso.style.left, 10), // horizontal
              y = parseInt(perso.style.top, 10), // vertical
              speed = 10,
              keyState = {};

            // Game logic for movements
            const gameLoop = () => {
              let initX = x,
                initY = y;

              if (keyState[81] && x > TOP_LEFT) {
                if (
                  char.src !=
                  'http://localhost:1664/src/img/characters/moveLeft.gif'
                )
                  char.src = 'src/img/characters/moveLeft.gif';
                x -= speed;
              }

              if (keyState[90] && y > TOP_RIGHT) {
                if (
                  char.src !=
                  'http://localhost:1664/src/img/characters/moveUp.gif'
                )
                  char.src = 'src/img/characters/moveUp.gif';
                y -= speed;
              }

              if (keyState[68] && x < BOTTOM_RIGHT) {
                if (
                  char.src !=
                  'http://localhost:1664/src/img/characters/moveRight.gif'
                )
                  char.src = 'src/img/characters/moveRight.gif';
                x += speed;
              }
              if (keyState[83] && y < BOTTOM_LEFT) {
                if (
                  char.src !=
                  'http://localhost:1664/src/img/characters/moveDown.gif'
                )
                  char.src = 'src/img/characters/moveDown.gif';
                y += speed;
              }
              perso.style.left = `${x}px`;
              perso.style.top = `${y}px`;

              // Combat Zone
              if (x >= 590 && x <= 660 && y >= 450 && y <= 523) {
                if (initX != x || initY != y) {
                  const value = Math.floor(Math.random() * 11);
                  if (value > 8) {
                    mapTown.style.display = 'none';
                    mapFight.style.display = 'block';
                    perso.style.width = 5.5 + 'rem';
                    // startFight.style.display = 'block';
                    console.log('Fight');
                  }
                }
              } else {
                console.log('safe');
              }

              if (
                !keyState[90] &&
                !keyState[83] &&
                !keyState[81] &&
                !keyState[68] &&
                directions.hasOwnProperty(`key${lastDirection}`)
              )
                char.src =
                  'src/img/characters/' + directions[`key${lastDirection}`];

              setTimeout(gameLoop, 80);
            };

            document.addEventListener('keyup', e => {
              keyState[e.keyCode] = false;
              lastDirection = e.keyCode;
            });

            document.addEventListener('keydown', e => {
              keyState[e.keyCode] = true;
            });

            gameLoop();
          })
      );
      reject('Error 😑');
    }, 5000);
  });
};

const showLoader = () => {
  loader.style.display = 'block';
};

const hideLoader = () => {
  loader.style.display = 'none';
};

const consume = async () => {
  try {
    showLoader();
    await createCharPromise();
  } catch (err) {
    console.error(err);
  } finally {
    hideLoader();
  }
};

// Form submission
submit.addEventListener('click', e => {
  e.preventDefault();
  form.style.display = 'none';
  // Consume Promise
  consume();
});

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 768;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const placementTilesData2D = [];

for (let i = 0; i < placementTilesData.length; i += 20) {
  placementTilesData2D.push(placementTilesData.slice(i, i + 20));
}

const placementTiles = [];

placementTilesData2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 14) {
      // Add building placement tile here
      placementTiles.push(
        new PlacementTile({
          position: {
            x: x * 64,
            y: y * 64,
          },
        })
      );
    }
  });
});

const background = new Image();

background.onload = () => {
  animate();
};
background.src = "Images/towerDefense.png";

const enemies = [];
for (let i = 1; i < 10; i++) {
  const xOffset = i * 150;
  enemies.push(
    new Enemy({
      position: { x: waypoints[0].x - xOffset, y: waypoints[0].y },
    })
  );
  console.log(waypoints[0].x - xOffset);
}

function animate() {
  window.requestAnimationFrame(animate);

  ctx.drawImage(background, 0, 0);
  enemies.forEach((enemy) => {
    enemy.update();
  });

  placementTiles.forEach((tile) => {
    tile.update(mouse);
  });
}

const mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener("mousemove", (e) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

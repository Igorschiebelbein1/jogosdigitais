const canvas = document.getElementById('mazeCanvas');
const context = canvas.getContext('2d');
const rows = 10;
const cols = 10;
const cellSize = canvas.width / cols;

const ball = {
    x: 0, 
    y: 0,
    radius: 10,
    color: 'red',
};

const maze = generateMaze(rows, cols);
drawMaze(maze);
drawBall();

function drawMaze(maze) {
    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            if (maze[row][col] === 1) {
                context.fillStyle = 'black';
                context.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
            }
        }
    }
}


function drawBall() {
    context.beginPath();
    context.arc(ball.x * cellSize + cellSize / 2, ball.y * cellSize + cellSize / 2, ball.radius, 0, Math.PI * 2);
    context.fillStyle = ball.color;
    context.fill();
    context.closePath();
}


function generateMaze(rows, cols) {
    const maze = Array.from({ length: rows }, () => Array(cols).fill(1));
    const stack = [];
    const currentCell = [0, 0];
    maze[0][0] = 0;
    stack.push(currentCell);

    while (stack.length > 0) {
        const [currentRow, currentCol] = stack.pop();
        const neighbors = getNeighbors(currentRow, currentCol, maze);

        if (neighbors.length > 0) {
            stack.push([currentRow, currentCol]);
            const [nextRow, nextCol] = neighbors[Math.floor(Math.random() * neighbors.length)];
            maze[nextRow][nextCol] = 0;
            maze[(currentRow + nextRow) / 2 | 0][(currentCol + nextCol) / 2 | 0] = 0;
            stack.push([nextRow, nextCol]);
        }
    }

    return maze;
}


function getNeighbors(row, col, maze) {
    const neighbors = [];
    const directions = [
        [-2, 0],
        [2, 0],
        [0, -2],
        [0, 2]
    ];

    for (const [dRow, dCol] of directions) {
        const newRow = row + dRow;
 const newCol = col + dCol;

        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && maze[newRow][newCol] === 1) {
            neighbors.push([newRow, newCol]);
        }
    }

    return neighbors;
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    const oldX = ball.x;
    const oldY = ball.y;


    if (key === 'ArrowUp' && ball.y > 0) {
        ball.y--;
    } else if (key === 'ArrowDown' && ball.y < rows - 1) {
        ball.y++;
    } else if (key === 'ArrowLeft' && ball.x > 0) {
        ball.x--;
    } else if (key === 'ArrowRight' && ball.x < cols - 1) {
        ball.x++;
    }


    if (maze[ball.y][ball.x] === 1) {
  
        ball.x = oldX;
        ball.y = oldY;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze(maze);
    drawBall();
});

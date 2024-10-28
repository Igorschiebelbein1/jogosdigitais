const canvas = document.getElementById('mazeCanvas');
const context = canvas.getContext('2d');
const rows = 10;
const cols = 10;
const cellSize = canvas.width / cols;

const maze = generateMaze(rows, cols);
drawMaze(maze);

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

function generateMaze(rows, cols) {
    const maze = Array.from({ length: rows }, () => Array(cols).fill(1));
    const stack = [];
    const currentCell = [0, 0];
    maze[0][0] = 0;
    stack.push(currentCell);

    while (stack.length > 0) {
        const [currentRow, currentCol] = stack.pop();
        const neighbors = getNeighbors(currentRow, currentCol);

        if (neighbors.length > 0) {
            stack.push([currentRow, currentCol]);
            const [nextRow, nextCol] = neighbors[Math.floor(Math.random() * neighbors.length)];
            maze[nextRow][nextCol] = 0;
            maze[(currentRow + nextRow) / 2][(currentCol + nextCol) / 2] = 0;
            stack.push([nextRow, nextCol]);
        }
    }

    return maze;
}

function getNeighbors(row, col) {
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

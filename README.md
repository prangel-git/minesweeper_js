# Minesweeper specifications

Taken from cyber-dojo.org:

Your task is to create a mine-sweeper style game.
You start at the bottom of an 8x8 grid with 5 lives.
You must move to the top whilst trying to avoid the hidden mines.
You move up/down/left/right each turn.

If you step on a mine:

- the mine is revealed and shown as '*'
- you lose a life
- you do not move into the mine's square
- the mine remains explosive

Your current position is shown as 'O'
Squares you have previously stepped on are shown as 'o'
If you reach the top of the grid you win and the game ends.
If you run out of lives you lose and the game ends.

If you attempt to move off the grid:
- you stay in the same square
- you do not lose a life

A parameter holds the likelihood each square contains a mine:

- this parameter ranges from 0 (inclusive) to 1 (exclusive)
- a value of 0 means no square contains a mine
- a value of 0.5 means a 50% chance any square is mined
- reject generated grids with no mine-free path to the top
- in other words, each game must be winnable

Your initial starting position at the bottom:
- is randomly chosen
- does not contain a mine

# Installation

1. Clone repository

```console
git clone https://github.com/prangel-git/minesweeper_js.git
cd minesweeper_js
```

2. Install npm project

```console
npm install
```

3. Run tests

```console
npm test
```

4. Run minesweeper

```console
node index.js
```
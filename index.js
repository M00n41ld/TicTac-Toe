const state = {
    gameElement: document.querySelector(".game"),
    cells: Array(9).fill(null),
    winningCombinations: [
      [0,1,2], 
      [3,4,5],
      [6,7,8],
      [0,3,6], 
      [1,4,7],
      [2,5,8], 
      [0,4,8], 
      [2,4,6]  
  ],
  gameFinished: false,
  symbols: ['o', 'x']
  };
  
  function drawBoard() {
    state.gameElement.innerHTML = ''
  
    for (let i = 0; i < state.cells.length; i++) {
        const cell = document.createElement('div')
        cell.classList.add('cell')
  
        if (state.cells[i]) {
            const cellSymbol = document.createElement('p')
            cellSymbol.innerText = state.cells[i]
            cellSymbol.classList.add('symbol')
            cell.append(cellSymbol)
        } else {
            cell.addEventListener('click', function () {
                if (state.gameFinished) {
                    return
                }
  
                state.symbols.reverse()
                const currentPlayerSymbol = state.symbols[0]
    
                state.cells[i] = currentPlayerSymbol
    
                drawBoard()
  
                if (checkForWinner()) {
                    drawMessage(`You won!`)
                    state.gameFinished = true
                    return
                }
  
                else if (checkForDraw()) {
                    drawMessage('None of you won!')
                    state.gameFinished = true
                }
            })
        }
  
        state.gameElement.append(cell)
    }
  }
  
  function checkForWinner() {
    return state.winningCombinations.some(combo => {
        const cells = combo.map(index => state.cells[index])
  
        return !(cells.includes(null)) && new Set(cells).size === 1
    })
  }
  
  function checkForDraw() {
    return state.cells.every(cell => cell !== null)
  }
  
  function drawMessage(message) {
    const banner = document.createElement('div')
    banner.classList.add('banner')
  
    const h1 = document.createElement('h1')
    h1.innerHTML = message
    banner.append(h1)
  
    state.gameElement.append(banner)
  }
  
  drawBoard()

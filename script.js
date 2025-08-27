// Clase principal del Bingo
class BingoGame {
    constructor() {
        this.markedNumbers = new Set();
        this.markedPatternCells = new Set();
        this.totalNumbers = 75;
        this.totalPatternCells = 30; // 6x5 - 6 (letras BINGO) = 24 + 6 letras = 30
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateMarkedCount();
        this.updatePatternCount();
        this.loadGameState();
    }

    setupEventListeners() {
        // Event listeners para las celdas de números
        const numberCells = document.querySelectorAll('.number-cell');
        numberCells.forEach(cell => {
            cell.addEventListener('click', () => this.toggleNumber(cell));
        });

        // Event listeners para las celdas de patrón
        const patternCells = document.querySelectorAll('.pattern-cell');
        patternCells.forEach(cell => {
            cell.addEventListener('click', () => this.togglePatternCell(cell));
        });

        // Event listener para el botón de reiniciar
        document.getElementById('resetBtn').addEventListener('click', () => this.resetGame());

        // Event listeners para los botones de patrones
        document.getElementById('btnFB').addEventListener('click', () => this.markColumn('B'));
        document.getElementById('btnFI').addEventListener('click', () => this.markColumn('I'));
        document.getElementById('btnFN').addEventListener('click', () => this.markColumn('N'));
        document.getElementById('btnFG').addEventListener('click', () => this.markColumn('G'));
        document.getElementById('btnFO').addEventListener('click', () => this.markColumn('O'));
        document.getElementById('btnPleno').addEventListener('click', () => this.markAllPatterns());
        document.getElementById('btnCuadroPequeno').addEventListener('click', () => this.markSmallSquare());
        document.getElementById('btnH').addEventListener('click', () => this.markLetterH());
        document.getElementById('btnO').addEventListener('click', () => this.markLetterO());
        document.getElementById('btnU').addEventListener('click', () => this.markLetterU());
        document.getElementById('btnZ').addEventListener('click', () => this.markLetterZ());
        document.getElementById('btnN').addEventListener('click', () => this.markLetterN());

        // Event listeners para teclas de acceso rápido
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
    }

    toggleNumber(cell) {
        const number = parseInt(cell.dataset.number);
        
        if (this.markedNumbers.has(number)) {
            this.unmarkNumber(number, cell);
        } else {
            this.markNumber(number, cell);
        }
        
        this.updateMarkedCount();
        this.saveGameState();
    }

    togglePatternCell(cell) {
        const cellKey = `${cell.dataset.row}-${cell.dataset.col}`;
        
        if (this.markedPatternCells.has(cellKey)) {
            this.unmarkPatternCell(cellKey, cell);
        } else {
            this.markPatternCell(cellKey, cell);
        }
        
        this.updatePatternCount();
        this.saveGameState();
    }

    markNumber(number, cell) {
        this.markedNumbers.add(number);
        cell.classList.add('marked');
    }

    unmarkNumber(number, cell) {
        this.markedNumbers.delete(number);
        cell.classList.remove('marked');
    }

    markPatternCell(cellKey, cell) {
        this.markedPatternCells.add(cellKey);
        cell.classList.add('marked');
    }

    unmarkPatternCell(cellKey, cell) {
        this.markedPatternCells.delete(cellKey);
        cell.classList.remove('marked');
    }



    // Funciones para marcar columnas
    markColumn(letter) {
        const columnMap = { 'B': 1, 'I': 2, 'N': 3, 'G': 4, 'O': 5 };
        const col = columnMap[letter];
        
        if (col) {
            const cells = document.querySelectorAll(`[data-col="${col}"]`);
            cells.forEach(cell => {
                if (!cell.classList.contains('black-cell')) {
                    const cellKey = `${cell.dataset.row}-${cell.dataset.col}`;
                    if (!this.markedPatternCells.has(cellKey)) {
                        this.markPatternCell(cellKey, cell);
                    }
                }
            });
            
            this.updatePatternCount();
            this.saveGameState();
            this.showNotification(`¡Columna ${letter} marcada!`, 'success');
        }
    }

    // Marcar todas las casillas de patrón
    markAllPatterns() {
        const patternCells = document.querySelectorAll('.pattern-cell');
        patternCells.forEach(cell => {
            if (!cell.classList.contains('black-cell')) {
                const cellKey = `${cell.dataset.row}-${cell.dataset.col}`;
                if (!this.markedPatternCells.has(cellKey)) {
                    this.markPatternCell(cellKey, cell);
                }
            }
        });
        
        this.updatePatternCount();
        this.saveGameState();
        this.showNotification('¡PLENO marcado!', 'success');
    }

    // Marcar cuadro pequeño (8 casillas del centro)
    markSmallSquare() {
        const centerCells = [
            '3-2', '3-3', '3-4',
            '4-2', '4-4',
            '5-2', '5-3', '5-4'
        ];
        
        centerCells.forEach(cellKey => {
            const cell = document.querySelector(`[data-row="${cellKey.split('-')[0]}"][data-col="${cellKey.split('-')[1]}"]`);
            if (cell && !cell.classList.contains('black-cell')) {
                if (!this.markedPatternCells.has(cellKey)) {
                    this.markPatternCell(cellKey, cell);
                }
            }
        });
        
        this.updatePatternCount();
        this.saveGameState();
        this.showNotification('¡Cuadro pequeño marcado!', 'success');
    }

    // Marcar letra H
    markLetterH() {
        const hCells = [
            '2-1', '3-1', '4-1', '5-1', '6-1', // Columna izquierda
            '2-5', '3-5', '4-5', '5-5', '6-5', // Columna derecha
            '4-2', '4-3', '4-4' // Línea horizontal
        ];
        
        this.markLetterPattern(hCells, 'H');
    }

    // Marcar letra O
    markLetterO() {
        const oCells = [
            '2-2', '2-3', '2-4', // Línea superior
            '6-2', '6-3', '6-4', // Línea inferior
            '2-2', '3-2', '4-2', '5-2', // Columna izquierda
            '2-4', '3-4', '4-4', '5-4'  // Columna derecha
        ];
        
        this.markLetterPattern(oCells, 'O');
    }

    // Marcar letra U
    markLetterU() {
        const uCells = [
            '2-1', '3-1', '4-1', '5-1', // Columna izquierda
            '2-5', '3-5', '4-5', '5-5', // Columna derecha
            '6-1', '6-2', '6-3', '6-4', '6-5' // Línea inferior
        ];
        
        this.markLetterPattern(uCells, 'U');
    }

    // Marcar letra Z
    markLetterZ() {
        const zCells = [
            '2-1', '2-2', '2-3', '2-4', '2-5', // Línea superior
            '3-4', '4-3', '5-2', // Diagonal
            '6-1', '6-2', '6-3', '6-4', '6-5'  // Línea inferior
        ];
        
        this.markLetterPattern(zCells, 'Z');
    }

    // Marcar letra N
    markLetterN() {
        const nCells = [
            '2-1', '3-1', '4-1', '5-1', '6-1', // Columna izquierda
            '2-5', '3-5', '4-5', '5-5', '6-5', // Columna derecha
            '3-2', '4-3', '5-4' // Diagonal
        ];
        
        this.markLetterPattern(nCells, 'N');
    }

    // Función auxiliar para marcar patrones de letras
    markLetterPattern(cellKeys, letterName) {
        let markedCount = 0;
        
        cellKeys.forEach(cellKey => {
            const [row, col] = cellKey.split('-');
            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            if (cell && !cell.classList.contains('black-cell')) {
                if (!this.markedPatternCells.has(cellKey)) {
                    this.markPatternCell(cellKey, cell);
                    markedCount++;
                }
            }
        });
        
        this.updatePatternCount();
        this.saveGameState();
        this.showNotification(`¡Letra ${letterName} marcada! (${markedCount} casillas)`, 'success');
    }

    resetGame() {
        if (confirm('¿Estás seguro de que quieres reiniciar el juego? Se perderá todo el progreso.')) {
            this.markedNumbers.clear();
            this.markedPatternCells.clear();
            
            // Limpiar tabla principal
            const numberCells = document.querySelectorAll('.number-cell');
            numberCells.forEach(cell => {
                cell.classList.remove('marked');
            });
            
            // Limpiar tabla de patrones
            const patternCells = document.querySelectorAll('.pattern-cell');
            patternCells.forEach(cell => {
                cell.classList.remove('marked');
            });
            
            this.updateMarkedCount();
            this.updatePatternCount();
            this.saveGameState();
            
            // Mostrar notificación
            this.showNotification('¡Juego reiniciado!', 'success');
        }
    }

    updateMarkedCount() {
        const markedCountElement = document.getElementById('markedCount');
        markedCountElement.textContent = this.markedNumbers.size;
        
        // Cambiar color del contador según el progreso
        const percentage = (this.markedNumbers.size / this.totalNumbers) * 100;
        if (percentage >= 80) {
            markedCountElement.style.color = '#4CAF50'; // Verde
        } else if (percentage >= 50) {
            markedCountElement.style.color = '#FF9800'; // Naranja
        } else {
            markedCountElement.style.color = '#2196F3'; // Azul
        }
    }

    updatePatternCount() {
        const patternCountElement = document.getElementById('patternCount');
        patternCountElement.textContent = this.markedPatternCells.size;
        
        // Cambiar color del contador según el progreso
        const percentage = (this.markedPatternCells.size / this.totalPatternCells) * 100;
        if (percentage >= 80) {
            patternCountElement.style.color = '#9C27B0'; // Púrpura
        } else if (percentage >= 50) {
            patternCountElement.style.color = '#FF9800'; // Naranja
        } else {
            patternCountElement.style.color = '#2196F3'; // Azul
        }
    }

    handleKeyboardShortcuts(e) {
        // Ctrl + R: Reiniciar
        if (e.ctrlKey && e.key === 'r') {
            e.preventDefault();
            this.resetGame();
        }
        // Escape: Desmarcar último número
        else if (e.key === 'Escape') {
            if (this.markedNumbers.size > 0) {
                const lastMarked = Array.from(this.markedNumbers).pop();
                const cell = document.querySelector(`[data-number="${lastMarked}"]`);
                if (cell) {
                    this.unmarkNumber(lastMarked, cell);
                    this.updateMarkedCount();
                    this.saveGameState();
                }
            }
        }
    }

    saveGameState() {
        try {
            const gameState = {
                markedNumbers: Array.from(this.markedNumbers),
                markedPatternCells: Array.from(this.markedPatternCells),
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('bingoGameState', JSON.stringify(gameState));
        } catch (error) {
            console.warn('No se pudo guardar el estado del juego:', error);
        }
    }

    loadGameState() {
        try {
            const savedState = localStorage.getItem('bingoGameState');
            if (savedState) {
                const gameState = JSON.parse(savedState);
                this.markedNumbers = new Set(gameState.markedNumbers || []);
                this.markedPatternCells = new Set(gameState.markedPatternCells || []);
                
                // Aplicar el estado guardado a la tabla principal
                this.markedNumbers.forEach(number => {
                    const cell = document.querySelector(`[data-number="${number}"]`);
                    if (cell) {
                        cell.classList.add('marked');
                    }
                });
                
                // Aplicar el estado guardado a la tabla de patrones
                this.markedPatternCells.forEach(cellKey => {
                    const [row, col] = cellKey.split('-');
                    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                    if (cell) {
                        cell.classList.add('marked');
                    }
                });
                
                this.updateMarkedCount();
                this.updatePatternCount();
            }
        } catch (error) {
            console.warn('No se pudo cargar el estado del juego:', error);
        }
    }

    showNotification(message, type = 'info') {
        // Crear notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        // Agregar estilos
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideIn 0.3s ease-out;
        `;
        
        // Botón de cerrar
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            margin-left: 10px;
        `;
        
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        // Agregar al DOM
        document.body.appendChild(notification);
        
        // Auto-remover después de 3 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease-in';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 3000);
    }
}

// Agregar estilos CSS para las animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes markPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1.1); }
    }
    
    @keyframes unmarkPulse {
        0% { transform: scale(1.1); }
        50% { transform: scale(0.9); }
        100% { transform: scale(1); }
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Inicializar el juego cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new BingoGame();
    
    // Mostrar mensaje de bienvenida
    setTimeout(() => {
        const welcomeMessage = document.createElement('div');
        welcomeMessage.innerHTML = `
            <h2>¡Bienvenido al Bingo Hermandad Jesus Nazareno!</h2>
            <p><strong>Instrucciones:</strong></p>
            <ul>
                <li>Haz clic en cualquier número para marcarlo/desmarcarlo</li>
                <li>Haz clic en las casillas de patrón para marcarlas/desmarcarlas</li>
                <li>Usa los botones de patrones para crear figuras especiales</li>
                <li><strong>Atajos de teclado:</strong></li>
                <li>Ctrl + R: Reiniciar</li>
                <li>Escape: Desmarcar último número</li>
            </ul>
        `;
        welcomeMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            z-index: 1001;
            max-width: 500px;
            text-align: center;
        `;
        
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '¡Entendido!';
        closeBtn.style.cssText = `
            background: #4CAF50;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 20px;
            font-size: 16px;
        `;
        closeBtn.addEventListener('click', () => welcomeMessage.remove());
        
        welcomeMessage.appendChild(closeBtn);
        document.body.appendChild(welcomeMessage);
    }, 1000);
});

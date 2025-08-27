# Bingo Hermandad Jesus Nazareno

Una aplicación web interactiva para jugar al bingo con 75 números (1-75).

## Características

- **Tabla de 5x16**: 5 filas y 16 columnas con las letras BINGO y números del 1-75
- **Marcado interactivo**: Haz clic en cualquier número para marcarlo/desmarcarlo
- **Controles masivos**: Botones para marcar/desmarcar todos los números
- **Persistencia**: El estado del juego se guarda automáticamente en el navegador
- **Responsive**: Diseño adaptable a diferentes tamaños de pantalla
- **Atajos de teclado**: Comandos rápidos para una mejor experiencia

## Estructura de la Tabla

- **Columna 1**: Letras BINGO (con colores diferentes)
- **Columna 2-16**: Números distribuidos por filas:
  - Fila 1: Números 1-15
  - Fila 2: Números 16-30
  - Fila 3: Números 31-45
  - Fila 4: Números 46-60
  - Fila 5: Números 61-75

## Controles

### Botones
- **Marcar Todos**: Marca todos los números del 1-75
- **Desmarcar Todos**: Desmarca todos los números marcados
- **Reiniciar**: Limpia todo el progreso (con confirmación)

### Atajos de Teclado
- **Ctrl + A**: Marcar todos los números
- **Ctrl + D**: Desmarcar todos los números
- **Ctrl + R**: Reiniciar el juego
- **Escape**: Desmarcar el último número marcado

## Cómo Usar

1. Abre `index.html` en tu navegador web
2. Haz clic en cualquier número para marcarlo (aparecerá en verde con un ✓)
3. Haz clic nuevamente para desmarcarlo
4. Usa los botones de control para operaciones masivas
5. El contador muestra cuántos números están marcados
6. Tu progreso se guarda automáticamente

## Archivos del Proyecto

- `index.html` - Estructura HTML principal
- `styles.css` - Estilos y diseño visual
- `script.js` - Funcionalidad JavaScript del juego
- `logo-bingo-naza.png` - Logo del bingo (debes agregarlo)

## Requisitos

- Navegador web moderno con soporte para:
  - CSS Grid y Flexbox
  - LocalStorage
  - ES6+ JavaScript
  - CSS Animations

## Instalación

1. Descarga todos los archivos en una carpeta
2. Agrega tu logo como `logo-bingo-naza.png`
3. Abre `index.html` en tu navegador
4. ¡Disfruta del bingo!

## Personalización

Puedes personalizar:
- Colores en `styles.css`
- Funcionalidad en `script.js`
- Estructura en `index.html`

## Soporte

La aplicación es completamente funcional en navegadores modernos y se adapta automáticamente a diferentes tamaños de pantalla.

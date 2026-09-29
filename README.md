# Caza al Bug

Misión M1 · El Despertar del DOM — Web Development I.

## Cómo probarlo

1. Abre `index.html` en el navegador, directamente o usando Live Server en VS Code.
2. Pulsa el botón **Jugar**.
3. Aparecerá un bug 🐛 de forma aleatoria en una de las 9 casillas.
4. Haz clic sobre el bug para sumar puntos.
5. La partida dura 30 segundos.
6. A medida que aumenta la puntuación, el bug se mueve más rápido:
   - Menos de 5 puntos: cada 1000 ms.
   - De 5 a 9 puntos: cada 800 ms.
   - De 10 a 14 puntos: cada 600 ms.
   - 15 puntos o más: cada 450 ms.
7. Cuando el tiempo llega a 0, el juego se detiene y aparece el botón **Jugar de nuevo**.
8. Al pulsarlo, la puntuación, el tiempo y la velocidad vuelven a su estado inicial.

## Uso de IA

Recibí acceso a los contenidos de la asignatura hace menos de una semana y actualmente me encuentro fuera del país, por lo que utilicé IA de forma intensiva como apoyo para ponerme al día con el entorno de trabajo y los conceptos de la misión.

Utilicé **ChatGPT** como guía para configurar el entorno de desarrollo, instalar Node.js, Gemini CLI y Git, preparar el repositorio de GitHub y entender el proceso de trabajo de la asignatura.

También utilicé **Gemini CLI dentro de VS Code** como apoyo para programar el proyecto fase a fase. En lugar de pedir el juego completo de una vez, dividí el desarrollo en pequeñas partes y probé cada una antes de continuar.

Algunos prompts utilizados fueron:

> "Voy a construir un juego Caza al Bug con HTML, CSS y JavaScript puro, sin frameworks ni librerías. Antes de escribir código, propón 4 o 5 fases pequeñas para construirlo y dime qué estado necesito guardar en JavaScript."

Otro ejemplo fue:

> "Vamos a hacer únicamente la Fase 3. Quiero que al hacer clic sobre la celda que contiene el bug sume 1 punto, actualice el marcador y cambie el bug de posición. Usa addEventListener y no uses onclick."

También utilicé IA para revisar problemas que encontré durante las pruebas, por ejemplo:
- El juego inicialmente comenzaba automáticamente sin pulsar **Jugar**.
- El botón de inicio no tenía ningún evento asociado.
- El temporizador inicialmente era solo texto y no descontaba segundos.
- El nombre de una variable de intervalo podía confundirse con el temporizador de la partida.
- El botón mostraba un texto incorrecto mientras la partida estaba activa.
- Añadí dificultad progresiva para que el bug aumentara su velocidad según la puntuación.

Verifiqué los cambios manualmente en el navegador después de cada fase. Probé clics sobre el bug y sobre casillas vacías, el marcador, la cuenta atrás, el fin de partida, el reinicio y el cambio de velocidad al superar determinados puntos.

Gemini propuso gran parte del código, pero revisé cada cambio antes de continuar, detecté errores durante las pruebas y fui solicitando correcciones concretas. También realicé manualmente la configuración del proyecto, Git, GitHub, los commits por fases y las pruebas funcionales en el navegador.

## Autopsia

### 1. Guardar la posición del bug en `currentCellIndex`

Decidí guardar en JavaScript el índice de la celda donde se encuentra el bug mediante `currentCellIndex`.

Esto permite saber directamente qué celda contiene el bug y comprobar si el clic del jugador es correcto mediante una comparación de índices.

La alternativa era buscar cada vez en el DOM qué elemento tenía la clase `bug`, pero la descarté porque hace que la lógica del juego dependa más del estado visual del HTML. Preferí que JavaScript mantuviera el estado y que el DOM solamente lo representara.

### 2. Cambiar la velocidad solo cuando se alcanza un nuevo nivel de dificultad

Para la dificultad progresiva utilizo `currentBugSpeed` y una función que calcula la velocidad correspondiente según la puntuación.

Inicialmente se planteó reiniciar el `setInterval` después de cada punto. Descarté esa opción porque sería innecesario reiniciar el intervalo cuando la velocidad sigue siendo la misma.

Ahora el intervalo solo se elimina y se crea de nuevo cuando se pasa a un nuevo tramo de dificultad, por ejemplo de 1000 ms a 800 ms al alcanzar 5 puntos.

Esto evita intervalos innecesarios y hace más clara la relación entre la puntuación y la dificultad.
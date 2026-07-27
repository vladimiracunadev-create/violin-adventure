import type { Lesson } from "../types";

export const lessons: Lesson[] = [
  {
    id: "meet-the-violin", world: 1, order: 1, title: "Conoce tu violín", subtitle: "Partes, nombres y cuidado", icon: "🎻", durationMinutes: 10,
    objective: "Reconocer el instrumento, el arco y las reglas básicas de cuidado.", skills: ["Cuidado", "Vocabulario"], visualGuide: "/illustrations/violin-parts.svg",
    adultNote: "Revisa que el puente esté derecho, que no existan piezas sueltas y que el arco sea manipulado por la vara.",
    steps: [
      { title: "Explora sin tocar", instruction: "Busca la voluta, las clavijas, el diapasón, el puente y el cordal en la ilustración y en tu violín.", durationMinutes: 3, kind: "observe" },
      { title: "Nombra las cuerdas", instruction: "Desde la más grave a la más aguda di: Sol, Re, La y Mi.", durationMinutes: 2, kind: "listen", referenceFrequency: 440 },
      { title: "Conoce el arco", instruction: "Sujétalo por la vara. Observa la nuez, el tornillo y las cerdas sin tocarlas con los dedos.", durationMinutes: 3, kind: "observe", safety: "La grasa de los dedos afecta las cerdas." },
      { title: "Ritual del estuche", instruction: "Practica sacar y guardar el violín en el orden correcto, con ayuda adulta.", durationMinutes: 2, kind: "move" }
    ],
    quiz: { question: "¿Cuántas cuerdas tiene normalmente un violín?", options: ["Tres", "Cuatro", "Seis"], answer: 1, explanation: "El violín tiene cuatro cuerdas: Sol, Re, La y Mi." }, reward: "Exploradora del instrumento"
  },
  {
    id: "healthy-posture", world: 1, order: 2, title: "Postura saludable", subtitle: "Equilibrio antes que fuerza", icon: "🧍‍♀️", durationMinutes: 11,
    objective: "Sostener el instrumento con una postura equilibrada, respiración libre y sin dolor.", skills: ["Postura", "Relajación"], visualGuide: "/illustrations/posture.svg",
    adultNote: "La altura de la hombrera y la mentonera depende del cuerpo de cada niña; una profesora debe comprobar el ajuste.",
    steps: [
      { title: "Pies estables", instruction: "Separa los pies al ancho de las caderas, reparte el peso y deja las rodillas desbloqueadas.", durationMinutes: 2, kind: "move" },
      { title: "Hombros tranquilos", instruction: "Inhala y exhala tres veces. Comprueba que ambos hombros permanezcan bajos.", durationMinutes: 2, kind: "reflect" },
      { title: "Sube el violín", instruction: "Lleva el violín al hombro izquierdo; gira la cabeza suavemente, sin aplastar el instrumento.", durationMinutes: 4, kind: "move", safety: "Detente ante dolor, hormigueo o tensión persistente." },
      { title: "Prueba de libertad", instruction: "Mueve los dedos, abre la boca y respira. El cuerpo debe seguir libre.", durationMinutes: 3, kind: "reflect" }
    ],
    quiz: { question: "¿Cuál es la señal de una postura saludable?", options: ["Respirar y moverse con libertad", "Apretar con la mandíbula", "Levantar el hombro"], answer: 0, explanation: "La postura debe permitir respirar y moverse sin tensión." }, reward: "Guardiana de la postura"
  },
  {
    id: "bow-pencil", world: 1, order: 3, title: "El conejito del arco", subtitle: "Primero con un lápiz", icon: "✏️", durationMinutes: 10,
    objective: "Formar una mano derecha redonda y flexible antes de usar el arco.", skills: ["Arco", "Motricidad"], visualGuide: "/illustrations/bow-hold.svg",
    steps: [
      { title: "Círculo suave", instruction: "Forma un círculo entre pulgar y dedo medio alrededor de un lápiz grueso.", durationMinutes: 3, kind: "move" },
      { title: "Meñique redondo", instruction: "Apoya la punta del meñique arriba del lápiz, sin dejarlo rígido.", durationMinutes: 2, kind: "move" },
      { title: "Dedos que respiran", instruction: "Abre y cierra ligeramente los dedos sin perder el lápiz.", durationMinutes: 2, kind: "move" },
      { title: "Ascensor", instruction: "Mueve el lápiz hacia arriba y abajo manteniendo la muñeca libre.", durationMinutes: 3, kind: "play" }
    ],
    quiz: { question: "¿Cómo deben sentirse los dedos de la mano del arco?", options: ["Curvos y flexibles", "Rectos y duros", "Apretados"], answer: 0, explanation: "Los dedos curvos y flexibles permiten controlar el arco." }, reward: "Amiga del conejito"
  },
  {
    id: "bow-care", world: 1, order: 4, title: "Prepara y guarda el arco", subtitle: "Tensión y resina con ayuda", icon: "🪄", durationMinutes: 10,
    objective: "Preparar el arco sin dañarlo y desarrollar hábitos responsables.", skills: ["Cuidado", "Arco"],
    adultNote: "La primera aplicación de resina y la tensión correcta deben ser demostradas por una persona con experiencia.",
    steps: [
      { title: "Observa la curva", instruction: "Mira la vara antes de tensar. Debe conservar una curva hacia las cerdas.", durationMinutes: 2, kind: "observe" },
      { title: "Tensión segura", instruction: "Con ayuda adulta, gira el tornillo solo hasta dejar un espacio moderado entre vara y cerdas.", durationMinutes: 3, kind: "move", safety: "Nunca dejes la vara recta ni el arco tenso al guardarlo." },
      { title: "Resina necesaria", instruction: "Aprende que la resina se aplica en poca cantidad y no en cada práctica.", durationMinutes: 2, kind: "observe" },
      { title: "Guarda y afloja", instruction: "Afloja el arco y colócalo en su espacio del estuche.", durationMinutes: 3, kind: "move" }
    ],
    quiz: { question: "¿Cómo debe guardarse el arco?", options: ["Tenso", "Aflojado", "Sin tornillo"], answer: 1, explanation: "Guardar el arco aflojado protege la vara y las cerdas." }, reward: "Protectora del arco"
  },
  {
    id: "open-strings", world: 2, order: 5, title: "Las cuatro voces", subtitle: "Sol, Re, La y Mi", icon: "🎵", durationMinutes: 12,
    objective: "Reconocer visualmente y de oído las cuatro cuerdas al aire.", skills: ["Oído", "Cuerdas"],
    steps: [
      { title: "Voz grave", instruction: "Escucha Sol y describe si suena oscura, profunda o tranquila.", durationMinutes: 3, kind: "listen", referenceFrequency: 196 },
      { title: "Voces centrales", instruction: "Escucha Re y La. Decide cuál es más aguda.", durationMinutes: 3, kind: "listen", referenceFrequency: 293.66 },
      { title: "Voz brillante", instruction: "Escucha Mi, la cuerda más fina y aguda.", durationMinutes: 2, kind: "listen", referenceFrequency: 659.25 },
      { title: "Orden y memoria", instruction: "Di Sol–Re–La–Mi y luego Mi–La–Re–Sol sin mirar.", durationMinutes: 4, kind: "play" }
    ],
    quiz: { question: "¿Cuál es la cuerda más grave?", options: ["Sol", "La", "Mi"], answer: 0, explanation: "Sol es la cuerda más gruesa y grave." }, reward: "Detective de las cuerdas"
  },
  {
    id: "steady-pulse", world: 2, order: 6, title: "El pulso secreto", subtitle: "Camina, cuenta y aplaude", icon: "👏", durationMinutes: 11,
    objective: "Mantener un pulso regular y reconocer negra, blanca y silencio.", skills: ["Ritmo", "Coordinación"],
    steps: [
      { title: "Camina ocho", instruction: "Da ocho pasos iguales mientras cuentas del uno al ocho.", durationMinutes: 2, kind: "move" },
      { title: "Negras", instruction: "Aplaude una vez en cada pulso: uno, dos, tres, cuatro.", durationMinutes: 3, kind: "play" },
      { title: "Blancas", instruction: "Aplaude en uno y mantén las manos juntas hasta el siguiente uno.", durationMinutes: 3, kind: "play" },
      { title: "Silencio activo", instruction: "Cuenta cuatro pulsos y deja el tercero sin aplaudir, pero sigue sintiéndolo.", durationMinutes: 3, kind: "play" }
    ],
    quiz: { question: "¿Cuántos pulsos dura normalmente una blanca?", options: ["Uno", "Dos", "Tres"], answer: 1, explanation: "En este nivel, una blanca dura dos pulsos." }, reward: "Capitana del pulso"
  },
  {
    id: "first-pizzicato", world: 2, order: 7, title: "Primer pizzicato", subtitle: "Música con un dedo", icon: "👉", durationMinutes: 12,
    objective: "Pulsar cuerdas al aire con sonido claro y sin tensión.", skills: ["Pizzicato", "Ritmo"],
    steps: [
      { title: "Pulgar compañero", instruction: "Apoya suavemente el pulgar derecho en la esquina del diapasón.", durationMinutes: 2, kind: "move" },
      { title: "La que vibra", instruction: "Pulsa la cuerda La con el índice y deja que termine de vibrar.", durationMinutes: 3, kind: "play", referenceFrequency: 440 },
      { title: "Viaje por cuatro", instruction: "Toca Sol, Re, La y Mi lentamente, mirando qué cuerda eliges.", durationMinutes: 3, kind: "play" },
      { title: "Eco", instruction: "Repite: La–La, pausa, La–La. Luego inventa un eco con Re.", durationMinutes: 4, kind: "play" }
    ],
    quiz: { question: "¿Qué significa pizzicato?", options: ["Pulsar la cuerda con un dedo", "Tocar solo muy rápido", "Girar las clavijas"], answer: 0, explanation: "En pizzicato el sonido se produce pulsando la cuerda." }, reward: "Inventora del pizzicato"
  },
  {
    id: "string-crossing-pizz", world: 2, order: 8, title: "Puentes entre cuerdas", subtitle: "Cambios sin perder el pulso", icon: "🌉", durationMinutes: 13,
    objective: "Cambiar entre cuerdas vecinas en pizzicato manteniendo un pulso estable.", skills: ["Pizzicato", "Cambios de cuerda"],
    steps: [
      { title: "Re y La", instruction: "Alterna Re–La ocho veces, muy lentamente.", durationMinutes: 3, kind: "play" },
      { title: "La y Mi", instruction: "Alterna La–Mi sin mover todo el brazo.", durationMinutes: 3, kind: "play" },
      { title: "Sol y Re", instruction: "Alterna Sol–Re escuchando la diferencia de altura.", durationMinutes: 3, kind: "play" },
      { title: "Patrón de cuatro", instruction: "Toca Re–Re–La–La durante cuatro vueltas con el metrónomo a 60 BPM.", durationMinutes: 4, kind: "play" }
    ],
    quiz: { question: "Al cambiar de cuerda, ¿qué conviene conservar?", options: ["El pulso", "La tensión", "La velocidad máxima"], answer: 0, explanation: "El cambio debe ocurrir sin perder el pulso ni tensar el cuerpo." }, reward: "Constructora de puentes"
  },
  {
    id: "bow-lane", world: 3, order: 9, title: "La pista del arco", subtitle: "Paralelo al puente", icon: "↔️", durationMinutes: 13,
    objective: "Mover el arco en una trayectoria aproximadamente paralela al puente.", skills: ["Arco recto", "Sonido"], visualGuide: "/illustrations/bow-lane.svg",
    steps: [
      { title: "Vía imaginaria", instruction: "Sin apoyar el arco, muévelo sobre una línea imaginaria paralela al puente.", durationMinutes: 3, kind: "move" },
      { title: "Zona central", instruction: "Apoya la parte central del arco en La, entre puente y diapasón.", durationMinutes: 3, kind: "move" },
      { title: "Abajo y arriba", instruction: "Haz un recorrido corto hacia abajo y otro hacia arriba con la misma lentitud.", durationMinutes: 4, kind: "play", referenceFrequency: 440 },
      { title: "Espejo amable", instruction: "Mira en un espejo si el arco conserva la dirección. Corrige poco, no a la fuerza.", durationMinutes: 3, kind: "reflect", safety: "Detente si el hombro sube o aparece dolor." }
    ],
    quiz: { question: "¿Cómo debería viajar el arco respecto del puente?", options: ["Paralelo", "Siempre diagonal", "Sobre el puente"], answer: 0, explanation: "Una trayectoria paralela favorece un sonido estable." }, reward: "Piloto de la pista"
  },
  {
    id: "bow-weight-speed", world: 3, order: 10, title: "Peso y velocidad", subtitle: "Encuentra un sonido cómodo", icon: "⚖️", durationMinutes: 14,
    objective: "Explorar cómo la velocidad y el peso del arco modifican el sonido.", skills: ["Calidad sonora", "Control del arco"],
    steps: [
      { title: "Arco muy liviano", instruction: "Toca La con poco contacto y escucha el sonido aireado.", durationMinutes: 3, kind: "listen" },
      { title: "Demasiado peso", instruction: "Con supervisión, aumenta apenas el peso hasta notar el inicio de un sonido áspero; vuelve atrás.", durationMinutes: 3, kind: "listen", safety: "No presiones con fuerza ni prolongues un sonido incómodo." },
      { title: "Velocidad media", instruction: "Usa una velocidad tranquila y busca un sonido claro durante cuatro pulsos.", durationMinutes: 4, kind: "play" },
      { title: "Describe", instruction: "Elige tres palabras para tu mejor sonido: claro, suave, brillante, cálido u otras.", durationMinutes: 4, kind: "reflect" }
    ],
    quiz: { question: "¿Qué produce normalmente demasiado peso del arco?", options: ["Un sonido áspero", "Silencio perfecto", "Afinación automática"], answer: 0, explanation: "Demasiado peso puede aplastar la vibración y volver áspero el sonido." }, reward: "Científica del sonido"
  },
  {
    id: "left-hand-map", world: 3, order: 11, title: "Mapa de la mano izquierda", subtitle: "Pulgar suave y dedos redondos", icon: "🖐️", durationMinutes: 12,
    objective: "Colocar la mano izquierda sin apretar el mango.", skills: ["Mano izquierda", "Relajación"], visualGuide: "/illustrations/left-hand.svg",
    steps: [
      { title: "Mano de títere", instruction: "Deja caer la mano y observa la curva natural de los dedos.", durationMinutes: 2, kind: "observe" },
      { title: "Pulgar compañero", instruction: "Apoya el pulgar suavemente al costado del mango.", durationMinutes: 3, kind: "move" },
      { title: "Túnel", instruction: "Conserva espacio entre la palma y el mango; la mano no debe abrazarlo.", durationMinutes: 3, kind: "move" },
      { title: "Dedos 1–4", instruction: "Nombra índice 1, medio 2, anular 3 y meñique 4.", durationMinutes: 4, kind: "play" }
    ],
    quiz: { question: "¿Qué número recibe el dedo índice?", options: ["0", "1", "2"], answer: 1, explanation: "El índice es el dedo 1; la cuerda al aire se indica con 0." }, reward: "Cartógrafa de la mano"
  },
  {
    id: "finger-taps", world: 3, order: 12, title: "Dedos que aterrizan", subtitle: "Caer y levantar sin golpear", icon: "🛬", durationMinutes: 13,
    objective: "Mover los dedos de la mano izquierda de forma independiente y relajada.", skills: ["Dedos", "Coordinación"],
    steps: [
      { title: "Aterrizaje en mesa", instruction: "Sobre una mesa, levanta y deja caer cada dedo curvo sin hundir la muñeca.", durationMinutes: 3, kind: "move" },
      { title: "Uno y dos", instruction: "En la cuerda La, coloca y levanta los dedos 1 y 2 sin arco.", durationMinutes: 3, kind: "move" },
      { title: "Uno–dos–tres", instruction: "Añade el dedo 3 manteniendo los anteriores cerca de la cuerda.", durationMinutes: 3, kind: "move" },
      { title: "Secuencia silenciosa", instruction: "Haz 0–1–2–3 y 3–2–1–0 cuatro veces, lentamente.", durationMinutes: 4, kind: "play" }
    ],
    quiz: { question: "¿Cómo deben caer los dedos sobre la cuerda?", options: ["Curvos y precisos", "Planos y tensos", "Desde muy lejos"], answer: 0, explanation: "Los dedos curvos caen con precisión y permanecen cerca de la cuerda." }, reward: "Piloto de dedos"
  },
  {
    id: "notes-on-a", world: 4, order: 13, title: "Notas en la cuerda La", subtitle: "La, Si, Do♯ y Re", icon: "🌈", durationMinutes: 15,
    objective: "Tocar cuatro notas consecutivas en la cuerda La.", skills: ["Afinación", "Digitación"],
    adultNote: "Las cintas de referencia deben ser colocadas o verificadas por una profesora o persona con buen oído.",
    steps: [
      { title: "La = 0", instruction: "Toca La al aire y di: cero, La.", durationMinutes: 3, kind: "play", referenceFrequency: 440 },
      { title: "Si = 1", instruction: "Coloca el primer dedo y compara tu Si con la referencia.", durationMinutes: 4, kind: "play", referenceFrequency: 493.88 },
      { title: "Do♯ = 2", instruction: "Coloca el segundo dedo alto y escucha si la nota está estable.", durationMinutes: 4, kind: "play", referenceFrequency: 554.37 },
      { title: "Re = 3", instruction: "Añade el tercer dedo y toca 0–1–2–3 lentamente.", durationMinutes: 4, kind: "play", referenceFrequency: 587.33 }
    ],
    quiz: { question: "¿Qué nota produce el primer dedo en la cuerda La?", options: ["Si", "Do♯", "Re"], answer: 0, explanation: "En esta posición, el primer dedo sobre La produce Si." }, reward: "Escaladora de La"
  },
  {
    id: "notes-on-d", world: 4, order: 14, title: "Notas en la cuerda Re", subtitle: "Re, Mi, Fa♯ y Sol", icon: "🪜", durationMinutes: 15,
    objective: "Tocar cuatro notas consecutivas en la cuerda Re.", skills: ["Afinación", "Digitación"],
    steps: [
      { title: "Re = 0", instruction: "Toca Re al aire y escucha su resonancia.", durationMinutes: 3, kind: "play", referenceFrequency: 293.66 },
      { title: "Mi = 1", instruction: "Coloca el primer dedo y compáralo con la referencia.", durationMinutes: 4, kind: "play", referenceFrequency: 329.63 },
      { title: "Fa♯ = 2", instruction: "Coloca el segundo dedo alto, separado del primero.", durationMinutes: 4, kind: "play", referenceFrequency: 369.99 },
      { title: "Sol = 3", instruction: "Añade el tercer dedo y toca 0–1–2–3–2–1–0.", durationMinutes: 4, kind: "play", referenceFrequency: 392 }
    ],
    quiz: { question: "¿Qué nota produce el tercer dedo en la cuerda Re?", options: ["Sol", "La", "Fa"], answer: 0, explanation: "El tercer dedo en la cuerda Re produce Sol." }, reward: "Escaladora de Re"
  },
  {
    id: "d-major-scale", world: 4, order: 15, title: "Escala de Re mayor", subtitle: "Ocho pasos musicales", icon: "🧗", durationMinutes: 16,
    objective: "Unir las notas de las cuerdas Re y La en una escala ascendente y descendente.", skills: ["Escala", "Cambio de cuerda"],
    steps: [
      { title: "Primera mitad", instruction: "Toca Re–Mi–Fa♯–Sol en la cuerda Re.", durationMinutes: 4, kind: "play" },
      { title: "Segunda mitad", instruction: "Toca La–Si–Do♯–Re en la cuerda La.", durationMinutes: 4, kind: "play" },
      { title: "Sube completa", instruction: "Une las ocho notas a 60 BPM, una nota por pulso.", durationMinutes: 4, kind: "play" },
      { title: "Baja completa", instruction: "Vuelve desde Re agudo hasta Re grave sin acelerar.", durationMinutes: 4, kind: "play" }
    ],
    quiz: { question: "¿Cuántas notas diferentes tiene una escala completa hasta repetir la inicial?", options: ["Cuatro", "Siete", "Doce"], answer: 1, explanation: "La escala de Re mayor usa siete nombres de notas y repite Re en la octava." }, reward: "Montañista de la escala"
  },
  {
    id: "finger-pattern-one", world: 4, order: 16, title: "Patrón de dedos 1", subtitle: "Separado, separado, junto", icon: "🧩", durationMinutes: 14,
    objective: "Comprender el patrón de dedos usado en Re mayor sobre Re y La.", skills: ["Patrones", "Afinación"],
    steps: [
      { title: "Mira las distancias", instruction: "Observa: entre 1 y 2 hay espacio; entre 2 y 3 hay poco espacio.", durationMinutes: 3, kind: "observe" },
      { title: "Patrón en Re", instruction: "Coloca Mi, Fa♯ y Sol comprobando que 2 y 3 estén cercanos.", durationMinutes: 4, kind: "play" },
      { title: "Patrón en La", instruction: "Repite con Si, Do♯ y Re.", durationMinutes: 4, kind: "play" },
      { title: "Oído detective", instruction: "Usa el afinador cromático para comprobar una nota, no todas.", durationMinutes: 3, kind: "listen" }
    ],
    quiz: { question: "En este patrón, ¿qué dedos están más juntos?", options: ["1 y 2", "2 y 3", "3 y 4"], answer: 1, explanation: "En el patrón de Re mayor, los dedos 2 y 3 quedan próximos." }, reward: "Maestra del patrón"
  },
  {
    id: "music-reading-staff", world: 5, order: 17, title: "El pentagrama", subtitle: "Cinco líneas para contar historias", icon: "🎼", durationMinutes: 13,
    objective: "Reconocer pentagrama, clave de Sol, líneas y espacios.", skills: ["Lectura", "Teoría"], visualGuide: "/illustrations/staff.svg",
    steps: [
      { title: "Cinco líneas", instruction: "Cuenta las cinco líneas desde abajo hacia arriba.", durationMinutes: 3, kind: "observe" },
      { title: "Cuatro espacios", instruction: "Busca los cuatro espacios entre las líneas.", durationMinutes: 2, kind: "observe" },
      { title: "Clave de Sol", instruction: "Observa cómo la clave rodea la segunda línea, donde vive la nota Sol.", durationMinutes: 4, kind: "observe" },
      { title: "Dibujo musical", instruction: "Dibuja un pentagrama y una nota en línea y otra en espacio.", durationMinutes: 4, kind: "play" }
    ],
    quiz: { question: "¿Cuántas líneas tiene el pentagrama?", options: ["Cuatro", "Cinco", "Seis"], answer: 1, explanation: "El pentagrama musical está formado por cinco líneas." }, reward: "Lectora de mapas musicales"
  },
  {
    id: "read-d-a-notes", world: 5, order: 18, title: "Lee las notas de Re y La", subtitle: "Del papel al instrumento", icon: "📖", durationMinutes: 15,
    objective: "Relacionar notas escritas con las cuerdas Re y La y sus primeros tres dedos.", skills: ["Lectura", "Digitación"],
    steps: [
      { title: "Tarjetas Re", instruction: "Nombra Re, Mi, Fa♯ y Sol en cuatro tarjetas o en la pantalla.", durationMinutes: 3, kind: "observe" },
      { title: "Tarjetas La", instruction: "Nombra La, Si, Do♯ y Re agudo.", durationMinutes: 3, kind: "observe" },
      { title: "Lee y toca", instruction: "Elige cuatro tarjetas al azar y tócalas lentamente.", durationMinutes: 5, kind: "play" },
      { title: "Crea un compás", instruction: "Ordena cuatro notas, toca tu creación y ponle un nombre.", durationMinutes: 4, kind: "play" }
    ],
    quiz: { question: "¿Qué conecta la lectura musical?", options: ["Símbolo, nombre y sonido", "Solo velocidad", "Solo memoria"], answer: 0, explanation: "Leer significa relacionar lo escrito con su nombre, su posición y su sonido." }, reward: "Traductora musical"
  },
  {
    id: "eighth-notes", world: 5, order: 19, title: "Corcheas en pareja", subtitle: "Dos sonidos dentro de un pulso", icon: "🎶", durationMinutes: 14,
    objective: "Sentir y tocar dos corcheas por pulso sin acelerar.", skills: ["Ritmo", "Corcheas"],
    steps: [
      { title: "Di ta-ka", instruction: "En cada pulso di ta-ka, manteniendo igual duración para ambas sílabas.", durationMinutes: 3, kind: "play" },
      { title: "Palmas", instruction: "Aplaude dos veces por pulso durante ocho pulsos.", durationMinutes: 3, kind: "play" },
      { title: "Pizzicato", instruction: "Toca La–La en cada pulso a 60 BPM.", durationMinutes: 4, kind: "play" },
      { title: "Combina", instruction: "Haz negra, dos corcheas, negra, silencio y repite.", durationMinutes: 4, kind: "play" }
    ],
    quiz: { question: "¿Cuántas corcheas caben en un pulso de negra?", options: ["Una", "Dos", "Cuatro"], answer: 1, explanation: "Dos corcheas comparten el tiempo de una negra." }, reward: "Corredora de corcheas"
  },
  {
    id: "bow-divisions", world: 5, order: 20, title: "Mapa del arco", subtitle: "Talón, centro y punta", icon: "🗺️", durationMinutes: 15,
    objective: "Reconocer y usar tres zonas del arco con control.", skills: ["Distribución del arco", "Sonido"],
    steps: [
      { title: "Tres zonas", instruction: "Señala talón, centro y punta sin tocar las cerdas.", durationMinutes: 3, kind: "observe" },
      { title: "Centro seguro", instruction: "Toca cuatro negras usando solo la zona central.", durationMinutes: 4, kind: "play" },
      { title: "Mitad inferior", instruction: "Toca dos blancas desde el centro hacia el talón y vuelve.", durationMinutes: 4, kind: "play" },
      { title: "Mitad superior", instruction: "Toca dos blancas desde el centro hacia la punta, sin estirar de más el brazo.", durationMinutes: 4, kind: "play", safety: "No bloquees el codo ni lleves el hombro hacia adelante." }
    ],
    quiz: { question: "¿Dónde conviene comenzar los primeros sonidos?", options: ["En el centro del arco", "Solo en la punta", "Sobre el tornillo"], answer: 0, explanation: "La zona central suele ser más fácil de equilibrar al comenzar." }, reward: "Navegante del arco"
  },
  {
    id: "twinkle", world: 6, order: 21, title: "Estrellita", subtitle: "Una melodía por fragmentos", icon: "⭐", durationMinutes: 17,
    objective: "Interpretar la primera parte de Estrellita con ritmo estable.", skills: ["Repertorio", "Memoria"],
    steps: [
      { title: "Canta y marca", instruction: "Canta la melodía mientras marcas un pulso tranquilo.", durationMinutes: 3, kind: "listen" },
      { title: "Primer motivo", instruction: "Toca La–La–Mi–Mi–Fa♯–Fa♯–Mi, primero en pizzicato.", durationMinutes: 5, kind: "play" },
      { title: "Segundo motivo", instruction: "Toca Re–Re–Do♯–Do♯–Si–Si–La.", durationMinutes: 5, kind: "play" },
      { title: "Une", instruction: "Une ambos motivos sin detenerte por errores pequeños.", durationMinutes: 4, kind: "play" }
    ],
    quiz: { question: "¿Qué ayuda al aprender una canción?", options: ["Dividirla en fragmentos", "Tocarla rápido de inmediato", "Evitar cantar"], answer: 0, explanation: "Los fragmentos pequeños permiten escuchar, corregir y memorizar." }, reward: "Primera estrella musical"
  },
  {
    id: "ode-to-joy", world: 6, order: 22, title: "Oda a la alegría", subtitle: "Una frase con dirección", icon: "😊", durationMinutes: 18,
    objective: "Preparar y tocar una frase sencilla con notas consecutivas.", skills: ["Repertorio", "Fraseo"],
    steps: [
      { title: "Canta primero", instruction: "Canta el inicio usando la sílaba la y siente dónde respira la frase.", durationMinutes: 3, kind: "listen" },
      { title: "Dedos silenciosos", instruction: "Practica la secuencia de dedos sin arco y sin apretar.", durationMinutes: 4, kind: "move" },
      { title: "Pizzicato lento", instruction: "Toca la frase a 60 BPM, corrigiendo solo un detalle cada vez.", durationMinutes: 5, kind: "play" },
      { title: "Con arco", instruction: "Toca fragmentos de dos compases con sonido tranquilo.", durationMinutes: 6, kind: "play" }
    ],
    quiz: { question: "Antes de aumentar la velocidad, la frase debe salir…", options: ["Clara y estable", "Cada vez distinta", "Con mucha fuerza"], answer: 0, explanation: "La velocidad llega después de controlar notas, ritmo y postura." }, reward: "Mensajera de la alegría"
  },
  {
    id: "chilean-rhythm", world: 6, order: 23, title: "Un aire chileno", subtitle: "Pulso, acento y creación", icon: "🇨🇱", durationMinutes: 17,
    objective: "Explorar un patrón rítmico inspirado en música chilena sin copiar repertorio protegido.", skills: ["Ritmo", "Creatividad"],
    steps: [
      { title: "Pulso de tres", instruction: "Cuenta 1–2–3 y acentúa suavemente el primer pulso.", durationMinutes: 3, kind: "play" },
      { title: "Palma y silencio", instruction: "Aplaude en 1 y 3; mantén vivo el pulso 2 en silencio.", durationMinutes: 4, kind: "play" },
      { title: "Cuerdas al aire", instruction: "Toca Re–La–La siguiendo el patrón de tres pulsos.", durationMinutes: 5, kind: "play" },
      { title: "Tu variación", instruction: "Crea un compás nuevo usando Re y La y repítelo cuatro veces.", durationMinutes: 5, kind: "play" }
    ],
    quiz: { question: "¿Qué es un acento musical?", options: ["Un pulso destacado", "Una nota siempre aguda", "Tocar sin contar"], answer: 0, explanation: "El acento destaca un pulso o sonido dentro del patrón." }, reward: "Creadora de ritmos"
  },
  {
    id: "mini-recital", world: 6, order: 24, title: "Mi primer recital", subtitle: "Preparar, tocar y reflexionar", icon: "🏆", durationMinutes: 20,
    objective: "Preparar una interpretación breve y evaluar el progreso con amabilidad.", skills: ["Interpretación", "Autonomía"],
    steps: [
      { title: "Elige", instruction: "Escoge una canción o ejercicio que disfrutes y puedas tocar sin tensión.", durationMinutes: 3, kind: "reflect" },
      { title: "Plan de tres partes", instruction: "Practica inicio, parte difícil y final por separado.", durationMinutes: 6, kind: "play" },
      { title: "Ensayo completo", instruction: "Toca una vez sin detenerte por errores pequeños.", durationMinutes: 5, kind: "play" },
      { title: "Recital familiar", instruction: "Toca para alguien de confianza y nombra un logro y una próxima meta.", durationMinutes: 6, kind: "reflect" }
    ],
    quiz: { question: "Después de tocar, ¿qué reflexión ayuda más?", options: ["Reconocer un logro y una meta", "Compararse con profesionales", "Decir que todo salió mal"], answer: 0, explanation: "Una evaluación concreta y amable ayuda a continuar aprendiendo." }, reward: "Violinista aventurera"
  }
];

export const worlds = [
  { id: 1, title: "Conozco mi instrumento", subtitle: "Cuidado, postura y arco", icon: "🏕️" },
  { id: 2, title: "Descubro el sonido", subtitle: "Cuerdas, pulso y pizzicato", icon: "🌳" },
  { id: 3, title: "Construyo un buen sonido", subtitle: "Arco y mano izquierda", icon: "🌊" },
  { id: 4, title: "Mis primeras notas", subtitle: "Digitación, afinación y escala", icon: "🏔️" },
  { id: 5, title: "Leo y organizo música", subtitle: "Pentagrama, ritmo y arco", icon: "📚" },
  { id: 6, title: "Comparto mi música", subtitle: "Canciones, creación y recital", icon: "🌟" }
];

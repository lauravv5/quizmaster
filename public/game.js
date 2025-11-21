// game.js (robusto) - espera DOM, logs y manejo completo
document.addEventListener("DOMContentLoaded", () => {

  // --- leer URL ---
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  const difficulty = params.get("difficulty");

  console.log("game.js inicializado:", { category, difficulty });

  if (!category || !difficulty) {
    console.warn("Falta category o difficulty en la URL. Redirigiendo...");
    // mejor redirigir a difficulty o categories
    window.location.href = "difficulty.html";
    return;
  }

  // --- ajustes por dificultad ---
  let timePerQuestion = 15;
  let pointsPerCorrect = 10;
  if (difficulty === "facil") { timePerQuestion = 20; pointsPerCorrect = 10; }
  if (difficulty === "medio") { timePerQuestion = 15; pointsPerCorrect = 20; }
  if (difficulty === "dificil") { timePerQuestion = 10; pointsPerCorrect = 30; }

  // --- preguntas (ejemplo: reemplaza/amplía con tus 30) ---
  const preguntas = {
    cultura: {
      facil: [
  { q: "¿Cuál es la capital de Italia?", o: ["Roma","París","Lisboa","Atenas"], c: 0 },
  { q: "¿En qué país se encuentra Machu Picchu?", o: ["México","Perú","Chile","Brasil"], c: 1 },
  { q: "¿Qué idioma se habla en Brasil?", o: ["Portugués","Español","Inglés","Francés"], c: 0 },
  { q: "¿Cuál es el océano más grande?", o: ["Índico","Atlántico","Pacífico","Ártico"], c: 2 },
  { q: "¿Qué moneda se usa en Estados Unidos?", o: ["Euro","Dólar","Peso","Libra"], c: 1 },

  { q: "¿En qué país nació Picasso?", o: ["España","Italia","Francia","Portugal"], c: 0 },
  { q: "¿Cuál es el monumento más famoso de París?", o: ["Torre Eiffel","Big Ben","Taj Mahal","Coliseo"], c: 0 },
  { q: "¿Qué país es famoso por el sushi?", o: ["China","Corea","Japón","Tailandia"], c: 2 },
  { q: "¿Qué animal es símbolo de Australia?", o: ["Koala","Lobo","Panda","Tigre"], c: 0 },
  { q: "¿Cuál es el idioma oficial de Egipto?", o: ["Árabe","Hebreo","Persa","Turco"], c: 0 },

  { q: "¿En qué continente está Argentina?", o: ["Europa","América del Sur","África","Oceanía"], c: 1 },
  { q: "¿Dónde se encuentra la Torre de Pisa?", o: ["Italia","Francia","España","Alemania"], c: 0 },
  { q: "¿Qué país es conocido como 'La tierra del hielo'?", o: ["Islandia","Suecia","Rusia","Canadá"], c: 0 },
  { q: "¿Cuál es el río más largo del mundo?", o: ["Nilo","Amazonas","Yangtsé","Misisipi"], c: 1 },
  { q: "¿Qué país es famoso por la muralla?", o: ["Japón","China","India","Corea"], c: 1 },

  { q: "¿Qué ciudad es famosa por el Cristo Redentor?", o: ["Buenos Aires","Lima","Río de Janeiro","Santiago"], c: 2 },
  { q: "¿En qué país nació Beethoven?", o: ["Alemania","Austria","Francia","Holanda"], c: 0 },
  { q: "¿Qué país es conocido por el tango?", o: ["Chile","México","Argentina","Colombia"], c: 2 },
  { q: "¿Cuál es el país más grande del mundo?", o: ["China","Rusia","Canadá","Estados Unidos"], c: 1 },
  { q: "¿Qué instrumento tiene teclas?", o: ["Violín","Guitarra","Piano","Trompeta"], c: 2 }
],

      medio: [
  { q: "¿En qué país se originaron los Juegos Olímpicos?", o: ["Roma","Grecia","Francia","Turquía"], c: 1 },
  { q: "¿Quién escribió 'La Odisea'?", o: ["Homero","Sófocles","Virgilio","Aristóteles"], c: 0 },
  { q: "¿Qué monumento mandó construir el emperador Shah Jahan?", o: ["Torre Eiffel","Taj Mahal","Coliseo","Castillo de Osaka"], c: 1 },
  { q: "¿Cuál es la capital de Canadá?", o: ["Toronto","Vancouver","Ottawa","Montreal"], c: 2 },
  { q: "¿Qué civilización construyó Chichén Itzá?", o: ["Inca","Maya","Azteca","Olmeca"], c: 1 },

  { q: "¿Quién pintó 'La noche estrellada'?", o: ["Da Vinci","Van Gogh","Picasso","Monet"], c: 1 },
  { q: "¿Qué país utiliza yenes?", o: ["China","Corea","Japón","Tailandia"], c: 2 },
  { q: "¿Cuál es la montaña más alta del mundo?", o: ["Everest","K2","Aconcagua","Mont Blanc"], c: 0 },
  { q: "¿Qué filósofo escribió 'La República'?", o: ["Platón","Sócrates","Aristóteles","Descartes"], c: 0 },
  { q: "¿Cuál es el desierto más grande del mundo?", o: ["Gobi","Sahara","Atacama","Arabia"], c: 1 },

  { q: "¿Qué país inventó la pólvora?", o: ["China","India","Japón","Irán"], c: 0 },
  { q: "¿Cuál es la capital de Turquía?", o: ["Estambul","Ankara","Izmir","Bursa"], c: 1 },
  { q: "¿Quién compuso la Novena Sinfonía?", o: ["Mozart","Bach","Beethoven","Vivaldi"], c: 2 },
  { q: "¿En qué país está el monte Fuji?", o: ["Corea","China","Japón","Indonesia"], c: 2 },
  { q: "¿Cuál es la capital de Marruecos?", o: ["Casablanca","Rabat","Fez","Tánger"], c: 1 },

  { q: "¿Dónde se originó el flamenco?", o: ["Italia","España","Colombia","Portugal"], c: 1 },
  { q: "¿En qué país nació Frida Kahlo?", o: ["México","Colombia","España","Ecuador"], c: 0 },
  { q: "¿Qué ciudad es conocida como 'La Gran Manzana'?", o: ["Chicago","Nueva York","Los Ángeles","Miami"], c: 1 },
  { q: "¿Qué país colonizó la India?", o: ["España","Francia","Portugal","Reino Unido"], c: 3 },
  { q: "¿Qué cultura creó las líneas de Nazca?", o: ["Nazca","Inca","Chimú","Moche"], c: 0 }
],
      dificil: [
  { q: "¿En qué año cayó el Imperio Romano de Occidente?", o: ["476 d.C.","1492","1066","395 d.C."], c: 0 },
  { q: "¿Dónde nació el filósofo Nietzsche?", o: ["Alemania","Austria","Suiza","Hungría"], c: 0 },
  { q: "¿Qué emperador construyó el Muro de Adriano?", o: ["Trajano","Adriano","Nerón","Marco Aurelio"], c: 1 },
  { q: "¿Qué país era llamado Persia?", o: ["Irak","Irán","Turquía","Pakistán"], c: 1 },
  { q: "¿Quién escribió 'El Príncipe'?", o: ["Maquiavelo","Hobbes","Platón","Descartes"], c: 0 },

  { q: "¿Qué rey francés fue conocido como 'El Rey Sol'?", o: ["Luis XIV","Luis XVI","Luis XIII","Felipe II"], c: 0 },
  { q: "¿Dónde se originó el haiku?", o: ["China","Japón","Corea","Vietnam"], c: 1 },
  { q: "¿Qué pueblo construyó Petra?", o: ["Fenicios","Nabateos","Asirios","Hititas"], c: 1 },
  { q: "¿Quién pintó 'Las Meninas'?", o: ["Velázquez","Goya","El Greco","Murillo"], c: 0 },
  { q: "¿Cuál fue la primera civilización en usar escritura?", o: ["Egipcios","Sumerios","Hititas","Fenicios"], c: 1 },

  { q: "¿Qué país tuvo la dinastía Ming?", o: ["China","Japón","Corea","India"], c: 0 },
  { q: "¿Quién escribió 'Crimen y castigo'?", o: ["Tolstói","Dostoievski","Gógol","Pushkin"], c: 1 },
  { q: "¿Qué civilización construyó Teotihuacán?", o: ["Azteca","Maya","Desconocida","Tolteca"], c: 2 },
  { q: "¿Cuál fue la primera universidad del mundo?", o: ["Oxford","Bolonia","Al Qarawiyyin","La Sorbona"], c: 2 },
  { q: "¿Dónde nació Chopin?", o: ["Alemania","Francia","Polonia","Rusia"], c: 2 },

  { q: "¿Qué guerra terminó en 1918?", o: ["Guerra Fría","1ª Guerra Mundial","2ª Guerra Mundial","Guerra Ruso-Japonesa"], c: 1 },
  { q: "¿Qué país construyó Angkor Wat?", o: ["Tailandia","China","Camboya","India"], c: 2 },
  { q: "¿Qué cultura creó los moáis?", o: ["Rapa Nui","Moche","Ainu","Maorí"], c: 0 },
  { q: "¿Quién escribió 'La metamorfosis'?", o: ["Kafka","Hesse","Mann","Camus"], c: 0 },
  { q: "¿Dónde se encuentra el Vaticano?", o: ["Italia","España","Francia","Alemania"], c: 0 }
],
    },

    ciencia: {
      facil: [
  { q: "¿Qué fuerza nos mantiene en el suelo?", o: ["Inercia","Fricción","Gravedad","Electricidad"], c: 2 },

  { q: "¿Cuál es el planeta más grande del sistema solar?", o: ["Marte","Júpiter","Tierra","Venus"], c: 1 },

  { q: "¿Qué órgano usamos para respirar?", o: ["Pulmones","Hígado","Corazón","Riñón"], c: 0 },

  { q: "¿Cuál es el estado líquido del agua congelada?", o: ["Sólido","Gas","Líquido","Plasma"], c: 2 },

  { q: "¿Qué astro es el centro del sistema solar?", o: ["La Luna","El Sol","Júpiter","Marte"], c: 1 },

  { q: "¿Cómo se llama el satélite natural de la Tierra?", o: ["Europa","Fobos","Luna","Titán"], c: 2 },

  { q: "¿Qué animal pone huevos?", o: ["Perro","Gato","Gallina","Delfín"], c: 2 },

  { q: "¿Cuál es el metal líquido a temperatura ambiente?", o: ["Mercurio","Oro","Plata","Aluminio"], c: 0 },

  { q: "¿Qué gas exhalamos al respirar?", o: ["Oxígeno","Nitrógeno","Helio","Dióxido de carbono"], c: 3 },

  { q: "¿Qué parte del cuerpo bombea sangre?", o: ["Riñón","Corazón","Pulmón","Hígado"], c: 1 },

  { q: "¿Qué planeta tiene anillos visibles?", o: ["Venus","Saturno","Marte","Mercurio"], c: 1 },

  { q: "¿Qué animal es un mamífero?", o: ["Tiburón","Ballena","Lagarto","Gallina"], c: 1 },

  { q: "¿Cómo se llama el proceso por el cual el agua se convierte en vapor?", o: ["Evaporación","Condensación","Solidificación","Filtración"], c: 0 },

  { q: "¿Cuál es el órgano del gusto?", o: ["Nariz","Lengua","Oído","Piel"], c: 1 },

  { q: "¿Qué instrumento mide la temperatura?", o: ["Microscopio","Termómetro","Barómetro","Regla"], c: 1 },

  { q: "¿Qué tipo de energía produce una pila?", o: ["Lumínica","Eléctrica","Térmica","Nuclear"], c: 1 },

  { q: "¿Qué animal vive en colonias?", o: ["Hormiga","León","Tortuga","Puma"], c: 0 },

  { q: "¿Cuál de estos NO es un planeta?", o: ["Plutón","Neptuno","Urano","Sol"], c: 3 },

  { q: "¿Qué vitamina se obtiene del sol?", o: ["A","C","D","K"], c: 2 },

  { q: "¿Qué ser vivo produce miel?", o: ["Mosca","Avispa","Hormiga","Abeja"], c: 3 }
],
      medio: [
  { q: "¿Qué célula transporta oxígeno en la sangre?", o: ["Plaquetas","Glóbulos rojos","Glóbulos blancos","Neutrófilos"], c: 1 },

  { q: "¿Qué órgano produce la insulina?", o: ["Hígado","Riñón","Páncreas","Estómago"], c: 2 },

  { q: "¿Qué científico propuso la teoría de la relatividad?", o: ["Newton","Einstein","Galileo","Bohr"], c: 1 },

  { q: "¿Qué tipo de energía produce un panel solar?", o: ["Térmica","Química","Solar","Eólica"], c: 2 },

  { q: "¿Qué parte del átomo tiene carga positiva?", o: ["Neutrón","Protón","Electrón","Ión"], c: 1 },

  { q: "¿Cuál es el metal más abundante en la Tierra?", o: ["Aluminio","Hierro","Cobre","Calcio"], c: 0 },

  { q: "¿Qué capa de la Tierra es líquida?", o: ["Manto","Corteza","Núcleo externo","Núcleo interno"], c: 2 },

  { q: "¿Cuál es la bacteria que causa neumonía?", o: ["E. coli","Streptococcus pneumoniae","Salmonella","Vibrio"], c: 1 },

  { q: "¿Qué proceso forma las nubes?", o: ["Condensación","Evaporación","Fusión","Sublimación"], c: 0 },

  { q: "¿Qué órgano filtra la sangre?", o: ["Corazón","Riñones","Pulmones","Intestino"], c: 1 },

  { q: "¿Cuál es la molécula que almacena energía en las células?", o: ["ADN","ATP","ARN","Glucógeno"], c: 1 },

  { q: "¿Qué fenómeno explica el arcoíris?", o: ["Reflexión","Refracción","Difracción","Interferencia"], c: 1 },

  { q: "¿Qué unidad mide la fuerza?", o: ["Watt","Newton","Pascal","Volt"], c: 1 },

  { q: "¿Qué tejido conecta músculo y hueso?", o: ["Ligamento","Tendón","Cartílago","Dermis"], c: 1 },

  { q: "¿Qué planeta tiene el día más corto?", o: ["Tierra","Júpiter","Marte","Venus"], c: 1 },

  { q: "¿Cuál es el gas más abundante en la atmósfera?", o: ["Nitrógeno","Oxígeno","CO₂","Argón"], c: 0 },

  { q: "¿Qué parte del ojo controla la cantidad de luz?", o: ["Retina","Córnea","Iris","Humor vítreo"], c: 2 },

  { q: "¿Qué descubrimiento se atribuye a Pasteur?", o: ["Penicilina","Vacunas","Pasteurización","Radiación"], c: 2 },

  { q: "¿Qué aparato mide la presión atmosférica?", o: ["Termómetro","Higrómetro","Barómetro","Anemómetro"], c: 2 },

  { q: "¿Qué mineral fortalece los huesos?", o: ["Sodio","Potasio","Calcio","Hierro"], c: 2 }
],
      dificil: [
  { q: "¿Qué partícula medió la fuerza electromagnética?", o: ["Gluón","Fotón","Bosón W","Neutrino"], c: 1 },

  { q: "¿Cuál es la constante de Planck?", o: ["6.62×10⁻³⁴ J·s","9.81 m/s²","3×10⁸ m/s","1.6×10⁻¹⁹ C"], c: 0 },

  { q: "¿Qué tipo de radiación tiene mayor energía?", o: ["Infrarroja","Ultravioleta","Rayos X","Microondas"], c: 2 },

  { q: "¿Qué científico descubrió la penicilina?", o: ["Curie","Fleming","Pasteur","Koch"], c: 1 },

  { q: "¿Qué elemento tiene número atómico 26?", o: ["Calcio","Hierro","Zinc","Magnesio"], c: 1 },

  { q: "¿Qué estructura celular produce energía?", o: ["Ribosoma","Mitocondria","Núcleo","Lisosoma"], c: 1 },

  { q: "¿Qué teoría propone la expansión del universo?", o: ["Teoría cuántica","Big Bang","Evolución","Relatividad"], c: 1 },

  { q: "¿Qué propiedad mide el pH?", o: ["Temp.","Aromaticidad","Acidez","Conductividad"], c: 2 },

  { q: "¿Qué nombre recibe un átomo con carga?", o: ["Isótopo","Ión","Molécula","Compuesto"], c: 1 },

  { q: "¿Qué parte del ADN contiene la información?", o: ["Genes","Proteínas","Ribosomas","Lípidos"], c: 0 },

  { q: "¿Qué campo estudia los hongos?", o: ["Botánica","Zoología","Micología","Ecología"], c: 2 },

  { q: "¿Qué científico formuló las leyes de gases?", o: ["Boyle","Darwin","Faraday","Kepler"], c: 0 },

  { q: "¿Qué técnica separa sustancias por tamaño?", o: ["Electroforesis","Destilación","Filtración","Tamizado"], c: 3 },

  { q: "¿Qué planeta es conocido por sus vientos extremos?", o: ["Saturno","Urano","Neptuno","Venus"], c: 2 },

  { q: "¿Qué tipo de célula no tiene núcleo?", o: ["Vegetal","Animal","Procariota","Fúngica"], c: 2 },

  { q: "¿Qué unidad mide la resistencia eléctrica?", o: ["Ohm","Ampere","Volt","Watt"], c: 0 },

  { q: "¿Qué experimento demostró la dualidad onda-partícula?", o: ["Cavendish","Doble rendija","Millikan","Rutherford"], c: 1 },

  { q: "¿Qué proteína transporta oxígeno en la sangre?", o: ["Actina","Hemoglobina","Colágeno","Queratina"], c: 1 },

  { q: "¿Qué órgano produce la bilis?", o: ["Riñón","Hígado","Estómago","Páncreas"], c: 1 },

  { q: "¿Qué científico propuso la selección natural?", o: ["Darwin","Hubble","Mendel","Hooke"], c: 0 }
]

    },

    entretenimiento: {
      facil: [
  { q: "¿Qué personaje vive en una piña bajo el mar?", o: ["Bob Esponja","Patricio","Calamardo","Plankton"], c: 0 },

  { q: "¿Qué superhéroe usa un traje de hierro?", o: ["Superman","Iron Man","Batman","Hulk"], c: 1 },

  { q: "¿De qué película es Buzz Lightyear?", o: ["Shrek","Toy Story","Cars","Up"], c: 1 },

  { q: "¿Cuál es la princesa de hielo?", o: ["Ariel","Elsa","Jasmín","Mulan"], c: 1 },

  { q: "¿Quién vive en Neverland?", o: ["Peter Pan","Tarzán","Aladdín","Pinocho"], c: 0 },

  { q: "¿Qué animal es Simba?", o: ["León","Tigre","Zorro","Pantera"], c: 0 },

  { q: "¿De qué color es Sonic?", o: ["Rojo","Amarillo","Azul","Verde"], c: 2 },

  { q: "¿Cuál es el mejor amigo de Shrek?", o: ["Pinocho","Burro","Gato con Botas","Fiona"], c: 1 },

  { q: "Película con juguetes que cobran vida:", o: ["Toy Story","Ratatouille","Frozen","Moana"], c: 0 },

  { q: "¿Quién es el villano de La Sirenita?", o: ["Úrsula","Scar","Hades","Jafar"], c: 0 },

  { q: "¿A qué saga pertenece Darth Vader?", o: ["Star Wars","Harry Potter","Avatar","Matrix"], c: 0 },

  { q: "¿Qué animal acompaña a Moana?", o: ["Perro","Cerdito","Mono","Cabra"], c: 1 },

  { q: "¿Qué héroe lanza telarañas?", o: ["Iron Man","Batman","Spider-Man","Flash"], c: 2 },

  { q: "Personaje amarillo de ojos grandes:", o: ["Minion","Pikachu","Jake","Finn"], c: 0 },

  { q: "¿Qué personaje dice '¡Al infinito y más allá!'?", o: ["Woody","Buzz Lightyear","Mike","Sulley"], c: 1 },

  { q: "¿Quién es el padre de Nemo?", o: ["Marlin","Dory","Bruce","Gill"], c: 0 },

  { q: "¿Qué princesa tiene un camaleón verde?", o: ["Bella","Rapunzel","Cenicienta","Aurora"], c: 1 },

  { q: "Casa de superhéroes 'Los Increíbles':", o: ["Parr","Super","Max","Sky"], c: 0 },

  { q: "¿En qué película canta 'Libre Soy'?", o: ["Frozen","Moana","Coco","Encanto"], c: 0 },

  { q: "¿Quién es el ogro verde más famoso?", o: ["Shrek","Hulk","Fiona","Gollum"], c: 0 }
],
      medio: [
  { q: "¿Quién es el creador de Dragon Ball?", o: ["Eiichiro Oda","Akira Toriyama","Kishimoto","Togashi"], c: 1 },

  { q: "¿En qué año se estrenó Titanic?", o: ["1997","2000","1995","1999"], c: 0 },

  { q: "¿Qué serie es conocida por el Trono de Hierro?", o: ["Vikings","Game of Thrones","The Witcher","Merlín"], c: 1 },

  { q: "Director de El Señor de los Anillos:", o: ["James Cameron","Peter Jackson","Spielberg","Nolan"], c: 1 },

  { q: "¿Qué héroe pertenece a DC?", o: ["Iron Man","Thor","Superman","Hulk"], c: 2 },

  { q: "¿Qué país animó 'El viaje de Chihiro'?", o: ["Corea","China","Japón","Vietnam"], c: 2 },

  { q: "Banda que interpreta 'Bohemian Rhapsody':", o: ["Queen","Beatles","Nirvana","ABBA"], c: 0 },

  { q: "¿En qué película aparece Jack Sparrow?", o: ["Narnia","Piratas del Caribe","Indiana Jones","Star Wars"], c: 1 },

  { q: "¿Qué videojuego creó Mario Bros?", o: ["Sony","Sega","Nintendo","EA"], c: 2 },

  { q: "¿Quién estuvo en Friends?", o: ["Jim Carrey","Jennifer Aniston","Angelina Jolie","Rihanna"], c: 1 },

  { q: "¿Cuál es el apellido de Elsa y Anna?", o: ["Arendelle","Van Arendelle","Snow","No se dice"], c: 3 },

  { q: "¿Qué personaje usa un látigo?", o: ["Thor","Indy","Shrek","Batman"], c: 1 },

  { q: "Serie famosa por los 'demogorgons':", o: ["Loki","Dark","Stranger Things","The Boys"], c: 2 },

  { q: "Canción de Shakira con 'Loba':", o: ["Loba","Hips Don't Lie","Antología","Gitana"], c: 0 },

  { q: "¿Quién interpreta a Wolverine?", o: ["Henry Cavill","Robert Downey Jr","Chris Hemsworth","Hugh Jackman"], c: 3 },

  { q: "¿Cuál es el apellido de Harry?", o: ["Potter","Stark","Riddle","Smith"], c: 0 },

  { q: "¿Dónde vive 'Los Simpsons'?", o: ["Quahog","Springfield","Gravity Falls","South Park"], c: 1 },

  { q: "¿Qué superhéroe tiene un martillo?", o: ["Thor","Flash","Hulk","Capitán América"], c: 0 },

  { q: "Villano de Toy Story 3:", o: ["Lotso","Zurg","Sid","Stinky Pete"], c: 0 },

  { q: "Survival horror con zombis:", o: ["Minecraft","FIFA","Resident Evil","Mario Kart"], c: 2 }
],

      dificil: [
  { q: "¿En qué año se estrenó 'El Padrino'?", o: ["1972","1980","1969","1978"], c: 0 },

  { q: "Director de 'Pulp Fiction':", o: ["Kubrick","James Cameron","Tarantino","Nolan"], c: 2 },

  { q: "¿Quién compuso la banda sonora de 'Interstellar'?", o: ["Zimmer","Williams","Elfman","Silvestri"], c: 0 },

  { q: "¿Qué actor interpretó a Joker en 2008?", o: ["Phoenix","Leto","Heath Ledger","Depp"], c: 2 },

  { q: "Primer anime colorido de la historia:", o: ["Astro Boy","Sailor Moon","Doraemon","Kimba"], c: 3 },

  { q: "¿De qué país es la banda Rammstein?", o: ["Rusia","Suecia","Alemania","Noruega"], c: 2 },

  { q: "Estudio creador de 'Akira':", o: ["Toei","Sunrise","Ghibli","TMS"], c: 1 },

  { q: "¿Cuál fue el primer videojuego comercial?", o: ["Pac-Man","Pong","Space Invaders","Donkey Kong"], c: 1 },

  { q: "Película pionera del CGI:", o: ["Avatar","Toy Story","Jurassic Park","Terminator 2"], c: 2 },

  { q: "¿Qué director filmó 'El Resplandor'?", o: ["Kubrick","Spielberg","Burton","Nolan"], c: 0 },

  { q: "¿Quién escribió 'Canción de Hielo y Fuego'?", o: ["Tolkien","Rowling","George R. R. Martin","Lewis"], c: 2 },

  { q: "Premio máximo del cine en Cannes:", o: ["Oscar","Oso de Oro","Palma de Oro","León de Oro"], c: 2 },

  { q: "¿Qué anime introdujo los 'mechas'?", o: ["Evangelion","Mazinger Z","Gundam","Robotech"], c: 1 },

  { q: "¿Qué director es conocido por giros de trama?", o: ["Tarantino","Shyamalan","Fincher","Cameron"], c: 1 },

  { q: "Actor de 'Breaking Bad' (Walter White):", o: ["Aaron Paul","Bryan Cranston","Bob Odenkirk","Dean Norris"], c: 1 },

  { q: "Género musical de Metallica:", o: ["Punk","Trash Metal","Rock Pop","Reggae"], c: 1 },

  { q: "Universo cinematográfico de 'Thanos':", o: ["DCU","MCU","Fox","Sony"], c: 1 },

  { q: "Animador del stop-motion 'Coraline':", o: ["Laika","Pixar","Disney","Illumination"], c: 0 },

  { q: "¿Qué serie introdujo a Walter Bishop?", o: ["Lost","Fringe","Dexter","Heroes"], c: 1 },

  { q: "Juego cuyo mapa incluye 'Erangel':", o: ["Fortnite","PUBG","Valorant","GTA V"], c: 1 }
]

    }
  };

  const preguntasActuales = preguntas[category] && preguntas[category][difficulty] ? preguntas[category][difficulty] : null;
  if (!preguntasActuales || preguntasActuales.length === 0) {
    console.error("No hay preguntas para:", category, difficulty);
    alert("No hay preguntas para la categoría/dificultad seleccionada.");
    window.location.href = "categories.html";
    return;
  }

  // refs DOM
  const questionText = document.getElementById("question");
  const optionButtons = Array.from(document.querySelectorAll(".option"));
  const scoreText = document.getElementById("score");
  const timeText = document.getElementById("timeText");
  const timerCircle = document.getElementById("timer");
  const livesBox = document.getElementById("livesBox");

  // sonidos (con fallback)
const correctSound = document.getElementById("s-correct");
const wrongSound = document.getElementById("s-wrong");
const clickSound = document.getElementById("s-click");
const bgMusic = document.getElementById("bg-music");
// iniciar música al cargar el juego
window.addEventListener("click", () => {
  if (bgMusic.paused) bgMusic.volume = 0.25, bgMusic.play();
}, { once: true });
  // estado
  let currentIndex = 0;
  let score = 0;
  let lives = 3;
  let timer = null;
  const R = 40; // coincide con r=40 del SVG
  const CIRC = 2 * Math.PI * R;
  if (timerCircle) {
    timerCircle.style.strokeDasharray = `${CIRC}`;
    timerCircle.style.strokeDashoffset = `0`;
  }
window.addEventListener(
  "click",
  () => {
    if (bgMusic.paused) {
      bgMusic.volume = 0.25;
      bgMusic.play();
    }
  },
  { once: true }
);

  // render vidas
  function renderLives() {
    const lifeElems = Array.from(livesBox.querySelectorAll(".life"));
    lifeElems.forEach((el, i) => {
      if (i < lives) {
        el.style.opacity = "1";
        el.style.transform = "scale(1)";
        el.style.filter = "";
      } else {
        el.style.opacity = "0.25";
        el.style.transform = "scale(.85)";
        el.style.filter = "grayscale(80%)";
      }
    });
  }

  // iniciar timer por pregunta
  function startTimerForQuestion() {
    clearInterval(timer);
    let tiempo = timePerQuestion;
    timeText.textContent = tiempo;
    if (timerCircle) timerCircle.style.strokeDashoffset = `0`;

    timer = setInterval(() => {
      tiempo--;
      if (tiempo < 0) tiempo = 0;
      timeText.textContent = tiempo;

      if (timerCircle) {
        const elapsed = (timePerQuestion - tiempo);
        const offset = (elapsed / timePerQuestion) * CIRC;
        timerCircle.style.strokeDashoffset = `${offset}`;
      }

      if (tiempo <= 0) {
        clearInterval(timer);
        // cuando tiempo acabe
        markCorrectOnTimeoutAndAdvance();
      }
    }, 1000);
  }

  // cargar pregunta
  function loadQuestion() {
    if (currentIndex >= preguntasActuales.length) {
      finishGame();
      return;
    }
    const p = preguntasActuales[currentIndex];
    questionText.textContent = p.q;

    optionButtons.forEach((btn, i) => {
      btn.disabled = false;
      btn.classList.remove("correct", "wrong");
      btn.textContent = p.o[i] ?? "";
    });

    scoreText.textContent = score;
    renderLives();
    startTimerForQuestion();
  }

  // cuando se acaba el tiempo: mostrar correcta, sonar, perder vida, avanzar
  function markCorrectOnTimeoutAndAdvance() {
    const correctIndex = preguntasActuales[currentIndex].c;
    optionButtons.forEach((b, i) => b.disabled = true);
    if (optionButtons[correctIndex]) optionButtons[correctIndex].classList.add("correct");
    try { soundWrong && soundWrong.play(); } catch(e) {}
    setTimeout(() => {
      loseLifeAndAdvance();
    }, 900);
  }

  // chequear respuesta
  function checkAnswer(idx) {
    clearInterval(timer);
    optionButtons.forEach(b => b.disabled = true);
    const correctIndex = preguntasActuales[currentIndex].c;

    if (idx === correctIndex) {
      optionButtons[idx].classList.add("correct");
      correctSound.play();
      score += pointsPerCorrect;
      scoreText.textContent = score;
      try { soundCorrect && soundCorrect.play(); } catch(e){}
      setTimeout(() => {
        currentIndex++;
        resetOptions();
        loadQuestion();
      }, 900);
    } else {
      optionButtons[idx].classList.add("wrong");
       wrongSound.play();
      if (optionButtons[correctIndex]) optionButtons[correctIndex].classList.add("correct");
      try { soundWrong && soundWrong.play(); } catch(e){}
      setTimeout(() => {
        loseLifeAndAdvance();
      }, 900);
    }
  }

  // perder vida y avanzar
  function loseLifeAndAdvance() {
    lives = Math.max(0, lives - 1);
    renderLives();

    if (lives <= 0) {
      finishGame();
      return;
    }

    currentIndex++;
    resetOptions();
    loadQuestion();
  }

  function resetOptions() {
    optionButtons.forEach(b => {
      b.classList.remove("correct", "wrong");
      b.disabled = false;
    });
  }

  // finalizar juego -> results.html (ajusta el nombre si usas result.html)
// ===============================
function finishGame() {
    localStorage.setItem("puntajeFinal", score);

    // guardar récord
    let record = localStorage.getItem("recordMax");
    if (!record || score > parseInt(record)) {
        localStorage.setItem("recordMax", score);
    }

    window.location.href = `results.html?score=${score}`;
}
 

  // enlazar eventos click opciones
  optionButtons.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      try { soundClick && soundClick.play(); } catch(e){}
      checkAnswer(i);
    });
  });

  // iniciar
  renderLives();
  loadQuestion();

  // logs útiles
  console.log("Preguntas cargadas:", preguntasActuales.length, "tiempo/pregunta:", timePerQuestion, "pts/correcta:", pointsPerCorrect);
});

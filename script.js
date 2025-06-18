const problemas = {
    "salud": "Colapso sanitario. La gente muere sin acceso a hospitales.",
    "educacion": "Alto analfabetismo. La población no puede progresar.",
    "libertad": "Protestas masivas. No hay libertad de expresión.",
    "igualdad": "Discriminación generalizada. Grupos marginados protestan.",
    "trabajo": "Pobreza extrema. No hay salario justo ni empleos.",
    "medio ambiente": "Desastre ecológico. Tu país se vuelve inhabitable.",
    "justicia": "Corrupción y crimen. No hay leyes claras ni castigo justo.",
    "vivienda": "Personas sin hogar. Las ciudades colapsan.",
    "participacion": "Gobierno autoritario. El pueblo exige elecciones.",
    "infancia": "Infancia desprotegida. Hay explotación y abandono infantil.",
    "privacidad": "Vigilancia masiva. No existe vida privada.",
    "violencia": "Alto índice de violencia. La seguridad está en crisis.",
    "cultura": "Empobrecimiento cultural. Sin arte ni espacios de expresión.",
    "religion": "Conflictos por persecución religiosa. Faltan garantías de creencias.",
    "internet": "Desconexión digital. La sociedad no accede a la información.",
    "alimentacion": "Hambre y malnutrición. No hay acceso a comida básica.",
    "agua": "Crisis hídrica. La población no tiene agua potable.",
    "movilidad": "Personas atrapadas. No hay transporte seguro y accesible.",
    "identidad": "Personas invisibles. No tienen documentos ni derechos legales.",
    "seguridad social": "Desprotección total. Enfermos, ancianos y desempleados sin ayuda."
};

const palabras_clave = {
    "salud": ["salud", "hospital", "médico", "clínica", "atención médica", "servicio de salud"],
    "educacion": ["educación", "escuela", "colegio", "universidad", "enseñanza", "alfabetización"],
    "libertad": ["libertad", "expresión", "opinión", "hablar", "comunicación", "censura"],
    "igualdad": ["igualdad", "equidad", "discriminación", "mismo trato", "inclusión"],
    "trabajo": ["trabajo", "empleo", "salario", "ocupación", "condiciones laborales", "jornada"],
    "medio ambiente": ["medio ambiente", "naturaleza", "contaminación", "cambio climático", "ecología"],
    "justicia": ["justicia", "ley", "tribunal", "derecho legal", "castigo", "abogado"],
    "vivienda": ["vivienda", "casa", "hogar", "techo", "refugio"],
    "participacion": ["participación", "votar", "elección", "democracia", "representación", "sufragio"],
    "infancia": ["niños", "niñas", "infancia", "menores", "protección infantil"],
    "privacidad": ["privacidad", "datos personales", "vida privada", "espionaje"],
    "violencia": ["violencia", "maltrato", "abuso", "crimen", "seguridad", "agresión"],
    "cultura": ["cultura", "arte", "música", "deporte", "expresión cultural", "ocio"],
    "religion": ["religión", "creencias", "culto", "fe", "libertad religiosa"],
    "internet": ["internet", "red", "información", "tecnología", "conexión", "digital"],
    "alimentacion": ["alimentación", "comida", "nutrición", "hambre", "alimento"],
    "agua": ["agua", "potable", "hidratación", "saneamiento", "acceso al agua"],
    "movilidad": ["movilidad", "transporte", "caminar", "desplazamiento", "movilizarse"],
    "identidad": ["identidad", "documento", "registro civil", "nombre legal", "papeles"],
    "seguridad social": ["seguridad social", "pensión", "ayuda", "beneficio", "desempleo", "protección"]
};

const leyesTotales = [];

function analizarLey() {
    const input = document.getElementById("leyInput").value.trim().toLowerCase();
    const output = document.getElementById("output");

    if (!input.startsWith("ley")) {
        output.innerHTML = "⚠️ Tu ley debe comenzar con la palabra 'ley'. Intenta de nuevo.";
        return;
    }

    leyesTotales.push(input);
    const texto = leyesTotales.join(" ");

    const derechos_cubiertos = {};
    for (const derecho in problemas) {
        if (derecho === "violencia") {
            const negaciones = ["no", "prohibido", "prohíbe", "evitar", "rechaza", "elimina"];
            const contienePalabra = palabras_clave[derecho].some(p => texto.includes(p));
            const contieneNegacion = negaciones.some(n => texto.includes(n));
            derechos_cubiertos[derecho] = contienePalabra && contieneNegacion;
        } else {
            derechos_cubiertos[derecho] = palabras_clave[derecho].some(p => texto.includes(p));
        }
    }

    if (!Object.values(derechos_cubiertos).includes(true)) {
        output.innerHTML = "⚠️ Intenta otra vez: Revisa tu ortografía o asegúrate de que tu ley empiece con 'ley' y sea clara.";
        return;
    }

    for (const [d, cubierto] of Object.entries(derechos_cubiertos)) {
        if (!cubierto) {
            output.innerHTML = "📢 " + problemas[d];
            return;
        }
    }

    output.innerHTML = "🎉 ¡Tu país está en paz! Has garantizado todos los derechos fundamentales.";
    confetti(); // 🎊 ¡celebración visual!
}

// Activar el botón
document.getElementById("enviarBtn").addEventListener("click", analizarLey);

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ficha Clínica — Cosmiatría</title>
    <link rel="stylesheet" href="estilos.css">
</head>
<body>
    <div class="contenedor">
        <header class="cabecera">
            <h1>📋 Ficha Clínica Cosmiátrica</h1>
            <p>Registro de valoración y seguimiento de tratamientos</p>
        </header>

        <form id="formularioFicha">
            <section class="seccion">
                <h2>👤 Datos del Paciente</h2>
                <div class="grid-datos">
                    <div>
                        <label>Nombre completo:</label>
                        <input type="text" id="nombre" required>
                    </div>
                    <div>
                        <label>Edad:</label>
                        <input type="number" id="edad" min="10" max="110">
                    </div>
                    <div>
                        <label>Teléfono:</label>
                        <input type="tel" id="telefono">
                    </div>
                    <div>
                        <label>Fecha de valoración:</label>
                        <input type="date" id="fecha" required>
                    </div>
                </div>
            </section>

            <section class="seccion">
                <h2>📝 Antecedentes Relevantes</h2>
                <label>Alergias y/o medicamentos actuales:</label>
                <textarea id="alergias" rows="3" placeholder="Escribe aquí si el paciente tiene alguna alergia o toma medicamentos..."></textarea>

                <label>Tratamientos estéticos anteriores:</label>
                <textarea id="tratamientosPrevios" rows="2" placeholder="Escribe aquí si ha recibido tratamientos estéticos antes..."></textarea>
            </section>

            <section class="seccion">
                <h2>🔍 Valoración Cutánea</h2>
                <div class="grid-datos">
                    <div>
                        <label>Tipo de piel:</label>
                        <select id="tipoPiel">
                            <option value="">Selecciona una opción</option>
                            <option>Normal</option>
                            <option>Seca</option>
                            <option>Grasa</option>
                            <option>Mixta</option>
                            <option>Sensible</option>
                        </select>
                    </div>
                    <div>
                        <label>Fototipo:</label>
                        <select id="fototipo">
                            <option value="">Selecciona una opción</option>
                            <option>I — Muy claro</option>
                            <option>II — Claro</option>
                            <option>III — Medio</option>
                            <option>IV — Moreno claro</option>
                            <option>V — Moreno</option>
                            <option>VI — Muy oscuro</option>
                        </select>
                    </div>
                </div>
                <label>Observaciones de la piel:</label>
                <textarea id="observaciones" rows="3" placeholder="Manchas, arrugas, poros, sensibilidad, etc..."></textarea>
            </section>

            <section class="seccion">
                <h2>💆 Plan de Tratamiento</h2>
                <div id="listaTratamientos"></div>
                <button type="button" id="agregarTratamiento" class="btn-secundario">➕ Agregar tratamiento</button>

                <label>Recomendaciones y cuidados:</label>
                <textarea id="recomendaciones" rows="3" placeholder="Productos de uso diario, rutina en casa, próximas citas..."></textarea>
            </section>

            <div class="botones-accion">
                <button type="button" id="enviarWhatsApp" class="btn-whatsapp">📲 Enviar por WhatsApp</button>
                <button type="button" id="generarPDF" class="btn-principal">🖨️ Guardar / Imprimir PDF</button>
                <button type="button" id="nuevaFicha" class="btn-secundario">🆕 Ficha nueva</button>
            </div>
        </form>
    </div>

    <script src="script.js"></script>
</body>
</html>

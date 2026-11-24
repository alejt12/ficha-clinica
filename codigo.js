document.addEventListener('DOMContentLoaded', () => {
    const listaTratamientos = document.getElementById('listaTratamientos');
    const btnAgregar = document.getElementById('agregarTratamiento');
    const btnPDF = document.getElementById('generarPDF');
    const btnNueva = document.getElementById('nuevaFicha');
    const btnWhatsApp = document.getElementById('enviarWhatsApp');
    const form = document.getElementById('formularioFicha');
    const TELEFONO = '527296336318';
    let contadorTratamientos = 0;

    btnAgregar.addEventListener('click', () => {
        contadorTratamientos++;
        const item = document.createElement('div');
        item.className = 'tratamiento-item';
        item.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <strong>Tratamiento ${contadorTratamientos}</strong>
                <button type="button" class="btn-eliminar" style="background:none; border:none; color:#c77; font-size:1.1rem; cursor:pointer;">✕</button>
            </div>
            <div class="grid-datos" style="margin-top:8px;">
                <div>
                    <label>Nombre:</label>
                    <input type="text" class="t-nombre" placeholder="Ej: Hidratación profunda">
                </div>
                <div>
                    <label>Fecha:</label>
                    <input type="date" class="t-fecha">
                </div>
                <div>
                    <label>Observaciones/Resultado:</label>
                    <input type="text" class="t-nota" placeholder="Nota de evolución">
                </div>
            </div>
        `;
        listaTratamientos.appendChild(item);
        item.querySelector('.btn-eliminar').addEventListener('click', () => item.remove());
    });

    function recolectarDatos() {
        const nombre = document.getElementById('nombre').value || 'No especificado';
        const edad = document.getElementById('edad').value || 'No especificada';
        const telefono = document.getElementById('telefono').value || 'No especificado';
        const fecha = document.getElementById('fecha').value || 'No especificada';
        const alergias = document.getElementById('alergias').value || 'Ninguna';
        const tratamientosPrevios = document.getElementById('tratamientosPrevios').value || 'Ninguno';
        const tipoPiel = document.getElementById('tipoPiel').value || 'No especificado';
        const fototipo = document.getElementById('fototipo').value || 'No especificado';
        const observaciones = document.getElementById('observaciones').value || 'Ninguna';
        const recomendaciones = document.getElementById('recomendaciones').value || 'Ninguna';

        const tratamientos = document.querySelectorAll('.tratamiento-item');
        let textoTratamientos = '';
        if (tratamientos.length > 0) {
            textoTratamientos = '\n--- TRATAMIENTOS ---';
            tratamientos.forEach((t, i) => {
                const nom = t.querySelector('.t-nombre').value || 'Sin nombre';
                const fec = t.querySelector('.t-fecha').value || 'Sin fecha';
                const not = t.querySelector('.t-nota').value || 'Sin nota';
                textoTratamientos += `\n${i+1}. ${nom} | Fecha: ${fec} | Nota: ${not}`;
            });
        } else {
            textoTratamientos = '\n--- TRATAMIENTOS ---\nNinguno registrado';
        }

        return `
📋 *FICHA CLÍNICA — COSMIATRÍA*

👤 *DATOS DEL PACIENTE*
─────────────────────
Nombre: ${nombre}
Edad: ${edad} años
Teléfono: ${telefono}
Fecha: ${fecha}

📝 *ANTECEDENTES*
─────────────────────
Alergias/Medicamentos: ${alergias}
Tratamientos anteriores: ${tratamientosPrevios}

🔍 *VALORACIÓN CUTÁNEA*
─────────────────────
Tipo de piel: ${tipoPiel}
Fototipo: ${fototipo}
Observaciones: ${observaciones}

💆 *PLAN DE TRATAMIENTO*
─────────────────────${textoTratamientos}

📌 *RECOMENDACIONES*
─────────────────────
${recomendaciones}
        `.trim();
    }

    btnWhatsApp.addEventListener('click', () => {
        const nombre = document.getElementById('nombre').value;
        if (!nombre) {
            alert('Por favor escribe el nombre del paciente antes de enviar');
            return;
        }
        const mensaje = encodeURIComponent(recolectarDatos());
        const url = `https://wa.me/${TELEFONO}?text=${mensaje}`;
        window.open(url, '_blank');
    });

    // ✅ FUNCIÓN DE PDF CORREGIDA
    btnPDF.addEventListener('click', async () => {
        const elemento = document.querySelector('.contenedor');
        const nombrePaciente = document.getElementById('nombre').value || 'Paciente';
        
        const opciones = {
            margin: 10,
            filename: `Ficha_Cosmiatria_${nombrePaciente}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2, 
                useCORS: true,
                letterRendering: true
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'portrait',
                compress: true
            },
            pagebreak: { mode: 'avoid-all' }
        };

        try {
            await html2pdf()
                .from(elemento)
                .set(opciones)
                .save();
        } catch (error) {
            console.error('Error al generar PDF:', error);
            alert('Hubo un problema al generar el PDF. Inténtalo de nuevo.');
        }
    });

    btnNueva.addEventListener('click', () => {
        if (confirm('¿Limpiar todo para una ficha nueva?')) {
            form.reset();
            listaTratamientos.innerHTML = '';
            contadorTratamientos = 0;
            document.getElementById('fecha').valueAsDate = new Date();
        }
    });

    document.getElementById('fecha').valueAsDate = new Date();
});

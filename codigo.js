document.addEventListener('DOMContentLoaded', () => {
    const listaTratamientos = document.getElementById('listaTratamientos');
    const btnAgregar = document.getElementById('agregarTratamiento');
    const btnPDF = document.getElementById('generarPDF');
    const btnNueva = document.getElementById('nuevaFicha');
    const form = document.getElementById('formularioFicha');
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

    btnPDF.addEventListener('click', () => {
        const elemento = document.querySelector('.contenedor');
        const nombrePaciente = document.getElementById('nombre').value || 'Paciente';
        const opciones = {
            margin: 10,
            filename: `Ficha_Cosmiatria_${nombrePaciente}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opciones).from(elemento).save();
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

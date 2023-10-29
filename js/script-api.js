const $d = document;
const $selectProvincias = $d.getElementById("select-provincia");
const $selectMunicipios = $d.getElementById("select-municipio");
const $selectLocalidades = $d.getElementById("select-localidad");

function provincia() {
    fetch("https://apis.datos.gob.ar/georef/api/provincias")
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => {
        let $options = `<option value="Elige una provincia">Elige una provincia</option>`

        json.provincias.forEach(element => $options += `<option value="${element.nombre}">${element.nombre}</option>`);

        $selectProvincias.innerHTML = $options
    })
}
// provincia();
$d.addEventListener("DOMContentLoaded", provincia)    

function municipio(provincia) {
    fetch(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${provincia}&max=5`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => {
        let $options = `<option value="Elige un municipio">Elige un municipio</option>`

        json.localidades.forEach(element => $options += `<option value="${element.id}">${element.id}</option>`);

        $selectLocalidades.innerHTML = $options
    })   
    .catch(error => {
        let message = error.statusText || "Ocurrió un error";

        $selectMunicipios.nextElementSibling.innerHTML = `Error: ${error.status}: ${message}`;
    })
}

$selectProvincias.addEventListener("change", e => {
    municipio(e.target.value);
    console.log(e.target.value);
})

function localidad(municipio) {
    fetch(`https://apis.datos.gob.ar/georef/api/localidades?municipio=${municipio}&max=5`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => {
        let $options = `<option value="Elige una localidad">Elige una localidad</option>`;
        
        json.localidades.forEach(element => $options += `<option value="${element.id}">${element.nombre}</option>`);

        $selectLocalidades.innerHTML = $options;
    })
    .catch(error => {
        let message = error.statusText || "Ocurrió un error";
        
        $selectLocalidades.nextElementSibling.innerHTML = `Error: ${error.status}: ${message}`;
    })

    $selectMunicipios.addEventListener("change", e => {
        localidad(e.target.value);
        console.log(e.target.value)
    })
}
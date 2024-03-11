var map;
var currentLocation = null;
var plantilla = document.querySelector("template").content;
var tabla = document.getElementById("listadoParadas");

// Inicialización del mapa
function initMap(){
    map = L.map('mapa').setView([36.719332, -4.423457], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
};


//Inicializar el mapa
initMap();

//Carga de datos
fetch("static/datos.json")
.then((res) => res.json())
.then((data) => {
    console.log(data.features);
    data.features.forEach((element) => {
        let coords = element.geometry.coordinates;
        let marker = L.marker([coords[1], coords[0]]).addTo(map);
        marker.bindPopup(
            `<h3> <strong>${element.properties.DESCRIPCION}</strong></h3>
            <p>${element.properties.DIRECCION}</p>`);
        
        var nuevafila = plantilla.cloneNode(true);
 
        nuevafila.querySelector(".nombreParada").textContent=element.properties.DESCRIPCION;
        nuevafila.querySelector(".direccion").textContent=element.properties.DIRECCION;
        tabla.appendChild(nuevafila);
        
    });
})
.catch((err) => {
    console.log("Error en el fetch");
    console.log(err);
});


function showInfo(pos){

    document.querySelector("dialog h3").textContent = listado[pos].element.properties.DESCRIPCION;
    document.querySelector("dialog p").textContent = listado[pos].properties.DIRECCION;
    console.log(listado[pos].element.properties.DESCRIPCION);
    document.querySelector("dialog").showModal();
}
var nuevafila = plantilla.cloneNode(true);
nuevafila.querySelector("button").addEventListener("click",(event)=>{
    let pos = event.target.dataset.pos;
    showInfo(pos);
});
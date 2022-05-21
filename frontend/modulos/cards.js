
let contenedor = document.getElementById("container-card");

const API_URL = "http://localhost:3000";
const obtenerInfo = async () => {
  const respuesta = await fetch(`${API_URL}/api`);
  const data = await respuesta.json();
  pintar(data);
  console.log(data);
};
obtenerInfo();

function pintar(array) {
    array.forEach((item) => {
      
        const { n_placa, modelo, fecha_v_seguro, fecha_v_tecnomecanica } = item;
        contenedor.innerHTML += `    
        <div class="card d-inline-block" style="width: 18rem;">
        <div class="almacen">
          <h5 class="card-title">Tú vehículo es:</h5>
          <p class="card-text">placa:${n_placa}</p>
          <p class="card-text">marca:${modelo}</p>
          <p class="card-text">fecha vencimiento seguro:${fecha_v_seguro}</p>
          <p class="card-text">fecha vencimiento tecnomecanica:${fecha_v_tecnomecanica}</p>
          <a href="editar.html" class="btn btn-primary">Editar</a>
          <a href="#" class="btn btn-primary btnE" id="${n_placa}">Eliminar</a>
        </div>
      </div>  
            `;
      });
      
}

const btneliminar = document.querySelector(".btnE"); 
document.addEventListener("click", ({target}) => {
  if(target.classList.contains('btnE')){
      
      let placa = target.id;
      let confirmar = confirm(`Seguro quíeres eliminar el vehículos con placa: ${placa}`);

      if(confirmar){
        fetch(`http://localhost:3000/api/vehiculo1/${placa}`, {
          method: 'DELETE' 
        }).then(res => res.json())
        .catch(error => error)

        obtenerInfo();
      };
    };
  });
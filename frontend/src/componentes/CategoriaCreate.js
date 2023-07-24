import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../estilo/CategoriaEdit.css";
import Pie from "./Pie";
import Encabezado from "./Encabezado";

function CategoriaCreate() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(""); // Nuevo estado para el nombre de la imagen
  const navigate = useNavigate();

  const crearCategoria = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/crearCategoria", {
        nombre,
        descripcion,
        imagen,
      }) // Enviar el nombre de la imagen al servidor
      .then((respuesta) => {
        if (respuesta.data.Estatus === "exitoso") {
          navigate("/admin/categorias");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Encabezado />
      <div className="EditarUsuario" id="Cat-Create">
        <h1>Crear Nueva Categoría</h1>
        <form className="Form-Edit-User" onSubmit={crearCategoria}>
          <label className="user-for" id="Nombre-Cat">
            Nombre:
            <input
              className="EstiloUsuario"
              id="input-name"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </label>
          <label className="user-for" id="Nombre-Cat">
            Descripción:
            <textarea
              className="areaTexto"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            ></textarea>
          </label>
          <label className="user-for" id="Nombre-Cat">
            Nombre de la Imagen:{" "}
            {/* Campo para ingresar el nombre de la imagen */}
            <input
              className="EstiloUsuario"
              type="text"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
            />
          </label>
        </form>
        <button id="Cat-Edit-Button" type="submit">
          Guardar
        </button>
      </div>
      <Pie />
    </>
  );
}

export default CategoriaCreate;

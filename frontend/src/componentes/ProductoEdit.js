import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../estilo/EditarProductos.css";
import Encabezado from "./Encabezado";
import Pie from "./Pie";
import { Link } from "react-router-dom";
function ProductoEdit() {
  const { id } = useParams();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    obtenerProducto();
  }, []);

  const obtenerProducto = () => {
    axios
      .get(`http://localhost:8081/obtenerProducto/${id}`)
      .then((respuesta) => {
        if (respuesta.data.Estatus === "exitoso") {
          const producto = respuesta.data.contenido;
          setNombre(producto.nombre_producto);
          setDescripcion(producto.descripcion_producto);
          setPrecio(producto.precio);
          setImagen(producto.imagen);
        }
      })
      .catch((error) => console.log(error));
  };

  const editarProducto = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8081/editarProducto/${id}`, {
        nombre,
        descripcion,
        precio,
        imagen,
      })
      .then((respuesta) => {
        if (respuesta.data.Estatus === "exitoso") {
          navigate("/admin/productos");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Encabezado />
      <div className="pro-edit-titulo">
        <h1 id="pap">Editar Producto</h1>
      </div>
      <form onSubmit={editarProducto} className="for-edit-pro">
        <label className="nombre-edit-pro">
          Nombre:
          <input
            className="productos-celda"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </label>
        <label className="nombre-edit-pro">
          Descripción:
          <textarea
            className="productos-celda"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>
        </label>
        <label className="nombre-edit-pro">
          Precio:
          <input
            className="productos-celda"
            type="text"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </label>
        <label className="nombre-edit-pro">
          Imagen:
          <input
            className="productos-celda"
            type="text"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
          />
        </label>
        <button type="submit" className="guardar-pro">
          Guardar
        </button>
        <Link to="/admin/productos" className="salir-pro">
          Salir
        </Link>
      </form>
      <Pie />
    </>
  );
}

export default ProductoEdit;

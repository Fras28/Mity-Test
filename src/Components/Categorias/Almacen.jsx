import React, { useEffect } from "react";
import { Cards } from "../Cards/Cards.jsx";
import "./Categorias.css";
import  Nav  from "../Nav/Nav.jsx";
import { useDispatch, useSelector } from "react-redux";

import { VerPedido } from "../BtnBag/BtnBag.jsx";

import Spinner from "../assets/Spinner/Spinner.jsx";
import Logo from "../assets/Logo.png"


const API = process.env.REACT_APP_API_STRAPI;

export const Almacen = (id) => {
  const mesa = id.match.url.slice(1, 3);
  const dispatch = useDispatch();
  const { allProduct } = useSelector((state) => state.alldata);


  

  const soloEsteComercio = allProduct.filter(
    (e) => e.attributes?.comercio?.data.id === 1
  );

  const Productos = soloEsteComercio?.filter(
    (e) => e.attributes?.categorias?.data.id === 2
    );
    
    const subCategoriaFilters = Productos?.reduce((acc, product) => {
      const subCategoriaId = product.attributes?.sub_categoria?.data?.id;
    
      if (subCategoriaId) {
        if (!acc[subCategoriaId]) {
          acc[subCategoriaId] = [];
        }
        acc[subCategoriaId].push(product);
      }
    
      return acc;
    }, []);
 
    const subCategoriasTrue = subCategoriaFilters.filter(e => e[0])
    return (
      <div className="containerL">
        <Nav id={mesa} />
        <div className="sectioner">
        {subCategoriasTrue.length < 1?  <div className="sectioner">
          {subCategoriasTrue.map((product, index) =>
            product[0] ? (
              <a
                key={index}
                href={`#${product[0].attributes.sub_categoria.data.id}`}
              >
                {product[0]?.attributes.sub_categoria.data.attributes.name}
              </a>
            ) : null
          )}
        </div>:null}
        </div>
        <div className="conteinerLC ">
          <div className="conteinerLB2 animate__animated  animate__zoomIn animate__faster">
          {subCategoriasTrue?.map(product => (
        product[0]?
    <div key={product[0]?.attributes?.sub_categoria?.data?.id}>
     {product[0]?.attributes?.sub_categoria?.data?.attributes?.picture?.data?.attributes?.url?   <img
      src={
        `${API}${product[0]?.attributes?.sub_categoria?.data?.attributes?.picture?.data?.attributes?.url}` ||
        Logo
      }
      alt={"img - "+product[0]?.attributes?.sub_categoria?.data?.attributes?.name}
      id={product[0]?.attributes?.sub_categoria?.data?.id}
      className="ImgSubCat"
    /> :null}
      <Cards products={product} />
    </div> : null
  ))}
          </div>
          {soloEsteComercio.length === 0 ? <Spinner imageUrl={Logo} /> : null}
        </div>
        <VerPedido id={mesa} />
      </div>
    );
  };
  
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddAuction.css'
import Product from '../../types/Product';
import { useAuth } from "../../hooks/useAuth";
import { Router } from "../../Router/Router";
import { useNavigate } from "react-router-dom";import AuctionProduct from '../../types/AuctionProduct';
import axios from 'axios';


const AddAuction: React.FC = () => {

    const user = useAuth(s => s.user);

    const navigate = useNavigate();

    const handleToSubasta = ()=>{
        navigate(Router.subasta)
    }


    const [inventory, setInventory] = useState<Product[]>([]); // Estado inicial 
    

     // Método para obtener los productos subastados
     const fetchProducts = async () => {
        try {
           // const response = await fetch(''); 
           // const data = await response.json();
           const data: Product[] =  [
            {
                id: '1',
                name: 'Espada Épica',
                description: 'Una espada legendaria con poderosos encantamientos.',
                imageUrl: '/Images/imagenPruebaSubasta.jpg',
                currentBid: 100,
                buyNowPrice: 500,
                auctionEndTime: 2,
            },
            {
                id: '2',
                name: 'Escudo Mágico',
                description: 'Un escudo con propiedades defensivas únicas.',
                imageUrl: '/Images/imagenPruebaSubasta.jpg',
                currentBid: 50,
                buyNowPrice: 300,
                auctionEndTime: 1,
            },
            {
                id: '3',
                name: 'Poción de Vida',
                description: 'Recupera completamente la salud del usuario.',
                imageUrl: '/Images/imagenPruebaSubasta.jpg',
                currentBid: 20,
                buyNowPrice: 100,
                auctionEndTime: 5,
            },
            
        ];
    
        setInventory(data); // Actualiza el estado de productos
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

   
    useEffect(() => {
        fetchProducts();
    }, []); // Solo se ejecuta una vez

   
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [auctionDetails, setAuctionDetails] = useState({
        currentBid: 0,
        buyNowPrice: 0,
        auctionEndTime: '',
    });

    const handleSelectProduct = (product: Product) => {
        setSelectedProduct(product);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAuctionDetails({
            ...auctionDetails,
            [name]: value,
        });
    };

    const handleAddProduct = () => {
        if (selectedProduct) {
            const productToAdd = {
                idproduct: selectedProduct.id,
                iduser: user?.iduser,
                currentBid: auctionDetails.currentBid,
                buyNowPrice: auctionDetails.buyNowPrice,
                auctionEndTime: auctionDetails.auctionEndTime,
            };
            console.log('Producto añadido:', productToAdd);
            const config = fetch("../../server-ip-config.json") as unknown as ConfigInterface
            const ip = config.ip
            const port = config.port
            axios.post(`http://${ip}:${port}/api/new/auction`, productToAdd)

            handleToSubasta()
            //ubicacion del endpoint
        }
    }
   
    return (
        <div className="auction-window">
            <div className="container mt-5">
               
                <div className="card p-4">
               
                    <div className="row">
                        <div className="col-md-8">
                            <h4>Inventario del Jugador</h4>
                            
                            <div className="inventory-grid d-flex flex-wrap"  >
                                {inventory.map((item) => (
                                    <div key={item.id} className="card inventory-card m-3" onClick={() => handleSelectProduct(item)}>
                                            <img src={item.imageUrl} className="card-img-top" alt={item.name}  />                    
                                            <div className="card-body text-center">
                                            <h5 className="card-title-auction ">{item.name}</h5>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                    <div className="col-md-6 ">
                    <button onClick={handleToSubasta} className="btn-closeAdd">x</button>
                        {selectedProduct && (
                            <div className="product-registration">
                                <h4>Producto Seleccionado: </h4>
                                <h4 className='name-product'>{selectedProduct.name} </h4>
                                <div className='marcoImagen'> 
                                    <img src={selectedProduct.imageUrl} className="img-fluid mb-3" alt={selectedProduct.name}  />
                                </div>
                                
                                <div className="form-group-auction">
                                    <label className='form-label-auction'>Valor Inicial</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="currentBid"
                                        placeholder="Monto Inicial"
                                        value={auctionDetails.currentBid}
                                        onChange={handleInputChange}
                                    />
                                    
                                </div>
                                <div className="form-group-auction">
                                    <label className='form-label-auction'>Valor Compra Inmediata</label>
                                        <input
                                        type="number"
                                        className="form-control"
                                        name="buyNowPrice"
                                        placeholder="Monto de Compra Inmediata"
                                        value={auctionDetails.buyNowPrice}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group-auction">
                                    <label className='form-label-auction'>Días de Subasta</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="auctionEndTime"
                                        placeholder="Días de Subasta"
                                        value={auctionDetails.auctionEndTime}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                    <button onClick={handleAddProduct} className="btn-auction mt-3">Añadir Producto</button>
                                
                            </div>
                            )}
                        </div>
                    </div>
                </div>
        </div>
    );
}
export default AddAuction;
interface ConfigInterface{
    ip: string;
    port: string;
}

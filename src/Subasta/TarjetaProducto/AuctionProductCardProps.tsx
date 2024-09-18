import React, { useState } from 'react';
import './AuctionProductCard.css';
import BidForm from '../RealizarPuja/BidForm.tsx'
import Timer from './Timer.tsx';
import AuctionProduct from '../../types/AuctionProduct.ts';


const AuctionProductCard: React.FC<AuctionProduct> = ({
    idAuction,
    idProduct,
    name,
    description,
    imageUrl,
    currentBid,
    buyNowPrice,
    auctionEndTime,
  
}) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(auctionEndTime) - +new Date();
        let timeLeft = "";

        if (difference > 0) {
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);
            timeLeft = `${hours}h ${minutes}m ${seconds}s`;
        } else {
           // timeLeft = "Subasta finalizada";
           timeLeft="2 dias"
        }

        return timeLeft;
    };

    const [isBidding, setIsBidding] = useState(false); // Estado para mostrar u ocultar el formulario de puja

    const handleBidAction = () => {
        setIsBidding(true); // Mostrar el formulario de puja
    };

     // Crear el objeto `product` con todas las propiedades necesarias
     const producto = {
        idAuction,
        idProduct,
        name,
        description, 
        imageUrl,
        currentBid,
        buyNowPrice,
        auctionEndTime,
    };


    return (

            <div className="auction-product-card">
                <div className="product-content ">
                    <img src={`${imageUrl}`} alt={name} className="product-image" />
                    <label htmlFor="nombre" className='product-name'> {`${name}`} </label>
                    <div className="auction-details">
                        <div className="bid-info">
                            <span className="label">Oferta actual:</span>
                            <span className="bid-credits">
                                {currentBid} <img src="./Images/icono-creditos.png" alt="Moneda" className="coin-icon" />
                            </span>                       
                        </div>
                        <div className="buy-info">
                            <span className="label">Venta inmediata:</span>
                            <span className="buy-credits">
                                {buyNowPrice} <img src="./Images/icono-creditos.png" alt="Moneda" className="coin-icon" />
                            </span>                       
                        </div>
                        <div className="time-info">
                            <Timer totalDays={auctionEndTime} />
                        </div>

                    </div>
                    <button className="btn-puja" onClick={handleBidAction}>PUJAR</button>

                </div>

                {/* Mostrar el componente de BidForm solo si el usuario hizo clic en PUJAR */}
                {isBidding && (
                   <div className="overlay"> {/* Capa superpuesta de fondo */}
                    <BidForm 
                        product={producto} // Pasa el producto seleccionado
                        onClose={() => setIsBidding(false)} // Función para cerrar el formulario
                    />
                    </div>
                )}
                
            </div>
       
    );
};
 export default AuctionProductCard
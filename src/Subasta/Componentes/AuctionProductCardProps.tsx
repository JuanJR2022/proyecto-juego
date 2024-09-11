import React from 'react';
import './AuctionProductCard.css';

interface AuctionProductCardProps {
    id: string;
    name: string;
    imageUrl: string;
    currentBid: number;
    auctionEndTime: string;
    onBid: (productId: string) => void;
    onBuyNow: (productId: string) => void;
}
const AuctionProductCard: React.FC<AuctionProductCardProps> = ({
    id,
    name,
    imageUrl,
    currentBid,
    auctionEndTime,
    onBid,
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

    return (

            <div className="auction-product-card">
                <div className="product-content ">
                    <img src={`${imageUrl}`} alt={name} className="product-image" />
                    <label htmlFor="nombre" className='product-name'> {`${name}`} </label>
                    <div className="auction-details">
                        <div className="bid-info">
                            <span className="label">Oferta actual:</span>
                            <span className="bid-credits">{currentBid} créditos</span>
                        </div>
                        <div className="time-info">
                            <span className="label">Tiempo restante:</span>
                            <span className="time-remaining">{calculateTimeLeft()}</span>
                        </div>
                    </div>
                    <button className='btn-puja'>PUJAR</button>

                </div>
                
            </div>
       
    );
};
 export default AuctionProductCard
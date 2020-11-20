import React, { useState, useStyles } from 'react'
import "./card-style.css";
import ReactStars from "react-rating-stars-component";
import GetOfferForm from "../pages/GetOffer/GetOfferForm";
import Popup from "../components/Popup";
const Card = props => {
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [openPopup, setOpenPopup] = useState(false)
    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }
    return (
        <div className="card text-center shadow">
            <div className="overflow">
                <img className="card-img" src={props.imgsrc} alt="image 1" className="card-img-top" />
                <h4 className="card-imgtitle">{props.place}</h4>
            </div>
            <div className="card-body text-dark">
                <h4 className="capacity-count"> {props.personCount} | {props.capasityCount}</h4>
                <p className="card-text text-secondary">
                    {props.hotelName}
                </p>
                <div className="star-style">
                    <ReactStars
                        count={5}
                        value={props.starCount}
                        size={24}
                        activeColor="#00ABAA"
                    />
                </div>
                <div className="comment-style" >
                    {props.commentCount}
                </div>
            </div>
            <div>
                <Popup
                    title="Ücretsiz Fiyat Teklifi Al"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    <GetOfferForm
                        recordForEdit={recordForEdit} />
                </Popup>
                <a className="btn btn-outline-danger btn-size">İncele</a>
                <a onClick={() => { setOpenPopup(true); setRecordForEdit(null); }} className="btn btn-color ">Ücretsiz teklif al</a>
            </div>
        </div>
    );
}
export default Card;
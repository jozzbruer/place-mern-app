import React, { useState } from 'react'
import Card from '../../shared/components/UIelements/Card'
import Button from '../../shared/components/FormElements/Button'
import './PlaceItem.css'
import Modal from '../../shared/components/UIelements/Modal'

function PlaceItem(props) {

    const [showMap, setShowMap] = useState(false)

    function openMapHandler(){
        setShowMap(true)
    }
    function closeMapHandler(){
        setShowMap(false)
    }
    return (
        <>
        <Modal 
        show={showMap} 
        onCancel={closeMapHandler} 
        header={props.adress} 
        contentClass='place-item__modal-content' 
        footerClass='place-item__modal-actions' 
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}>

            <div className="map-container">
                <h2>THE MAP</h2>
            </div>
        </Modal>
        <li className='place-item'>
           <Card className='place-item__content'>
            <div className="place-item__image">
                    <img src={props.image} alt={props.title}/>
                </div>
                <div className="place-item__info">
                    <h2>{props.title}</h2>
                    <h3>{props.adress}</h3>
                    <p>{props.description}</p>
                </div>
                <div className="place-item__actions">
                    <Button inverse onClick={openMapHandler}>VIEW ON A MAP</Button>
                    <Button to={`places/${props.id}`}>EDIT</Button>
                    <Button danger>DELETE</Button>
                </div>
           </Card>
        </li>
        </>
    )
}

export default PlaceItem

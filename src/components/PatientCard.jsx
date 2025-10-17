import { useState } from 'react'
import '../card.css'

export const PatientCard = ({id, name, avatar, description, website, createdAt}) => {

    const [isOpen, setIsOpen] = useState(false)

    const toggleCard = () =>{
        setIsOpen(!isOpen)
    }

  return (
    <div className="card">
        <div className='card-header' onClick={toggleCard}>
            <h3>{name}</h3>
            <span>{!isOpen? 'Open' : 'Close'}</span>
        </div>

        {isOpen && (
            <div className='card-content'>
                <p>
                    ID: {id}
                </p>

                <p>
                    Description: {description}
                </p>

                <p>
                    Website: <a href={website}>{website}</a>
                </p>

                <p>
                    Created at: {createdAt}
                </p>                
                
            </div>
        )}
    </div>


  )
}

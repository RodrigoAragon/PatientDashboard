import { useState } from 'react';
import '../modal.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Modal = ({ show, handleClose}) => {

    const [startDate, setStartDate] = useState(new Date())

   const showHideClassName = show ? "modal-overlay" : '';

    return (

    <div id={showHideClassName}>
      <div id="modal-container">

        <div className='modal-header'>
            <h2>New Patient</h2>
        </div>

        <div id='modal-form'>

            <div className='form-group'>
                <label>
                    Full Name
                    <input/>
                </label>

                <label>
                    Description
                    <textarea/>
                </label>

                <label>
                    Website
                    <input/>
                </label>

                <label>
                    Creation Date
                </label>
                <DatePicker id='date-picker' selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>

        </div>

        <div>
            <button className='submit-btn'>Submit</button>
            <button className='close-btn' onClick={handleClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

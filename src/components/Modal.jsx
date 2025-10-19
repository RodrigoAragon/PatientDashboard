import '../styles/modal.css'
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup';

export const Modal = ({ show, handleClose, onSubmit, patient }) => {
    const patientSchema = yup.object({
        name: yup.string().required(),
        website: yup.string().url().required(),
        createdAt: yup.date().default(() => new Date()).required(),
        description: yup.string().required().max(256)
    })

    const handleDate = (date) =>{
        const formattedDate = new Date (date)
        return formattedDate.toISOString().slice(0,10)
    }

    const {handleSubmit, register, formState:{errors}} = useForm({
        resolver: yupResolver(patientSchema),
        defaultValues: {
            name: patient? patient.name : '',
            description: patient? patient.description : '',
            website: patient? patient.website : '',
            createdAt: patient? handleDate(patient.createdAt) : '',
            id: patient? patient.id : ''
        }
    })



   const showHideClassName = show ? "modal-overlay" : '';

    return (

    <div id={showHideClassName}>
      <div id="modal-container">

        <div className='modal-header'>
            <h2>New Patient</h2>
        </div>

        <div id='modal-form'>

            <form className='form-group' onSubmit={handleSubmit(onSubmit)}>                
                
                {
                    patient && <label>
                                    ID
                                    <input {...register("id")} disabled/>
                                </label>
                }
                
                

                <label>
                    Full Name
                    <input {...register("name")}
                    />

                    <p>{errors.name?.message}</p>
                </label>

                <label>
                    Description
                    <textarea 
                    {...register("description")}
                    />

                    <p>{errors.description?.message}</p>
                </label>

                <label>
                    Website
                    <input 
                    {...register("website")}
                    />
                    
                    <p>{errors.website?.message}</p>
                </label>

                <label>
                    Creation Date
                    <input 
                    id='date-picker' type='date'
                    {...register("createdAt")}
                    />

                    <p>{errors.createdAt?.message}</p>
                </label>


                <div>
                    <button className='submit-btn' type='submit'>Submit</button>
                    <button className='close-btn' onClick={handleClose}>Close</button>
                </div>
                
            </form>

        </div>
            
      </div>
    </div>
  )
}

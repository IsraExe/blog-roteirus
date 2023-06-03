import { cloneElement } from 'react';
import './modal.css'

const Modal = ({ handleSubmit, closeModal, icon }) => {

  return (
    <div className='modal'>
      <div className='modal_box' >

        <h1>Deseja atualizar este artigo?</h1>
        <h4>Esta ação não poderá ser desfeita!</h4>

        {icon && cloneElement(icon, { style: { width: '15em' } })}

        <div className='modal_container_button'>
          <button className='modal_button_cancel' type='button' onClick={closeModal}>Cancelar</button>
          <button className='modal_button_save' onClick={handleSubmit}>Salvar</button>
        </div>

      </div>
    </div>
  );

}

export default Modal;
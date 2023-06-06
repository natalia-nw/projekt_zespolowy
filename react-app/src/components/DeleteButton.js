import { useState } from 'react';
import {FaTrash} from 'react-icons/fa'

const DeleteButton = (props) => {
    const [click, setClick] = useState(false);
    const handleDeleteConfirmation = () => {
        setClick(true);
      };
    
      const handleCancel = () => {
        setClick(false);
      };
    
      const handleConfirm = () => {
        setClick(false);
        props.fn();
      };
    return (
        <>
      {!click && (
        <form onSubmit={handleDeleteConfirmation}>
          <button type="submit" className="input-submit">
            <FaTrash />
          </button>
        </form>
      )}
      {click && (
        <>
          <h2>Czy usunąć?</h2>
          <table>
          <tr>
          <td>
          <button className="secondary" onClick={handleCancel}>Anuluj</button>
          </td>
          <td>
          <button className="cancel" type="submit" onClick={handleConfirm}>Potwierdź</button>
          </td>
          </tr>
          </table>
        </>
      )}
    </>
    )
}

export default DeleteButton;
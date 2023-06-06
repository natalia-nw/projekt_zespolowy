import {AiFillEdit} from 'react-icons/ai'

const EditButton = (props) => {
    return (
            <button className="input-submit2" onClick={props.fn}>
                 <AiFillEdit/>
            </button>
    )
}

export default EditButton;
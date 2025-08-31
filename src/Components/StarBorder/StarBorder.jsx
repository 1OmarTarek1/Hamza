import './StarBorder.css'



const StarBorder = (props) => {
    return (
        <div className='StarBorder'>
            {props.children}
        </div>
    )
}

export default StarBorder
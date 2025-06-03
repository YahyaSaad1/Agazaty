import { Link } from "react-router-dom";

function BtnLink(props){
    return(
        <>
            <Link to={props.id? `${props.link}/${props.id}`: props.link} onClick={props.onClick} type="submit" className={`btn ${props.class}`}>{props.name}</Link>
        </>
    )
}

export default BtnLink;
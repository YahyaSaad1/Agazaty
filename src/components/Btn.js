function Btn(props){
    return(
        <>
            <button type="submit" className={`btn ${props.class}`}>{props.name}</button>
        </>
    )
}

export default Btn;

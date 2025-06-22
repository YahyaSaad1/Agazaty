function Btn(props){
    return(
        <>
            <button onChange={props.onChange} onClick={props.onClick} type="submit" className={`btn ${props.className}`}>{props.name}</button>
        </>
    )
}

export default Btn;

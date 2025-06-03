function Btn(props){
    return(
        <>
            <button onChange={props.onChange} onClick={props.onClick} type="submit" className={`btn ${props.class}`}>{props.name}</button>
        </>
    )
}

export default Btn;

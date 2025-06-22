import { Link } from "react-router-dom";

function BtnLink(props) {
  const { link, id, leave, onClick, className, name } = props;
  const fullPath = id ? `${link}/${id}` : link;

  return (
    <Link
      to={fullPath}
      state={leave ? { leave } : undefined}
      onClick={onClick}
      className={`btn ${className}`}
      style={{ whiteSpace: "nowrap" }}
    >
      {name}
    </Link>
  );
}

export default BtnLink;





// import { Link } from "react-router-dom";

// function BtnLink(props) {
//   return (
//     <>
//       <Link
//         to={props.id ? `${props.link}/${props.id}` : props.link}
//         onClick={props.onClick}
//         type="submit"
//         className={`btn ${props.className}`}
//         style={{ whiteSpace: "nowrap" }}
//       >
//         {props.name}
//       </Link>
//     </>
//   );
// }

// export default BtnLink;
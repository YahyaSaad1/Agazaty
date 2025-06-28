import { Link } from "react-router-dom";

function BtnLink(props) {
  const { link, id, leave, onClick, className, name } = props;
  const fullPath = id ? `${link}/${id}` : link;

  return (
    <Link to={fullPath} state={leave ? { leave } : undefined} onClick={onClick} className={`text-nowrap btn ${className}`}>
      {name}
    </Link>
  );
}

export default BtnLink;
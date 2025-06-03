import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Search() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim() !== '') {
            navigate(`/${query.trim().toLowerCase()}`);
        }
    };

    return (
        <div>
            <form className="d-flex" role="search" onSubmit={handleSearch}>
                <input className="form-control me-2" type="search" placeholder="بحث ..." aria-label="Search" value={query} onChange={(e) => setQuery(e.target.value)}/>
                {/* <button className="btn btn-outline-success" type="submit">بحث</button> */}
            </form>
        </div>
    );
}

export default Search;

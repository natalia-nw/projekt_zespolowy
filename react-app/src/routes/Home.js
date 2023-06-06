import { useState, useEffect } from "react";
import Element from "../components/Element";
import Headers from "../components/Headers";
import Button from "../components/Button";
import ApiURL from "../ApiURL";
import { useNavigate } from "react-router-dom";
import Describe from "../components/Describe";
import session from "../session";
import HttpHeader from "../HttpHeader";

const Home = () => {
  const [adds, setAdds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${ApiURL}/items/public`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => setAdds(data.results));
  }, []);

  useEffect(() => {
    if (session === 'true')
    {
        fetch(`${ApiURL}/auth/users/me`, {
            method: 'GET',
            headers: HttpHeader
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            setId(data.id)
            sessionStorage.setItem('id', id);
        })
    }
    }, [id])

  const AgreementRequest = (id) => {
    sessionStorage.setItem("ItemId", id);
    navigate("/chceWypozyczyc");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchItems(searchQuery);
  };

  const searchItems = (query) => {
    fetch(`${ApiURL}/items/public?search=${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => setAdds(data.results));
  };

  const filteredAdds = adds.filter(add => add.name.includes(searchQuery));

  return (
    <>
      <h1 className="title">Ogłoszenia</h1>
      
      <main className="container">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="search"
            name="search"
            onChange={handleSearchChange}
            value={searchQuery}
          />
          <button type="submit">Szukaj</button>
        </form>
          <div class="title"><Button label={"Dodaj nowe ogłoszenie"} href={"/noweOgloszenie"} /></div>
      </main>
      <ul>
        {filteredAdds.length > 0 ? (
          filteredAdds.map((add) => (
            <Element id={add.id} key={add.id}>
              <Headers h1={add.name} />
              {add.images.map((image) => (
                <a href={image.image}><img src={image.image} alt='obrazek' key={image.id}/></a>
              ))}
              <Describe category={add.category} desc={add.desc} />
              {id !== add.user ? (
                <form onSubmit={() => AgreementRequest(add.id)}>
                  <button type="submit" className="agreement">
                    Poproś o wypożyczenie
                  </button>
                </form>
              ) : null}
            </Element>
          ))
        ) : (
          <h1>Nie ma jeszcze żadnych ogłoszeń</h1>
        )}
      </ul>
    </>
  );
};

export default Home;


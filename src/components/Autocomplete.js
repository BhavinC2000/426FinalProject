import React, {useState} from 'react';
import { debounce } from "throttle-debounce";

const FreeSolo = (props) => {

    const [search, setSearch] = useState('');

    const changeHandler = debounce(500, setSearch);

    return (
        <form
            className="search"
            >
            <input 
                type="search"
                className="searchBar"
                autoComplete="off"
                onChange={(event) => changeHandler(event.target.value)}
                />
            <ul id="autocomplete">
                {props.users
                    .filter(user => user.toLowerCase().includes(search.toLowerCase()))
                    .map((user, i) => {
                        return (
                        <li 
                            key={i} 
                            onClick={event => {
                                    props.searchHandler(event, user);
                                }
                            }
                            >
                            <p>{user}</p>
                        </li>
                        )
                })
                }
            </ul>
        </form>
    );
}

export default FreeSolo;
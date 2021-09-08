import React from "react";
import { useHistory } from "react-router";
import './SearchBar.css';

const SearchBar = (props)=>{

    let history = useHistory();

    const submitHandler = (event)=>{
        event.preventDefault();
        const query = event.target.query.value;
        history.push(`/search/${query}`);
    }

    return <div>
        <div className="search-bar__div">
            <div className="search-bar__icon"></div>
            <form onSubmit={submitHandler}>
            <div className="search-bar__area"><input placeholder="Search" name="query"/></div>
            </form>
        </div>
    </div>
}

export default SearchBar;
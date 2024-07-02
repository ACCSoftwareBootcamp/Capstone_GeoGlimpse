import {useState} from 'react'

function Searchbar (){
    // Create a variable using the useState() hook
    const [searchInput, setSearchInput] = useState("");

    // Create a array to fetch the countries
    const countries = [];

    // Create a handler function that will read changes in the search bar
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    }


    return (
        <div>

        <input
        type="text"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput} />

        </div>
    )

}

export default Searchbar;

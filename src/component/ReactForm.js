
import React, { useRef, useState, useCallback } from 'react';
import GifCard from './GifCard';



export default function ReactForm() {
    const nameRefs = useRef(null);
    const emailRefs = useRef(null);
    const passwordRefs = useRef(null);
    const [inputData, setInputData] = useState({ name: '', email: '', password: '' });
    const [searchData, setSearchData] = useState([]);


    const handleSubmit = (e) => {
        console.log(inputData);
    };

    const handleReset = () => {
        setInputData({ name: '', email: '', password: '' })
    };

    const handleSearch = (e) => {
        // log your value here
        console.log(1, e.target.value);

        fetch(`https://api.giphy.com/v1/gifs/search?api_key=VY423HNOGn97mBYM6lJGbo32b6piBFXH&q=${e.target.value}`)
            .then(res => res.json())
            .then(resData => setSearchData(resData.data));
    };

    const inputHandle = (e) => {
        inputData[e.target.name] = e.target.value;
        setInputData({ ...inputData });
    }


    const debounce = (callback, delay) => {
        // add your debounce logic here
        let timer;
        return function (...arg) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                callback.apply(context, arg);
            }, delay);
        }
    };
    const debouncedSearch = useCallback(debounce(handleSearch, 1000), []);
    return (
        <React.Fragment>
            <div>
                <p>part 1</p>
                <label>
                    Name:
                    <input ref={nameRefs} onChange={inputHandle} value={inputData.name} placeholder="name" name='name' type="text" />
                </label>
                <label>
                    Email:
                    <input ref={emailRefs} onChange={inputHandle} value={inputData.email} placeholder="email" name='email' type="email" />
                </label>


                <label>
                    Password:
                    <input ref={passwordRefs} onChange={inputHandle} value={inputData.password} placeholder="password" name='password' type="password" />
                </label>
                <hr />
                <button onClick={() => nameRefs.current.focus()}>Focus Name Input</button>
                <button onClick={() => emailRefs.current.focus()}>Focus Email Input</button>
                <button onClick={() => passwordRefs.current.focus()}>Focus Password Input</button>
                <hr />
                <button type='submit' onClick={handleSubmit}>Submit</button>
                <button onClick={handleReset}>Reset</button>
            </div>
            <div>
                <hr />
                <p>part 2</p>
                <label>
                    Search:
                    <input
                        placeholder="search with debounce"
                        type="text"
                        onChange={debouncedSearch}
                    />
                </label>
            </div>
            <div className='cont'>
                {searchData.length ? searchData.map(data =>
                    <GifCard key={data.id} cardData={data} />
                ) : <></>}
            </div>

        </React.Fragment>
    );
}
import React, { useEffect } from "react";

const Fetchapi = () => {
  const [value, setValue] = React.useState(
    localStorage.getItem("myValueInLocalStorage") || ""
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [countries, setCountries] = React.useState([]);

  React.useEffect(() => {
    localStorage.setItem("myValueInLocalStorage", value);
  }, [value]);

  const handleFetchData = async () => {
    const response = await fetch(
      "https://restcountries.com/v3.1/independent?status=true"
    );
    const data = await response.json();
    console.log(data);
    // const countries = JSON.parse(data);
    const countryCount = data.length;
    setValue(countryCount);
    const countries = data.slice(0, 5).map((country, index) => {
      const { name, capital, languages } = country;
      return { index, name, capital, languages };
    });
    console.log({ countries });
    setCountries(countries);
    setIsLoading(false);
  };

  useEffect(() => {
    handleFetchData();
  }, [isLoading]);

  const onChange = (event) => setValue(event.target.value);

  const table = (
    <table>
      <tr>
        <th>No.</th>
        <th>Name</th>
        <th>Capital</th>
        <th>Language</th>
      </tr>

      {countries.map((country, i) => {
        return (
          <tr key={i}>
            <td key={`{i}-index`}>{country.index}</td>
            <td key={`{i}-name`}>{country.name.common}</td>
            <td key={`{i}-capital`}>{country.capital[0]}</td>
            <td key={`{i}-language`}>
              {Object.keys(country.languages).map((k) => country.languages[k])}
            </td>
          </tr>
        );
      })}
    </table>
  );

  const form = (
    <form action="" method="get" class="form-example">
      <div class="form-example">
        <label for="name">Enter your name: </label>
        <input type="text" name="name" id="name" required />
      </div>
      <div class="form-example">
        <label for="email">Enter your email: </label>
        <input type="email" name="email" id="email" required />
      </div>
      <div class="form-example">
        <input type="submit" value="Subscribe!" onclick={console.log('submitted')} />
      </div>
    </form>
  );

  return (
    <div>
      <input value={value} type="text" onChange={onChange} />
      <button type="button" onClick={() => setIsLoading(true)}>
        {" "}
        fetch countries{" "}
      </button>
      {isLoading ? <p>is Loading...</p> : <p>{value}</p>}
      {table}
      {form}
    </div>
  );
};

export default Fetchapi;

import { FC, useEffect, ChangeEvent, FormEvent, useState } from "react";

interface CountryResponse {
  name: {
    common: string;
  };
  capital: string[];
  languages: {
    [key: string]: string;
  };
}

interface Country {
  index: number;
  name: {
    common: string;
  };
  capital: string[];
  languages: {
    [key: string]: string;
  };
}

interface SubscriptionFormData {
  name: string;
  email: string;
}

const Fetchapi: FC = () => {
  const [value, setValue] = useState<string>(
    localStorage.getItem("myValueInLocalStorage") ?? ""
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [page, setPage] = useState<number>(1);
  const pageSize = 5;
  const maxPage = Math.floor(countries.length / pageSize);

  useEffect(() => {
    localStorage.setItem("myValueInLocalStorage", value);
  }, [value]);

  const handleFetchData = async (): Promise<void> => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://restcountries.com/v3.1/independent?status=true"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: CountryResponse[] = await response.json();
      const countryCount = data.length;
      setValue(countryCount.toString());
      const countries: Country[] = data.map((country: CountryResponse, index: number) => {
        const { name, capital, languages } = country;
        return { index, name, capital, languages };
      });
      setCountries(countries);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
      setPage(0);
    }
  };

  useEffect(() => {
    void handleFetchData();
  }, []);

  useEffect(() => {
    console.log(page);
  }, [page]);

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => 
    setValue(event.target.value);

  const table = (
    <table>
      <thead>
        <tr>
          <th>No.</th>
          <th>Name</th>
          <th>Capital</th>
          <th>Language</th>
        </tr>
      </thead>
      <tbody>
        {countries
          .slice(page * pageSize, (page + 1) * pageSize)
          .map((country) => {
            return (
              <tr key={country.index}>
                <td>{country.index + 1}</td>
                <td>{country.name.common}</td>
                <td>{country.capital[0] ?? 'N/A'}</td>
                <td>
                  {Object.values(country.languages).join(', ')}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: SubscriptionFormData = {
      name: formData.get('name')?.toString() ?? '',
      email: formData.get('email')?.toString() ?? ''
    };
    console.log("submitted", data);
  };

  const form = (
    <form onSubmit={handleSubmit} className="form-example">
      <div className="form-example">
        <label htmlFor="name">Enter your name: </label>
        <input type="text" name="name" id="name" required />
      </div>
      <div className="form-example">
        <label htmlFor="email">Enter your email: </label>
        <input type="email" name="email" id="email" required />
      </div>
      <div className="form-example">
        <input type="submit" value="Subscribe!" />
      </div>
    </form>
  );

  return (
    <div>
      <input value={value} type="text" onChange={onChange} />
      <button
        type="button"
        onClick={() => setPage((page) => Math.max(0, page - 1))}
        disabled={page === 0}
      >
        Previous Page
      </button>
      <button 
        type="button" 
        onClick={() => void handleFetchData()}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Fetch Countries'}
      </button>
      <button
        type="button"
        onClick={() => setPage((page) => Math.min(maxPage, page + 1))}
        disabled={page >= maxPage}
      >
        Next Page
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {isLoading ? <p>Loading...</p> : <p>{value}</p>}
      {table}
      {form}
    </div>
  );
};

export default Fetchapi; 
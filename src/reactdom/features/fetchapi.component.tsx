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
  const maxPage = Math.ceil(countries.length / pageSize) - 1;

  const styles = {
    tableContainer: {
      overflowX: 'auto' as const,
      marginTop: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse' as const,
      backgroundColor: '#fff',
    },
    th: {
      padding: '12px 15px',
      textAlign: 'left' as const,
      backgroundColor: '#f0f8ff',
      borderBottom: '1px solid #e1e8f0',
      color: '#2c3e50',
    },
    td: {
      padding: '12px 15px',
      borderBottom: '1px solid #e1e8f0',
      color: '#34495e',
    },
    tr: {
      transition: 'background-color 0.2s ease-in-out',
      ':hover': {
        backgroundColor: '#f8fbff',
      },
    },
    form: {
      marginTop: '20px',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    formGroup: {
      marginBottom: '15px',
    },
    input: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #e1e8f0',
      borderRadius: '4px',
      marginTop: '5px',
    },
    button: {
      backgroundColor: '#4a90e2',
      color: 'white',
      padding: '10px 15px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease-in-out',
    },
  };

  useEffect(() => {
    localStorage.setItem("myValueInLocalStorage", value);
  }, [value]);

  const handleFetchData = async (): Promise<void> => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,capital,languages",
        {
          headers: {
            'Accept': 'application/json',
          },
          mode: 'cors'
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: CountryResponse[] = await response.json();
      const countryCount = data.length;
      setValue(countryCount.toString());
      
      const countries: Country[] = data
        .filter(country => country.name && country.capital) // Filter out incomplete data
        .map((country: CountryResponse, index: number) => {
          const { name, capital, languages } = country;
          return { index, name, capital, languages };
        });
      
      setCountries(countries);
      setPage(0); // Reset to first page when new data is loaded
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch country data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void handleFetchData();
  }, []);

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => 
    setValue(event.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: SubscriptionFormData = {
      name: formData.get('name')?.toString() ?? '',
      email: formData.get('email')?.toString() ?? ''
    };
    console.log("submitted", data);
  };

  const table = (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>No.</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Capital</th>
            <th style={styles.th}>Languages</th>
          </tr>
        </thead>
        <tbody>
          {countries
            .slice(page * pageSize, (page + 1) * pageSize)
            .map((country) => {
              return (
                <tr key={country.index} style={styles.tr}>
                  <td style={styles.td}>{country.index + 1}</td>
                  <td style={styles.td}>{country.name.common}</td>
                  <td style={styles.td}>{country.capital?.[0] ?? 'N/A'}</td>
                  <td style={styles.td}>
                    {Object.values(country.languages || {}).join(', ') || 'N/A'}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );

  const form = (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.formGroup}>
        <label htmlFor="name">Enter your name: </label>
        <input type="text" name="name" id="name" required style={styles.input} />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="email">Enter your email: </label>
        <input type="email" name="email" id="email" required style={styles.input} />
      </div>
      <div style={styles.formGroup}>
        <button type="submit" style={styles.button}>Subscribe!</button>
      </div>
    </form>
  );

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <input 
          value={value} 
          type="text" 
          onChange={onChange} 
          style={styles.input}
          placeholder="Number of countries"
        />
        <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={() => setPage((page) => Math.max(0, page - 1))}
            disabled={page === 0}
            style={styles.button}
          >
            Previous Page
          </button>
          <button 
            type="button" 
            onClick={() => void handleFetchData()}
            disabled={isLoading}
            style={styles.button}
          >
            {isLoading ? 'Loading...' : 'Fetch Countries'}
          </button>
          <button
            type="button"
            onClick={() => setPage((page) => Math.min(maxPage, page + 1))}
            disabled={page >= maxPage}
            style={styles.button}
          >
            Next Page
          </button>
        </div>
      </div>
      
      {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {table}
      {form}
    </div>
  );
};

export default Fetchapi; 
document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const resetBtn = document.getElementById('resetBtn');
    const countryInput = document.getElementById('countryInput');
    const resultContainer = document.getElementById('resultContainer');
    const loader = document.getElementById('loader');
    const toggleDark = document.getElementById('toggleDark');
  
    searchBtn.addEventListener('click', searchCountry);
    countryInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') searchCountry();
    });
  
    resetBtn.addEventListener('click', () => {
      countryInput.value = '';
      resultContainer.innerHTML = '';
      loader.classList.add('hidden');
    });
  
    toggleDark.addEventListener('click', () => {
      document.body.classList.toggle('dark');
    });
  
    function searchCountry() {
      const country = countryInput.value.trim();
      resultContainer.innerHTML = '';
  
      if (!country) {
        alert("Please enter a country name.");
        return;
      }
  
      loader.classList.remove('hidden');
  
      fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then(response => {
          if (!response.ok) throw new Error("Country not found");
          return response.json();
        })
        .then(data => {
          data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'country-card';
  
            const currencies = item.currencies
              ? Object.values(item.currencies).map(c => `${c.name} (${c.symbol})`).join(', ')
              : 'N/A';
  
            const languages = item.languages
              ? Object.values(item.languages).join(', ')
              : 'N/A';
  
            card.innerHTML = `
              <img src="${item.flags.svg}" alt="Flag of ${item.name.common}">
              <h2>${item.name.common}</h2>
              <p><strong>Capital:</strong> ${item.capital ? item.capital[0] : 'N/A'}</p>
              <p><strong>Currency:</strong> ${currencies}</p>
              <p><strong>Region:</strong> ${item.region}</p>
              <p><strong>Population:</strong> ${item.population.toLocaleString()}</p>
              <p><strong>Languages:</strong> ${languages}</p>
              <p><strong>GDP:</strong> ${item.gdp ? item.gdp.toLocaleString() : 'N/A'}</p>
              <p><strong>Area:</strong> ${item.area ? item.area.toLocaleString() : 'N/A'} kmÂ²</p>
              <p><strong>Timezones:</strong> ${item.timezones ? item.timezones.join(', ') : 'N/A'}</p>
              <p><strong>Subregion:</strong> ${item.subregion ? item.subregion : 'N/A'}</p>
              <p><strong>Country Code:</strong> ${item.cca2}</p>
            `;
  
            resultContainer.appendChild(card);
          });
        })
        .catch(error => {
          resultContainer.innerHTML = `<p style="color:red;text-align:center;">${error.message}</p>`;
        })
        .finally(() => {
          loader.classList.add('hidden');
        });
    }
  });
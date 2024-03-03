async function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from').value;
    const toCurrency = document.getElementById('to').value;
    
    const appId = 'cur_live_h9ZY5r5fwwuwUvLDRR3eVQCg34R7SQpuRLulj5ZH';
    const apiUrl = `https://open.er-api.com/v6/latest/${fromCurrency}`;
    
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (data && data.rates && data.rates[toCurrency]) {
        const exchangeRate = data.rates[toCurrency];
        const convertedAmount = amount * exchangeRate;
        
        document.getElementById('result').innerText = `${amount} ${fromCurrency} is approximately ${convertedAmount.toFixed(2)} ${toCurrency}.`;
      } else {
        document.getElementById('result').innerText = "Conversion failed. Please try again later.";
      }
    } catch (error) {
      document.getElementById('result').innerText = "Error fetching data. Please try again later.";
      console.error('Error:', error);
    }
  }
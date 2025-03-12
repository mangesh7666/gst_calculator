import React, { useState } from 'react';

const mystyle = {
  border: '2px solid white',
  padding: '8px',
  textAlign: 'left',
  backgroundColor: 'rgb(200, 228, 243)',
};

const mystyle1 = {
  backgroundColor: 'rgb(106, 190, 242)',
  border: '2px solid white',
  padding: '8px',
  textAlign: 'left',
};

const GSTCalculator = () => {
  const [amount, setAmount] = useState('');
  const [gstRate, setGstRate] = useState('');
  const [comission, setComission] = useState('');
  const [packingcost, setPackingcost] = useState('');
  const [local, setLocal] = useState('');
  const [regional, setRegional] = useState('');
  const [national, setNational] = useState('');
  const [sellingprice, setProductprice] = useState('');
  const [finalAmount, setFinalAmount] = useState(null);
  const [finalAmount1, setFinalAmount1] = useState(null);
  const [finalAmount2, setFinalAmount2] = useState(null);
  const [netProfitLocal, setNetProfitLocal] = useState(null);
  const [netProfitRegional, setNetProfitRegional] = useState(null);
  const [netProfitNational, setNetProfitNational] = useState(null);

  const calculateGSTAmount = (value, rate) => {
    return (value * rate) / (100 + rate);
  };

  const handleCalculate = (e) => {
    e.preventDefault();

    // Validate inputs
    if (
      !amount ||
      !gstRate ||
      !comission ||
      !packingcost ||
      !local ||
      !regional ||
      !national ||
      !sellingprice
    ) {
      alert('Please fill in all fields.');
      return;
    }

    // Convert inputs to floats
    const amountFloat = parseFloat(amount);
    const gstRateFloat = parseFloat(gstRate);
    const comissionFloat = parseFloat(comission);
    const packingcostFloat = parseFloat(packingcost);
    const localFloat = parseFloat(local);
    const regionalFloat = parseFloat(regional);
    const nationalFloat = parseFloat(national);
    const sellingpriceFloat = parseFloat(sellingprice);

    // Calculate base amounts excluding GST
    const productGST = calculateGSTAmount(amountFloat, gstRateFloat);
    const exclusiveAmount = amountFloat - productGST;

    const commissionGST = calculateGSTAmount(comissionFloat, gstRateFloat);
    const exclusiveCommission = comissionFloat - commissionGST;

    const localShippingGST = calculateGSTAmount(localFloat, gstRateFloat);
    const exclusiveLocalShipping = localFloat - localShippingGST;

    const regionalShippingGST = calculateGSTAmount(regionalFloat, gstRateFloat);
    const exclusiveRegionalShipping = regionalFloat - regionalShippingGST;

    const nationalShippingGST = calculateGSTAmount(nationalFloat, gstRateFloat);
    const exclusiveNationalShipping = nationalFloat - nationalShippingGST;

    // Calculate selling prices for different markets
    const localSellingPrice = sellingpriceFloat + localFloat;
    const regionalSellingPrice = sellingpriceFloat + regionalFloat;
    const nationalSellingPrice = sellingpriceFloat + nationalFloat;

    // Calculate GST on selling prices
    const localSellingGST = calculateGSTAmount(localSellingPrice, gstRateFloat);
    const regionalSellingGST = calculateGSTAmount(regionalSellingPrice, gstRateFloat);
    const nationalSellingGST = calculateGSTAmount(nationalSellingPrice, gstRateFloat);

    // Calculate gross profits (Revenue - COGS - Operating Expenses)
    const localGrossProfit = localSellingPrice - localSellingGST - exclusiveAmount - exclusiveCommission - packingcostFloat - exclusiveLocalShipping;
    const regionalGrossProfit = regionalSellingPrice - regionalSellingGST - exclusiveAmount - exclusiveCommission - packingcostFloat - exclusiveRegionalShipping;
    const nationalGrossProfit = nationalSellingPrice - nationalSellingGST - exclusiveAmount - exclusiveCommission - packingcostFloat - exclusiveNationalShipping;

    // Calculate net profits (Gross Profit - Taxes and Other Deductions)
    const localNetProfit = localGrossProfit;  // Since GST is already accounted for
    const regionalNetProfit = regionalGrossProfit;
    const nationalNetProfit = nationalGrossProfit;

    // Update state with calculated values
    setFinalAmount(localGrossProfit);
    setFinalAmount1(regionalGrossProfit);
    setFinalAmount2(nationalGrossProfit);
    setNetProfitLocal(localNetProfit);
    setNetProfitRegional(regionalNetProfit);
    setNetProfitNational(nationalNetProfit);

    // Logging for debugging
    console.log("Product Exclusive Amount:", exclusiveAmount);
    console.log("Commission Exclusive Amount:", exclusiveCommission);
    console.log("Local Gross Profit:", localGrossProfit);
    console.log("Regional Gross Profit:", regionalGrossProfit);
    console.log("National Gross Profit:", nationalGrossProfit);
    console.log("Local Net Profit:", localNetProfit);
    console.log("Regional Net Profit:", regionalNetProfit);
    console.log("National Net Profit:", nationalNetProfit);
  };

  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={handleCalculate}>
        <h2 style={{ textAlign: 'center' }}>Calculate Profit Margin</h2>
        <div>
          <h3>Product Price</h3>
          <label>
            Inclusive Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            GST Rate (%):
            <input
              type="number"
              value={gstRate}
              onChange={(e) => setGstRate(e.target.value)}
              required
            />
          </label>
        </div>
        <h3>Commission and Packing Cost</h3>
        <div>
          <label>
            Total Commission:
            <input
              type="number"
              value={comission}
              onChange={(e) => setComission(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Packing Cost:
            <input
              type="number"
              value={packingcost}
              onChange={(e) => setPackingcost(e.target.value)}
              required
            />
          </label>
        </div>
        <h3>Shipping Charges</h3>
        <div>
          <label>
            Local Amount:
            <input
              type="number"
              value={local}
              onChange={(e) => setLocal(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Regional Amount:
            <input
              type="number"
              value={regional}
              onChange={(e) => setRegional(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            National Amount:
            <input
              type="number"
              value={national}
              onChange={(e) => setNational(e.target.value)}
              required
            />
          </label>
        </div>
        <h3>Selling Cost of Product</h3>
        <div>
          <label>
            Product Selling Cost:
            <input
              type="number"
              value={sellingprice}
              onChange={(e) => setProductprice(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Calculate</button>
      </form>
      {finalAmount !== null && finalAmount1 !== null && finalAmount2 !== null && (
        <table style={{ width: '60%', borderCollapse: 'collapse', marginRight:'20%', marginLeft:'20%'}}>
          <thead>
            <tr>
              <th style={mystyle1}>Market</th>
              <th style={mystyle1}>Gross Profit</th>
              <th style={mystyle1}>Net Profit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={mystyle}>Local Market</td>
              <td style={mystyle}>{finalAmount.toFixed(2)}</td>
              <td style={mystyle}>{netProfitLocal !== null ? netProfitLocal.toFixed(2) : 'N/A'}</td>
            </tr>
            <tr>
              <td style={mystyle}>Regional Market</td>
              <td style={mystyle}>{finalAmount1.toFixed(2)}</td>
              <td style={mystyle}>{netProfitRegional !== null ? netProfitRegional.toFixed(2) : 'N/A'}</td>
            </tr>
            <tr>
              <td style={mystyle}>National Market</td>
              <td style={mystyle}>{finalAmount2.toFixed(2)}</td>
              <td style={mystyle}>{netProfitNational !== null ? netProfitNational.toFixed(2) : 'N/A'}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GSTCalculator;
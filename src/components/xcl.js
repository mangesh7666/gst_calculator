import React, { useState } from 'react';

const styles = {
  container: { padding: '20px' },
  formGroup: { 
    display: 'inline-block',
    marginRight: '20px',
    marginBottom: '10px',
    width: '100%'
  },
  input: { 
    padding: '8px',
    width: '100%'
  },
  table: { width: '60%', margin: '20px auto', borderCollapse: 'collapse' },
  th: { backgroundColor: 'rgb(106, 190, 242)', padding: '8px', border: '2px solid white' },
  td: { backgroundColor: 'rgb(200, 228, 243)', padding: '8px', border: '2px solid white' },
  button: { padding: '10px 15px', backgroundColor: '#007BFF', color: '#fff', border: 'none', cursor: 'pointer', marginLeft: '20px' },
};

const GSTCalculator = () => {
  const [values, setValues] = useState({
    amount: '', gstRate: 18, commission: '', packingCost: '',
    local: '', regional: '', national: '', sellingPrice: ''
  });

  const [productprice, setProductprice] = useState(null);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCalculate = (e) => {
    e.preventDefault();

    const { amount, gstRate, commission, packingCost, local, regional, national, sellingPrice } = values;
    
    // Convert to float and validate input
    const parsedValues = Object.fromEntries(
      Object.entries(values).map(([key, val]) => [key, parseFloat(val) || 0])
    );

    if (Object.values(parsedValues).some(val => isNaN(val) || val < 0)) {
      alert('Please enter valid positive numbers in all fields.');
      return;
    }

    const { amount: amt, gstRate: gst, commission: com, packingCost: pack, local: loc, regional: reg, national: nat, sellingPrice: sell } = parsedValues;

    // GST Breakdown
    const gstAmount = (amt * gst) / (100 + gst);
    const exclusivePrice = amt - gstAmount;

    // Commission Calculation
    const gstOnCommission = (com * gst) / (100 + gst);
    const netCommission = com - gstOnCommission;

    // Shipping Charges GST Breakdown
    const gstLocal = (loc * gst) / (100 + gst);
    const gstRegional = (reg * gst) / (100 + gst);
    const gstNational = (nat * gst) / (100 + gst);

    const netLocal = loc - gstLocal;
    const netRegional = reg - gstRegional;
    const netNational = nat - gstNational;

    // Selling Price Adjustments
    const localSell = sell + 40;
    const regionalSell = sell + 50;
    const nationalSell = sell + 60;

    const gstLocalSell = (localSell * gst) / (100 + gst);
    const gstRegionalSell = (regionalSell * gst) / (100 + gst);
    const gstNationalSell = (nationalSell * gst) / (100 + gst);

    // Gross Profit Calculation
    const grossLocal = localSell - exclusivePrice - netCommission - pack - netLocal - gstLocalSell;
    const grossRegional = regionalSell - exclusivePrice - netCommission - pack - netRegional - gstRegionalSell;
    const grossNational = nationalSell - exclusivePrice - netCommission - pack - netNational - gstNationalSell;

    // Net Profit Calculation
    const netLocalProfit = localSell - gstLocalSell - exclusivePrice - com - pack - loc;
    const netRegionalProfit = regionalSell - gstRegionalSell - exclusivePrice - com - pack - reg;
    const netNationalProfit = nationalSell - gstNationalSell - exclusivePrice - com - pack - nat;

    setProductprice({ gstAmount, exclusivePrice, amount, gstOnCommission, netCommission, gstLocal, gstRegional, gstNational, netLocal, netRegional, netNational, localSell, regionalSell, nationalSell, gstLocalSell, gstRegionalSell, gstNationalSell, sellingPrice, commission, local, regional, national, grossLocal, grossRegional, grossNational, netLocalProfit, netRegionalProfit, netNationalProfit, packingCost });
  };

  return (
    <div style={styles.container}>
      <h2 style={{ textAlign: 'center' }}>Calculate Profit Margin</h2>
      <form onSubmit={handleCalculate} style={{ width: '50%' }}>
        <div style={styles.formGroup}>
          <label>Inclusive Amount: <input type="number" name="amount" value={values.amount} onChange={handleChange} style={styles.input} required /></label>
        </div>
        <div style={styles.formGroup}>
          <label>GST Rate (%): <input type="number" name="gstRate" value={values.gstRate} onChange={handleChange} style={styles.input} required /></label>
        </div>
        <h3>Commission and Packing Cost</h3>
        <div style={styles.formGroup}>
          <label>Total Commission: <input type="number" name="commission" value={values.commission} onChange={handleChange} style={styles.input} required /></label>
        </div>
        <div style={styles.formGroup}>
          <label>Packing Cost: <input type="number" name="packingCost" value={values.packingCost} onChange={handleChange} style={styles.input} required /></label>
        </div>
        <h3>Shipping Charges</h3>
        <div style={styles.formGroup}>
          <label>Local Amount: <input type="number" name="local" value={values.local} onChange={handleChange} style={styles.input} required /></label>
        </div>
        <div style={styles.formGroup}>
          <label>Regional Amount: <input type="number" name="regional" value={values.regional} onChange={handleChange} style={styles.input} required /></label>
        </div>
        <div style={styles.formGroup}>
          <label>National Amount: <input type="number" name="national" value={values.national} onChange={handleChange} style={styles.input} required /></label>
        </div>
        <h3>Selling Cost of Product</h3>
        <div style={styles.formGroup}>
          <label>Product Selling Cost: <input type="number" name="sellingPrice" value={values.sellingPrice} onChange={handleChange} style={styles.input} required /></label>
        </div>
        <button type="submit" style={styles.button}>Calculate</button>
      </form>

      {productprice && (
        <>
          <h3 style={{ marginLeft: '20%', marginRight: '20%' }}>This is product initial price table</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Index</th>
                <th style={styles.th}>Product Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>Inclusive</td>
                <td style={styles.td}>{productprice.amount}</td>
              </tr>
              <tr>
                <td style={styles.td}>Exclusive</td>
                <td style={styles.td}>{productprice.exclusivePrice.toFixed(2)}</td>
              </tr>
              <tr>
                <td style={styles.td}>GST</td>
                <td style={styles.td}>{productprice.gstAmount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <h3 style={{ marginLeft: '20%', marginRight: '20%' }}>This is commission table</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Index</th>
                <th style={styles.th}>Commission</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>GST</td>
                <td style={styles.td}>{productprice.gstOnCommission.toFixed(2)}</td>
              </tr>
              <tr>
                <td style={styles.td}>Fees</td>
                <td style={styles.td}>{productprice.netCommission.toFixed(2)}</td>
              </tr>
              <tr>
                <td style={styles.td}>Total</td>
                <td style={styles.td}>{productprice.commission}</td>
              </tr>
            </tbody>
          </table>

          <h3 style={{ marginLeft: '20%', marginRight: '20%' }}>This is pick pack table</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Pick Pack Cost Table</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>{productprice.packingCost}</td>
              </tr>
            </tbody>
          </table>

          <h3 style={{ marginLeft: '20%', marginRight: '20%' }}>This table is of shipping charges</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Market</th>
                <th style={styles.th}>Shipping Charges</th>
                <th style={styles.th}>GST</th>
                <th style={styles.th}>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>Local</td>
                <td style={styles.td}>{productprice.netLocal.toFixed(2)}</td>
                <td style={styles.td}>{productprice.gstLocal.toFixed(2)}</td>
                <td style={styles.td}>{productprice.local}</td>
              </tr>
              <tr>
                <td style={styles.td}>Regional</td>
                <td style={styles.td}>{productprice.netRegional.toFixed(2)}</td>
                <td style={styles.td}>{productprice.gstRegional.toFixed(2)}</td>
                <td style={styles.td}>{productprice.regional}</td>
              </tr>
              <tr>
                <td style={styles.td}>National</td>
                <td style={styles.td}>{productprice.netNational.toFixed(2)}</td>
                <td style={styles.td}>{productprice.gstNational.toFixed(2)}</td>
                <td style={styles.td}>{productprice.national}</td>
              </tr>
            </tbody>
          </table>

          <h3 style={{ marginLeft: '20%', marginRight: '20%' }}>This is total selling price with GST table</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Selling Price</th>
                <th style={styles.th}>Local</th>
                <th style={styles.th}>Regional</th>
                <th style={styles.th}>National</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>{productprice.sellingPrice}</td>
                <td style={styles.td}>40</td>
                <td style={styles.td}>50</td>
                <td style={styles.td}>60</td>
              </tr>
              <tr>
                <td style={styles.td}>Total</td>
                <td style={styles.td}>{productprice.localSell.toFixed(2)}</td>
                <td style={styles.td}>{productprice.regionalSell.toFixed(2)}</td>
                <td style={styles.td}>{productprice.nationalSell.toFixed(2)}</td>
              </tr>
              <tr>
                <td style={styles.td}>GST</td>
                <td style={styles.td}>{productprice.gstLocalSell.toFixed(2)}</td>
                <td style={styles.td}>{productprice.gstRegionalSell.toFixed(2)}</td>
                <td style={styles.td}>{productprice.gstNationalSell.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <h3 style={{ marginLeft: '20%', marginRight: '20%' }}>This is net and gross profit table</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Market</th>
                <th style={styles.th}>Gross Profit</th>
                <th style={styles.th}>Net Profit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>Local Market</td>
                <td style={styles.td}>{productprice.grossLocal.toFixed(2)}</td>
                <td style={styles.td}>{productprice.netLocalProfit.toFixed(2)}</td>
              </tr>
              <tr>
                <td style={styles.td}>Regional Market</td>
                <td style={styles.td}>{productprice.grossRegional.toFixed(2)}</td>
                <td style={styles.td}>{productprice.netRegionalProfit.toFixed(2)}</td>
              </tr>
              <tr>
                <td style={styles.td}>National Market</td>
                <td style={styles.td}>{productprice.grossNational.toFixed(2)}</td>
                <td style={styles.td}>{productprice.netNationalProfit.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default GSTCalculator;
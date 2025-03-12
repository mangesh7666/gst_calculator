import React, { useState } from 'react';

const styles = {
  container: { padding: '20px' },
  formGroup: { 
    display: 'inline-block',
    marginRight: '20px',
    //marginLeft: '20px',
    marginBottom: '10px',
    width: '100%'
  },
  input: { 
    padding: '8px',
   // marginLeft: '20px',
    width: '100%'
  },
  table: { width: '60%', margin: '20px auto', borderCollapse: 'collapse' },
  th: { backgroundColor: 'rgb(106, 190, 242)', padding: '8px', border: '2px solid white' },
  td: { backgroundColor: 'rgb(200, 228, 243)', padding: '8px', border: '2px solid white' },
  button: { padding: '10px 15px', backgroundColor: '#007BFF', color: '#fff', border: 'none', cursor: 'pointer', marginLeft: '20px' },
};

const GSTCalculator = () => {
  const [values, setValues] = useState({
    amount: '', gstRate: '', commission: '', packingCost: '',
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
      Object.entries(values).map(([key, val]) => [key, parseFloat(val)])
    );

    if (Object.values(parsedValues).some(val => isNaN(val) || val < 0)) {
      alert('Please enter valid positive numbers in all fields.');
      return;
    }

    const { amount: amt, gstRate: gst, commission: com, packingCost: pack, local: loc, regional: reg, national: nat, sellingPrice: sell } = parsedValues;

    // GST Breakdown
    const gstAmount = (amt * gst) / (100 + gst);
    const exclusivePrice = amt - gstAmount;

console.log(gstAmount + 'this is the gst amount of product price table');
console.log(exclusivePrice + 'this is the exclusive price of product price table');
console.log(amount + "this is the amount which we have entered in product price table");

    // Commission Calculation
    const gstOnCommission = (com * gst) / (100 + gst);
    const netCommission = com - gstOnCommission;

console.log(gstOnCommission + 'this is the calculation of commission from commisssion table');
console.log(netCommission + 'this is the calculation of netcommission from commission table');

    // Shipping Charges GST Breakdown
    const gstLocal = (loc * gst) / (100 + gst);
    const gstRegional = (reg * gst) / (100 + gst);
    const gstNational = (nat * gst) / (100 + gst);

    console.log(gstLocal + 'this is gst of local sell');
    console.log(gstRegional + 'this is gst of regional sell');
    console.log(gstNational + 'this is gst for national sell');
    
    const netLocal = loc - gstLocal;
    const netRegional = reg - gstRegional;
    const netNational = nat - gstNational;

    console.log(netLocal + 'this is net local amount');
    console.log(netRegional + 'this is net regional amount');
    console.log(netNational + 'this is net national amount');

    // Selling Price Adjustments
    const localSell = sell + 40;
    const regionalSell = sell + 50;
    const nationalSell = sell + 60;

    console.log(localSell + 'local sell');
    console.log(regionalSell + 'regional sell');
    console.log(nationalSell + 'national sell');

    const gstLocalSell = (localSell * gst) / (100 + gst);
    const gstRegionalSell = (regionalSell * gst) / (100 + gst);
    const gstNationalSell = (nationalSell * gst) / (100 + gst);

    console.log(gstLocalSell);
    console.log(gstRegionalSell);
    console.log(gstNationalSell);

    // Gross Profit Calculation
    const grossLocal = localSell - exclusivePrice - netCommission - pack - netLocal - gstLocalSell;
    const grossRegional = regionalSell - exclusivePrice - netCommission - pack - netRegional - gstRegionalSell;
    const grossNational = nationalSell - exclusivePrice - netCommission - pack - netNational - gstNationalSell;

    // Net Profit Calculation
    const netLocalProfit = localSell - gstLocalSell - exclusivePrice - com - pack - loc;
    const netRegionalProfit = regionalSell - gstRegionalSell - exclusivePrice - com - pack - reg;
    const netNationalProfit = nationalSell - gstNationalSell - exclusivePrice - com - pack - nat;


    setProductprice ({gstAmount, exclusivePrice, amount, gstOnCommission, netCommission, gstLocal, gstRegional, gstNational, netLocal, netRegional, netNational, localSell, regionalSell, nationalSell, gstLocalSell, gstRegionalSell, gstNationalSell, sellingPrice, commission,local, regional, national, grossLocal, grossRegional, grossNational, netLocalProfit, netRegionalProfit, netNationalProfit, packingCost })
  };

  return (
    <div style={styles.container}>
      <h2 style={{textAlign:'center'}}>Calculate Profit Margin</h2>
      <form onSubmit={handleCalculate} style={{width:'50%'}}>
        <div style={styles.formGroup}>
          <label>Inclusive Amount: <input type="number" name="amount" value={values.amount} onChange={handleChange} style={styles.input} required /></label>
        </div>
        <div style={styles.formGroup}>
          <label>GST Rate (%): <input type="number" name="gstRate" value={values.gstRate || 18} onChange={handleChange} style={styles.input} required defaultValue={18} /></label>
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

<h3 style={{marginLeft:'20%', marginRight:'20%'}}>this is product initial price table</h3>
  <table style={styles.table}>
  <thead>
    <tr>
      <th style={styles.th}>index</th>
      <th style={styles.th}>product price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style={styles.td}>Inclusive</td>
      <td style={styles.td}>{productprice.amount}</td>
    </tr>
    <tr>
      <td style={styles.td}>exclusive</td>
      <td style={styles.td}>{productprice.exclusivePrice.toFixed(2)}</td>
    </tr>
    <tr>
      <td style={styles.td}>gst</td>
      <td style={styles.td}>{productprice.gstAmount.toFixed(2)}</td>
    </tr>
  </tbody>
</table>


<h3 style={{marginLeft:'20%', marginRight:'20%'}}>this is commission table</h3>
<table style={styles.table}>
<thead>
  <tr>
    <th style={styles.th}>index</th>
    <th style={styles.th}>commission</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td style={styles.td}>GST</td>
    <td style={styles.td}>{productprice.gstOnCommission}</td>
  </tr>
  <tr>
    <td style={styles.td}>Fees</td>
    <td style={styles.td}>{productprice.netCommission}</td>
  </tr>
  <tr>
    <td style={styles.td}>Total</td>
    <td style={styles.td}>{productprice.commission}</td>
  </tr>
</tbody>
</table>



<h3 style={{marginLeft:'20%', marginRight:'20%'}}>this is pick pack table</h3>
<table style={styles.table}>
<thead>
  <tr>
    <th style={styles.th}>pick pack cost table</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td style={styles.td}>{productprice.packingCost}</td>
  </tr>
</tbody>
</table>




<h3 style={{marginLeft:'20%', marginRight:'20%'}}>this table is of shipping charges</h3>
<table style={styles.table}>
<thead>
  <tr>
  <th style={styles.th}>Market</th>
    <th style={styles.th}>shipping charges</th>
    <th style={styles.th}>gst</th>
    <th style={styles.th}>Total</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td style={styles.td}>Local</td>
    <td style={styles.td}>{productprice.netLocal}</td>
    <td style={styles.td}>{productprice.gstLocal}</td>
    <td style={styles.td}>{productprice.local}</td>
    
  </tr>
  <tr>
    <td style={styles.td}>Regional</td>
    <td style={styles.td}>{productprice.netRegional}</td>
    <td style={styles.td}>{productprice.gstRegional}</td>
    <td style={styles.td}>{productprice.regional}</td>
    
  </tr>
  <tr>
    <td style={styles.td}>National</td>
    <td style={styles.td}>{productprice.netNational}</td>
    <td style={styles.td}>{productprice.gstNational}</td>
    <td style={styles.td}>{productprice.national}</td>
    
  </tr>
</tbody>
</table>


<h3 style={{marginLeft:'20%', marginRight:'20%'}}>this is total selling price with gst table</h3>
<table style={styles.table}>
<thead>
  <tr>
  <th style={styles.th}>sellingPrice</th>
    <th style={styles.th}>local</th>
    <th style={styles.th}>regional</th>
    <th style={styles.th}>national</th>
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
    <td style={styles.td}>{productprice.localSell}</td>
    <td style={styles.td}>{productprice.regionalSell}</td>
    <td style={styles.td}>{productprice.nationalSell}</td>
    
  </tr>
  <tr>
    <td style={styles.td}>GST</td>
    <td style={styles.td}>{productprice.gstLocalSell}</td>
    <td style={styles.td}>{productprice.gstRegionalSell}</td>
    <td style={styles.td}>{productprice.gstNationalSell}</td>
    
  </tr>
</tbody>
</table>

<h3 style={{marginLeft:'20%', marginRight:'20%'}}>this is net and gross profit table</h3>
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
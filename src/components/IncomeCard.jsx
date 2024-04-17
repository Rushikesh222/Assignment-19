const IncomeCard=({income})=>{
    const { _id, description, amount, category, date } = income;

    const formattedAmount = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR"
    }).format(amount);
  
    return (
      <tr key={_id} className="item-card">
        <td>{new Date(date).toDateString()}</td>
        <td>{category}</td>
        <td>{description}</td>
        <td>{formattedAmount}</td>
      </tr>
    );
}
export {IncomeCard}
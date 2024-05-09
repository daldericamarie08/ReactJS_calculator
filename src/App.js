import React, { useState } from 'react';
import './App.css';

function App() {
  const [total, setTotal] = useState('');

  const handleClick = (e) => {
    const value = e.target.name;
    if (total === "0" && value === "0") {
      // Prevent concatenating additional zeros when the current total is "0"
      return;
    }
    if (value === "=") {
      calculate();
    } else if (value === "C") {
      clear();
    } else {
      setTotal(total.concat(value));
    }
  }
  
  const clear = () => {
    setTotal("");
  }

  function handleDelete() {
    setTotal(total.slice(0, -1));
  }

  const calculate = () => {
    try {
      let expression = total;
      // Check if the expression contains a percentage operation
      if (expression.includes("%")) {
        // Split the expression by the operator
        const operator = expression.includes("+") ? "+"
                    : expression.includes("-") ? "-"
                    : expression.includes("*") ? "*"
                    : "/";
        const parts = expression.split(operator);
        // Extract the number and percentage from the parts
        const number = parseFloat(parts[0]);
        const percentage = parseFloat(parts[1].replace("%", "")) / 100;
        // Calculate the result based on the operator
        let result;
        switch (operator) {
          case "+":
            result = number + (number * percentage);
            break;
          case "-":
            result = number - (number * percentage);
            break;
          case "*":
            result = number * percentage;
            break;
          case "/":
            result = number / percentage;
            break;
          default:
            throw new Error("Invalid operator");
        }
        setTotal(result.toString());
      } else {
        // Evaluate the expression
        const result = eval(expression);
        setTotal(result.toString());
      }
    } catch {
      setTotal("Error");
    }
  }
  
  return (
    <div className="App">
      {/*<h1>Calculator</h1> */}

      <div className='container'>
        <form>
          <input type='text' value={total} />
        </form>

        <div className='keypad'>
          <button onClick={clear} className='highlight'>AC</button>
          <button onClick={handleDelete} className='highlight'>C</button>
          <button name='%' onClick={handleClick} className='highlight'>%</button>
          <button name='/' onClick={handleClick} className='highlight'>÷</button>
          <button name='7' onClick={handleClick}>7</button>
          <button name='8' onClick={handleClick}>8</button>
          <button name='9' onClick={handleClick}>9</button>
          <button name='*' onClick={handleClick} className='highlight'>&times;</button>
          <button name='4' onClick={handleClick}>4</button>
          <button name='5' onClick={handleClick}>5</button>
          <button name='6' onClick={handleClick}>6</button>
          <button name='-' onClick={handleClick} className='highlight'>-</button>
          <button name='1' onClick={handleClick}>1</button>
          <button name='2' onClick={handleClick}>2</button>
          <button name='3' onClick={handleClick}>3</button>
          <button name='+' onClick={handleClick} className='highlight'>+</button>
          <button name='0' onClick={handleClick}>0</button>
          <button name='.' onClick={handleClick}>.</button>
          <button onClick={calculate} id="equal" className='highlight'>=</button>
        </div>
      </div>
     
    </div>
  );
}

export default App;

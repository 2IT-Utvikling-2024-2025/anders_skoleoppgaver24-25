import { useState } from "react"
import "./button.css"

function Button () {

    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
      }

      return (
        <button onClick={handleClick}>
          Kjøpt {count} hvalnyrer
        </button>
      );
}

export default Button

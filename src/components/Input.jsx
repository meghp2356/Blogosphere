import React,{forwardRef} from "react";
import './css/input.css'

function Input({ Label, placeHolder, type, id, name, className,pass=false, ...props },ref) {
  return (
    <div className={className}>
      {Label && <label htmlFor={name}>{Label}</label>}
      <input
        type={type}
        placeholder={placeHolder}
        name={name}
        ref={ref}
        {...props}
      />
    </div>
        
  );
}

export default forwardRef(Input);

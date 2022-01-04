import React from 'react';
import './style.css'


export default function AuthForm(props) {
  return (
    <form className="formbody" onSubmit={props.handleFormSubmit}>
      {props.fields.map((field, index) => {
        return (
          <React.Fragment key={index}>
            <label htmlFor={field.id}>{field.label} {field.required ? "*" : ""}</label>
            <input id={field.id} type={field.type} className="form-field" val={field.val} onChange={(e) => field.setVal(e.target.value)} required={field.required} />
          </React.Fragment>
        )
      })}
      {props.error ? <p className="error-text">{props.error}</p> : ""}
      <button className="submit-button" disabled={props.loading}>{props.submitText}</button>
    </form >
  );
}
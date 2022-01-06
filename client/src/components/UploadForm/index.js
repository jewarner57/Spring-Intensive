import React, { useRef } from 'react';
import './style.css'


export default function UploadForm(props) {
  let uploadRef = useRef()

  return (
    <form className="formbody" onSubmit={props.handleFormSubmit}>
      {props.fields.map((field, index) => {
        return (
          <React.Fragment key={index}>
            <label htmlFor={field.id}>{field.label} {field.required ? "*" : ""}</label>
            {field.type === 'file' ?
              <>
                <input
                  name={field.id}
                  ref={refParam => uploadRef = refParam}
                  id={field.id}
                  type={field.type}
                  className="file-field"
                  onChange={(e) => field.setVal(e.target.files[0])}
                  required={field.required}
                />
                <div className="file-upload-button" onClick={() => uploadRef.click()}>
                  {field.val ? field.val : 'Upload Image'}
                </div>
              </>
              :
              <>
                <input
                  id={field.id}
                  type={field.type}
                  className="form-field"
                  value={field.val}
                  onChange={(e) => field.setVal(e.target.value)}
                  required={field.required}
                />
              </>
            }
          </React.Fragment>
        )
      })}
      {props.error ? <p className="error-text">{props.error}</p> : ""}
      <button className="submit-button" type="submit" disabled={props.loading}>{props.submitText}</button>
    </form >
  );
}
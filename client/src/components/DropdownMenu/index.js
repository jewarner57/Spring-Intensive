import './style.css';

export default function DropdownMenu(props) {
  const { options, value, setValue, title, border } = props

  return (
    <div className="dropdown-menu-wrapper">
      <p className="dropdown-title">{title}</p>
      <select className={`dropdown-menu ${border ? 'dropdown-border' : ''}`} value={value} onChange={(e) => { setValue(e.target.value) }}>
        {options.map((option, index) => {
          return <option key={`${option.value}${index}`} value={option.value}>{option.title}</option>
        })}
      </select>
    </div>
  );
}

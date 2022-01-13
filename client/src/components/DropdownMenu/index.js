import './style.css';

export default function DropdownMenu(props) {
  const { options, value, setValue, title } = props

  return (
    <div className="dropdown-menu-wrapper">
      <p class="dropdown-title">{title}</p>
      <select className="dropdown-menu" value={value} onChange={(e) => { setValue(e.target.value); console.log(e.target.value) }}>
        {options.map((option, index) => {
          return <option key={`${option.value}${index}`} value={option.value}>{option.title}</option>
        })}
      </select>
    </div>
  );
}

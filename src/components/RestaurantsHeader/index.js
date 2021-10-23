import {BsFilterLeft} from 'react-icons/bs'
import './index.css'

const RestaurantsHeader = props => {
  const {options, filterOption, onSortBy} = props

  const onChangeFilter = event => {
    onSortBy(event.target.value)
  }
  return (
    <div className="header-options">
      <div>
        <h1 className="options-heading">Popular Restaurants</h1>
        <p className="options-description">
          Select Your favourite restaurant special dish and make your day
          happy...
        </p>
      </div>
      <div className="options-container">
        <BsFilterLeft className="sort-icon" />
        <p className="sortby-text">Sort By</p>
        <select
          value={filterOption}
          className="select-el"
          onChange={onChangeFilter}
        >
          {options.map(eachOption => (
            <option
              key={eachOption.id}
              className="filter-option"
              value={eachOption.value}
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
export default RestaurantsHeader

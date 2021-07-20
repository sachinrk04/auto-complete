import React from 'react';
import './AutoComplete.css';

function AutoComplete(props) {
    const {selectedList, data, interests, changeHandler, suggestionSelected, removeValue} = props;

    function renderSuggestions(data) {
        return (
          <div className="auto-complete-text">
            <ul>
              {data.map(item => <li onClick={() => suggestionSelected(item)} key={item}>{item}</li>)}
            </ul>
          </div>
        )
      }

    return (
        <div className="auto-complete">
            <div className="selected-list">
            {
                selectedList && selectedList.length ?
                selectedList.map((itm, i) => (
                    <li key={i}>
                    <input type="button" className="selected-input" value={itm} />
                    <span onClick={() => removeValue(itm)}>X</span>
                    </li>
                ))
                : null
            }
                <div>
                <input 
                    className="input-test" 
                    name="interests"
                    value={interests}
                    onChange={changeHandler}
                    autoComplete="true"
                />
                </div>
                {
                    data && data.length > 0 ? renderSuggestions(data) : null
                }
            </div>
        </div>
    );
}

export default AutoComplete;

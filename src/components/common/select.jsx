import React from 'react';
import { getGenres } from '../../services/fakeGenreService'

const Select = ({ name, label, error, value, ...rest }) => {

    const genres = getGenres();

        return (
          <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select
              {...rest}
              name={name}
              className="form-control"
            > 
            <option></option>
            {genres.map(genre => (
                <option>{genre.name}</option>
            ))}
                
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
          </div>
        );
}
 
export default Select;
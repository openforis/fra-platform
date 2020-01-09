import React from 'react';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
export const NewVersionForm = (props) => {
  const { onSubmit, onChange } = props;
  const history = useHistory();
  const goBack = (e) => {
    e.preventDefault();
    history.goBack();
  };
  const minDate = format(new Date(), 'yyyy-MM-ddThh:mm', { awareOfUnicodeTokens: true });
  const maxDate = format(new Date(new Date().getUTCFullYear() + 2 + ''), 'yyyy-MM-ddThh:mm', { awareOfUnicodeTokens: true });
  // TODO : Go back on submit
  return <form onSubmit={onSubmit}>
    <label>Version</label>
    <input onChange={onChange} placeholder="Ex. 1.0.0" type="text" name="version" /> <br />
    <label>Date</label>
    <input min={minDate} max={maxDate} onChange={onChange} type="datetime-local" name="timestamp" /> <br />
    <button onClick={goBack}>Cancel</button>
    <input type="submit" />
  </form>;
};

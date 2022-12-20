import React from 'react';
import DatePicker from './components/DatePicker';

function App() {
   return (
      <div className="App">
         <DatePicker min={1900} max={2022} />
      </div>
   );
}

export default App;

import React from 'react';

type Props = {
    data: Array<{ [key: string]: any }> // You can replace `any` with a more specific type if you know the structure of the objects
}

const Table = (props: Props) => {
  return (
    <table className='bg-red-400 w-full'>
      <thead>
        <tr>
          <th className='text-center'>Header 1</th>
          <th className='text-center'>Header 2</th>
          <th className='text-center'>Header 3</th>
          <th className='text-center'>Header 4</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((row, index) => (
          <tr key={index}>
            <td>{row.col1}</td>
            <td>{row.col2}</td>
            <td>{row.col3}</td>
            <td>{row.col4}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;

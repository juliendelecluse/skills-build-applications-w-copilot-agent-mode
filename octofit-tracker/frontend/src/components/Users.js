import React, { useEffect, useState } from 'react';
import { Table, Card } from 'react-bootstrap';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

function Users() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        const results = json.results || json;
        setData(results);
        console.log('Users API endpoint:', endpoint);
        console.log('Fetched users data:', results);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  return (
    <Card>
      <Card.Body>
        <Card.Title as="h2" className="mb-4">Users</Card.Title>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={item.id || idx}>
                <td>{item.id || idx + 1}</td>
                <td><pre style={{margin:0}}>{JSON.stringify(item, null, 2)}</pre></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default Users;

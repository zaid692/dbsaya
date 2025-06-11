
'use client';

import { useEffect, useState } from 'react';
import { database } from '../../firebase'; 
import { ref, get } from 'firebase/database';

export default function Fdata() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userRef = ref(database, 'john');  

    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        setUserData(snapshot.val());
        console.log(snapshot.val())
      } else {
        console.log('No data available');
      }
    }).catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, []);

  return (
    <div>
      <h1>Fetched User Data</h1>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </div>
  );
}

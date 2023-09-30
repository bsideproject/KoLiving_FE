import { useRouter } from 'next/router';
import React from 'react';

function Step2() {
  const router = useRouter();
  const { query } = router;
  const data = JSON.parse(query.data as string);
  console.log('%c 🤩🤩🤩 영우의 로그 : ', 'font-size: x-large; color: #bada55;', data);

  return <div>step2</div>;
}

export default Step2;

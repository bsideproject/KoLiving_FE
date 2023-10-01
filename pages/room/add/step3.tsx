import { useRouter } from 'next/router';
import React from 'react';

export default function Step3() {
  const router = useRouter();
  const { query } = router;
  const step2Params = query.data ? JSON.parse(query.data as string) : {};

  console.log(step2Params);

  return <div>step3</div>;
}

import {redirect} from 'next/navigation';

export default function RootRedirect() {
  // Safety net: always redirect "/" to default locale
  redirect('/ar');
}


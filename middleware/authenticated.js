import { auth } from '~/plugins/firebase';

export default function ({ store, redirect }) {
  if (!store.state.user.id) {
    return redirect('/');
  }
}
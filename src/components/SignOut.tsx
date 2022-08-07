import { auth } from './app';
import { signOut } from 'firebase/auth';

function SignOut() {
    return (
        auth.currentUser && (
            <button onClick={() => signOut(auth)}>Sign Out</button>
        )
    );
}

export default SignOut;

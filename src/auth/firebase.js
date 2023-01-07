import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut, onAuthStateChanged } from "firebase/auth";

//! GET
const firebaseConfig = {
    apiKey: "AIzaSyBgVc1mrGmFJaTGPqgTbf4Du-2eDp-D0lo",
    authDomain: "fir-movie-f8ee2.firebaseapp.com",
    projectId: "fir-movie-f8ee2",
    storageBucket: "fir-movie-f8ee2.appspot.com",
    messagingSenderId: "888800399736",
    appId: "1:888800399736:web:9c23c7cf2e570915f9b88d"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);



//! SIGN UP
export const createUser = async (email, password, navigate, displayName) => {
    //* yeni bir kullanıcı oluşturmak için kullanılan firebase metodu
    try {
        let userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        //* kullanıcı profilini güncellemek için kullanılan firebase metodu
        await updateProfile(auth.currentUser, {
            displayName: displayName
        })
        navigate("/")
        console.log(userCredential);
    } catch (error) {
        console.log(error)
    }
}




//! SIGN IN
//! Email/password ile girişi enable yap
export const signIn = async (email, password, navigate) => {
    try {
        let userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        //* kullanıcı profilini güncellemek için kullanılan firebase metodu
        //  await updateProfile(auth.currentUser, {
        //      displayName: displayName
        //    })
        navigate("/")
        console.log(userCredential);
    } catch (error) {
        console.log(error)
    }

}

//! Sign up oldum ve kayıtlarım database eklendi burada user kaydım varsa bunu
//! currentUser a aktarıp diğer yerlerde kullanmamı sağlayacak 
export const userObserver = (setCurrentUser) => {
  //? Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni 
  //? kullanıcıyı response olarak dönen firebase metodu
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setCurrentUser(user)
        } else {
            setCurrentUser(false)
        }
    })
}


//! LOGOUT
export const logOut = (navigate) => {
    signOut(auth)
    navigate("/login")
}
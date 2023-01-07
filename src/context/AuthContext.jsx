import { createContext, useEffect, useState } from "react"
import { userObserver } from "../auth/firebase";

// 1) create
export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {

  //! registerda oluşturduğumuz kullanıcıyı heryerde kontrol amaçlı kullanmak için
  //! global state olarak tanımlayıp kullanacağız firebase kullandığımız için burada
  //! değerleri firebase backendinden çekeceğiz firebase olmasaydı local veya session storage çekerdik
  const [currentUser, setCurrentUser] = useState(false)

  useEffect(() => {
    userObserver(setCurrentUser)
  }, []);

  // 2) provider
  return (
    <AuthContext.Provider value={{currentUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
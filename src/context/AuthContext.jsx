import { createContext, useState } from "react"

// 1) create
export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {

  //! registerda oluşturduğumuz kullanıcıyı heryerde kontrol amaçlı kullanmak için
  //! global state olarak tanımlayıp kullanacağız firebase kullandığımız için burada
  //! değerleri firebase backendinden çekeceğiz firebase olmasaydı local veya session storage çekerdik
  const [currentUser, setCurrentUser] = useState(false)

  // 2) provider
  return (
    <AuthContext.Provider value={currentUser}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
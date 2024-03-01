import { FC, ReactNode } from "react";
import { AuthProvider } from "./auth/AuthContext.tsx";

type Props = {
  children: ReactNode
}

const AppProviders: FC<Props> = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

export default AppProviders

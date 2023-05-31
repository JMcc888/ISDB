import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isWiwam = false
    let status = "User"

    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles, userID } = decoded.UserInfo

        isWiwam = roles.includes('wiwam')

        if (isWiwam) status = "wiwam"

        return { username, roles, status, isWiwam, userID }
    }

    return { username: '', roles: [], isWiwam, status, userID: '' }
}
export default useAuth
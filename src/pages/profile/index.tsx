import {signIn,useSession,signOut} from "next-auth/react"

const ProfilePage=()=>{
const {data}:any=useSession();
    return(
        <div>
            <h1>profile</h1>
            <h3>{data && data.user.name}</h3>
        </div>
    )
}
export default ProfilePage;
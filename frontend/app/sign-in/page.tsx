import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { options } from "../api/auth/[...nextauth]/options"

import SignInButton from "@/components/SignInButton"


const SignInPage = async() => {
    const session = await getServerSession(options) ;
    if(session){
        redirect("/chat");
    }else{
        return (
            <div>
                <div>Sign in page</div>
                <SignInButton/>
            </div>
          )
    }

}

export default SignInPage
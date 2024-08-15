import { Mail } from "lucide-react"
import Link from "next/link";
import { Button } from "@/components/ui/button"
 
export function ButtonWithMail() {

    //change Link from contact to login
  return (
    <Link href="/contact">
      <Button>
        <Mail className="mr-2 h-4 w-4" /> Login
      </Button>
    </Link>
  )
}
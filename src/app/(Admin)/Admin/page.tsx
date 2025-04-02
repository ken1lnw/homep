import { redirect } from "next/navigation";



export default function Page() {
  redirect("/Admin/Login"); // เปลี่ยนเส้นทางไปยังหน้า Login
}

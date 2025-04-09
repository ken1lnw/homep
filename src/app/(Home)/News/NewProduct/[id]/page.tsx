import NewItemId from "@/components/News/NewItemId";

const Page = async({params} : {params:{id:number}}) => {
  const { id } = await params;

  return ( 
      <>  
    <NewItemId id={id}/>
      </>
   );
}
 
export default Page;
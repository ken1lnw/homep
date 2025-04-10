import NewItemId from "@/components/News/NewItemId";

const Page = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params; 

  return (
    <>
      <NewItemId id={id} />
    </>
  );
}

export default Page;
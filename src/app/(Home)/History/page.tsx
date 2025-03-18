import HistoryComponent from "@/components/History/HistoryComponent";

export default function History() {
  return (
    <div>
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-[300px] bg-black opacity-50" />

        <img
          src="https://www.tyc.com.tw/assets/uploads/products/banner1684996579.jpg"
          alt="TYC Building"
          className="w-full h-[300px] object-cover"
        />

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
          <h1 className="text-7xl font-bold">TYC History</h1>
          <p className="text-xl font-bold">
          The evolution of our achievements.
          </p>
        </div>
      </div>

      <HistoryComponent/>
    </div>
  );
}

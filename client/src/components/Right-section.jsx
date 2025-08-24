export default function Right() {
  return (
    <div className="max-w-md bg-black shadow-md   border border-gray-200">
      <div className="p-4 space-y-4">
        <search className="p-4 mx-4 mt-1 rounded-2xl text-gray-500 border border-gray-700">
          <p>Search Twitter</p>
        </search>
        {/* First Section */}
        <div className="card p-4 mx-4 border border-gray-400 rounded-2xl text-white ">
          <h2 className="mt-2 font-semibold text-l">What's happening</h2>
          <div className="mt-4">
          <h2 className="text-sm text-gray-600 font-semibold mt-1">Blockchain Technology? How Does It Work?</h2>
          <p className="text-sm  mt-1">
            Blockchain: a decentralized, distributed, and oftentimes public, digital ledger consisting ...
          </p>
          <p className="text-blue-500 text-sm mt-1">Trending with <span className="font-medium">#Blockchain</span>, <span className="font-medium">#Ethereum</span></p>
        </div>

        <hr className="border-gray-200" />

        {/* Second Section */}
        <div>
          <p className="text-gray-500 text-sm font-medium">Business & finance · Trending</p>
          <h2 className="text-sm font-semibold mt-1">Online virtual environment that incorporates a broad range of Internet functions</h2>
          <p className="text-blue-500 text-sm mt-1">Trending with <span className="font-medium">#Metaverse</span></p>
        </div>

        <hr className="border-gray-200" />

        {/* Third Section */}
        <div>
          <p className="text-gray-500 text-sm font-medium">Politics · Trending</p>
          <h2 className="text-sm font-semibold mt-1">Trump</h2>
          <p className="text-blue-500 text-sm mt-1">Trending with <span className="font-medium">#Trump</span>, <span className="font-medium">#Politics</span></p>
        </div>
        

        {/* Show More */}
        <div className="pt-2">
          <button className="text-blue-500 text-sm hover:underline">Show more</button>
        </div>
      </div>
      

      {"second section"}

      <div className="card p-4 mx-4 border border-gray-400 rounded-2xl">
      <div className="text-white flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
        <img
        src="/assets/avatar.png" // put your image path here
        alt="avatar"
        className="w-10 h-10 rounded-full object-cover"
        />
        <p className="font-medium">Abrar</p>
        </div>
        <button className="rounded-xl bg-[#1DA1F2] text-white px-4 py-1 hover:bg-[#1A91DA]">
        Follow
        </button>
        </div>
      <div className="text-white flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
        <img
        src="/assets/avatar.png" // put your image path here
        alt="avatar"
        className="w-10 h-10 rounded-full object-cover"
        />
        <p className="font-medium">Abrar</p>
        </div>
        <button className="rounded-xl bg-[#1DA1F2] text-white px-4 py-1 hover:bg-[#1A91DA]">
        Follow
        </button>
        </div>
      
      
        </div>
      
      
      
      
      </div>
    </div>
  );
}

export  default function Msg(){
    return(
        <>
        <div className="w-[35%] h-[100%] border border-gray-600 bg-black ">
        {/* <card className="text-white "> */}
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
            {/* <ul>
                    <li>Abrar<button>Follow</button></li>
                    <li>Abrar<button>Follow</button></li>

                    <li><button></button></li>
                    <li><button></button></li>
                    <li><button></button></li>
                    <li><button></button></li>
                    <li><button></button></li>
                    <li><button></button></li>
                    <li><button></button></li>
            </ul>
        </card> */}
        </div>

                <div>
                <card>
                <input type="text" className="text" />
                </card>
                </div>
        
        
        
        </>
    )
}
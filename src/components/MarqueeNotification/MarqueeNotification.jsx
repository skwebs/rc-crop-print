import Marquee from "react-fast-marquee"

const MarqueeNotification = () => {
    return (
        <>
            <div className="w-full flex justify-center bg-[#0b57d0]  text-slate-100">
                <div className="max-w-screen-xl px-4">
                    <Marquee>
                        <div className="flex gap-11 ">
                            <div>This is a sample notice</div>
                            <div>This is a sample notice</div>
                            <div>This is a sample notice</div>
                            <div>This is a sample notice</div>
                        </div>
                    </Marquee>
                </div>
            </div>

        </>

    )
}

export default MarqueeNotification
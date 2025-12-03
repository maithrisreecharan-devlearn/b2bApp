"use client";
import Image from "next/image";


export default function Page() {
	return (
		<div className="w-full bg-[#2d2d2d] text-white py-2 px-6 md:px-20 flex justify-between items-center text-sm">
			<div>About us</div>
			<div style={{display: 'grid', gap: 6}}>
			<Image
						src="/b2bAbout.jpg"
						alt="About Us B2B"
						width={1200}
						height={1200}
						className="h-10 w-auto"
					  />
			</div>
            

			</div>

	)
}

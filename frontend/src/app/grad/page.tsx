import SeniorGrid from "../../components/SeniorGrid"

import { getImagesByGallery } from "@/actions/getImagesByGallery";
import Link from "next/dist/client/link";
import Image from "next/image";
export default async function GradPage() {
  return (
    <div className="mt-4 px-7 md:px-5 py-4 w-full">
      <div className="mx-auto">
        <div className="flex flex-row pb-3 mt-2">
          <h1
            className={`inline-block text-4xl font-bold font-sans text-[#B40A0A] uppercase `}
          >
            Graduation
          </h1>
          <span className="md:hidden font-serif text-sm xl:text-md inline text-muted-foreground items-start mt-auto ml-auto">
            Highlights from the Class of 2026 Graduation
          </span>
				
			  </div>
			<hr className="border-border w-full mb-8" />
      { /* Main Content */ }
      <div className="px-0 md:px-0">

        <div className="mb-1 ">
          <h1 className="text-2xl font-bold font-serif"> Photos from Graduation and Prom </h1>
        </div>
        <div className="w-full pr-6">
          <SeniorGrid slug="prom-grad-live" />
        </div>

        <div className="mt-5 mb-3 ">
          <h1 className="text-2xl font-bold font-serif"> Featured Articles Coming Soon </h1>
        </div>
      </div>
      

      </div>
    </div>
  );
}

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
        <Link href="https://secure.touchnet.com/C25385_ustores/web/product_detail.jsp?PRODUCTID=566" target="_blank" className="block">
          <div className="w-auto mb-9 border-l-[3px] border-red-700 px-6 pt-3 pb-4 bg-gradient-to-r from-red-50 to-background rounded-md">
            <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-xl font-bold text-foreground">
                    <span className="line-through text-muted-foreground">Pre-Order our Graduation Issue</span>
                  </h2>
                  <span className="rounded-full bg-red-100 px-2.5 py-0.5 font-sans text-xs font-semibold text-red-700 dark:bg-red-900/40 dark:text-red-400">
                    Out of Stock
                  </span>
                </div>
                <p className="mt-1 font-sans text-sm text-muted-foreground">
                  Get featured articles from the year, all senior of the year articles, and more, delivered to your door for only $30.
                </p>
              </div>
            </div>
          </div>
        </Link>

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

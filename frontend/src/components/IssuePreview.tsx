import Image from "next/image";
import * as Constants from "@/components/Constants";
import Link from "next/link";
import { Issue } from "../../types/APIResponse";
import { useState, useEffect } from "react";

// interface IssuePreviewProps {
//   issue: {
//     board: string;
//     publishDate: Date;
//     slug: string;
//     thumbnail: {
//       url: string;
//     };
//     pdf: {
//       url: string;
//     };
//   };
// }

export default function IssuePreview({issue}: {issue:Issue}) {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  if (!issue) {
    return null;
  }

  return (
    <Link href={issue.pdf.url} target="_blank">
      <div className="inline-block overflow-hidden h-[30rem] min-h-[4vh] relative border-y-0 min-w-full">
        <Image
          src={issue.thumbnail.url}
          alt={`Thumbnail for ${issue.publishDate}`}
          fill
          style={{ objectFit: "cover", objectPosition: "top" }}
          className=""
        />
        <div
          className={
            "bg-[#ffffffa0] bottom-3 right-5 text-right absolute pr-3 pt-1 text-xl grid grid-cols-10" +
            (windowSize.width < 768 ? "" : " pl-5")
          }
        >
          <span className="inline-block col-span-7 m-0">
            ISSUE #
            <br />
            <p className="text-sm mb-2 overflow-visible max-h-5">
              {new Date(issue.publishDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: windowSize.width < 768 ? "short" : "long",
                day: "numeric",
              })}
            </p>
          </span>
          <span className="inline-block ml-1 col-span-3 min-h-full text-5xl m-0 align-text-top font-serif">
            {String(issue.slug).slice(3, 5)}
          </span>
        </div>
      </div>
    </Link>
  );
}

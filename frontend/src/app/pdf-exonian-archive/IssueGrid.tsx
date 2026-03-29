"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getIssues } from "@/actions/getIssues";
import { Issue } from "../../../types/APIResponse";
import IssuePreview from "@/components/IssuePreview";

function numberEnding(num: number) {
  if (num > 3 && num < 21) return "th"; // Handle special case for 11th, 12th, 13th, etc.
  switch (num % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export default function IssuesGrid({ issues }: { issues: Issue[] }) {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Groups issues by board e.g.: {1: [issue1, issue2], 2: [issue3, issue4]}
  const groupedIssues = issues.reduce((acc, issue) => {
    const { board } = issue;
    if (!acc[board]) {
      acc[board] = [];
    }
    acc[board].push(issue);
    return acc;
  }, {} as Record<number, Issue[]>);

  Object.keys(groupedIssues).forEach(board => {
    groupedIssues[Number(board)].sort((a, b) => {
      const issueNumberA = parseInt(String(a.slug).slice(3));
      const issueNumberB = parseInt(String(b.slug).slice(3));
      return issueNumberB - issueNumberA; // Sort in descending order (newest issues first)
    });
  });

  return (
    <div className="w-full">
      {Object.keys(groupedIssues)
        .sort((a, b) => Number(b) - Number(a))
        .map((board: string) => (
          <div key={board} className="font-serif pt-3">
            <h4 className="text-2xl font-bold">
              {`The ${board}${numberEnding(Number(board))} Exonian Board`}
            </h4>

            <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 py-5">
              {groupedIssues[Number(board)].map((issue, index) => (
                <Link
                  key={index}
                  href={issue.pdf.url}
                  target="_blank"
                  className="group relative block h-[30rem] overflow-hidden"
                >
                  {/* Thumbnail Image */}
                  <div className="relative h-[400px] w-full overflow-hidden">
                    <Image
                      src={issue.thumbnail.url}
                      alt={`Thumbnail for ${issue.publishDate}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: "cover", objectPosition: "top" }}
                      className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                  </div>

                  {/* Progressive Blur Layer: Placed INSIDE the image container and BELOW the text */}
                  {/* 1. The Blur Element: Uses mask to fade the backdrop-blur */}
                  <div
                    className="absolute inset-x-0 bottom-0 z-10 h-1/3 pointer-events-none backdrop-blur-[30px]"
                    style={{
                      mask: "linear-gradient(to top, black, black, transparent)",
                      WebkitMask: "linear-gradient(to top, black, black, transparent)"
                    }}
                  />

                  {/* 2. The Contrast Element: Separate gradient for text legibility */}
                  <div className="absolute inset-x-0 bottom-0 z-10 h-1/3 pointer-events-none bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  {/* Info Overlay: Higher z-index to stay sharp */}
                  <div className="absolute w-[10rem] sm:w-[7rem] bottom-2 right-3 mr-3 z-10 grid grid-cols-10 p-3 text-white">
                    <div className="col-span-7">
                      <span className="block text-xl font-bold">ISSUE #</span>
                      <p className="text-sm">
                        {new Date(issue.publishDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <span className="col-span-3 ml-2 font-serif text-5xl leading-none">
                      {String(issue.slug).slice(3, 5)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}  
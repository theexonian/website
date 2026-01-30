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
    <>
      <div className="w-full">
        {Object.keys(groupedIssues)
          .sort((a, b) => Number(b) - Number(a)) // Sort boards in descending order (newest first)
          .map((board: string) => (
          <div key={board} className="font-serif pt-3">
            <h4 className="text-2xl">
              <strong>
                {`The ${board}${numberEnding(Number(board))} Exonian Board`}
              </strong>
            </h4>
            <div className="grid grid-cols-4 sm:grid-cols-2 md-lg:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 py-5 gap-3">
              {groupedIssues[Number(board)].map((issue, index) => (
                <span key={index}>
                  <Link href={issue.pdf.url} target="_blank">
                    <div className="inline-block overflow-hidden h-[30rem] min-h-[4vh] relative border-y-0 w-full">
                      <Image
                        src={issue.thumbnail.url}
                        alt={`Thumbnail for ${issue.publishDate}`}
                        fill
                        style={{ objectFit: "cover", objectPosition: "top" }}
                        className="transition-transform duration-300 ease-in-out hover:scale-[103%]"
                      />
                      <div
                        className={
                          "bg-black opacity-85 text-white bottom-3 right-5 text-right absolute pr-4 pt-1 text-xl grid grid-cols-12 w-[11.5rem]"
                        }
                      >
                        <span className="inline-block col-span-7 m-0 ml-1">
                          ISSUE #
                          <br />
                          <span className="text-sm mb-2 overflow-visible max-h-5 block">
                            {new Date(issue.publishDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </span>
                        <span className="inline-block col-span-1 m-0 text-5xl"></span>
                        <span className="inline-block col-span-3 min-h-full text-5xl m-0 align-text-top font-serif mr-2">
                          {String(issue.slug).slice(3, 5)}
                        </span>
                      </div>
                    </div>
                  </Link>
                </span>
              ))}{" "}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

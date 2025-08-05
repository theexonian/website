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

  // Debug logging
  console.log('Total issues received:', issues.length);
  console.log('Issues for board 146:', issues.filter(issue => issue.board === 146));
  console.log('All board numbers:', Array.from(new Set(issues.map(issue => issue.board))).sort((a, b) => b - a));

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
      <div className="">
        {Object.keys(groupedIssues)
          .sort((a, b) => Number(b) - Number(a)) // Sort boards in descending order (newest first)
          .map((board: string) => (
          <div key={board} className="font-serif pt-3">
            <h4 className="text-2xl">
              <strong>
                {`The ${board}${numberEnding(Number(board))} Exonian Board`}
              </strong>
            </h4>
            <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 py-5">
              {groupedIssues[Number(board)].map((issue, index) => (
                <p key={index}>
                  <Link href={issue.pdf.url} target="_blank">
                    <div className="inline-block overflow-hidden h-[30rem] min-h-[4vh] relative border-y-0 min-w-full">
                      <Image
                        src={issue.thumbnail.url}
                        alt={`Thumbnail for ${issue.publishDate}`}
                        fill
                        style={{ objectFit: "cover", objectPosition: "top" }}
                        className="transition-transform duration-300 ease-in-out hover:scale-[103%]"
                      />
                      <div
                        className={
                          "bg-black bg-opacity-60 text-white bottom-3 right-5 text-right absolute pr-3 pt-1 text-xl grid grid-cols-10" +
                          (windowSize.width < 768 ? "" : " pl-5")
                        }
                      >
                        <span className="inline-block col-span-7 m-0">
                          ISSUE #
                          <br />
                          <p className="text-sm mb-2 overflow-visible max-h-5">
                            {new Date(issue.publishDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month:
                                  windowSize.width < 768 ? "short" : "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </span>
                        <span className="inline-block ml-1 col-span-3 min-h-full text-5xl m-0 align-text-top font-serif">
                          {String(issue.slug).slice(3, 5)}
                        </span>
                      </div>
                    </div>
                  </Link>
                </p>
              ))}{" "}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

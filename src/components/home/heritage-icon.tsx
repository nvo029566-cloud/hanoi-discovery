import type { ReactNode } from "react";

type HeritageIconKind = "history" | "old-quarter" | "heritage-land" | "cuisine";

const drawings: Record<HeritageIconKind, ReactNode> = {
  history: (
    <>
      <path d="M65 43Q54 42 51 33Q61 41 71 34L73 24H114L116 34Q128 41 137 33Q134 43 122 43Z" />
      <path d="m85 24 8-11 8 11M68 44v12m52-12v12M74 56h40M44 55q12 10 26 0h49q14 10 25 0-1 13-15 15H59Q45 68 44 55Z" />
      <path d="M59 70v27m71-27v27M70 70v27m49-27v27M80 97V83a14 14 0 0 1 28 0v14M67 74h56" />
      <path d="M25 94v17h139V94m-139 4h139M25 111v69m139-69v69M52 111v16m84-16v16" />
      <path d="M39 180v-36h23v36m-20-18v-7a9 9 0 0 1 18 0v7m68 18v-36h23v36m-21-18v-7a9 9 0 0 1 18 0v7m-74 25v-36h40v36" />
      <path d="M17 188v-3a5 5 0 0 1 5-5h145a5 5 0 0 1 5 5v3M12 188h166a9 9 0 0 1 9 9v17H3v-17a9 9 0 0 1 9-9Zm119 0v12q0 9-12 14" />
    </>
  ),
  "old-quarter": (
    <>
      <path d="M43 53 55 22h76l10 31M51 24q-6-9-2-11 4-2 7 9m75 0q4-10 8-9 4 2-3 12M40 53h105v13H40Zm14 13v61m77-61v61M61 95h62m-64 23h66M19 53h22m103 0h24M14 53l-9 28h35m132-28 9 28h-36M8 81v113m170-113v113M14 85h26m107 0h25" />
      <path d="M42 81h12m77 0h14M19 95h22m106 0h24M19 96v35m22-35v35m106-35v35m24-35v35M13 131h36m90 0h36M19 138h21v31H19zm128 0h24v31h-24zM24 141v13m6-13v13m6-13v13m116-13v13m7-13v13m7-13v13" />
      <path d="m52 116-8 24h97l-8-24M45 140v59m97-59v59M44 148h97m-83-5v56m18-56v56m33-56v56m20-56v56m-109-23h20m107 0h24M23 178v21m15-21v21m109-21v21m17-21v21M7 199h172v9H7Zm-5 9h183v7H2Z" />
    </>
  ),
  "heritage-land": (
    <>
      <path d="M39 46q-12-1-15-12 5 6 13 1 8-5 11-18h87q3 13 11 18 8 5 13-1-3 11-15 12Zm9-29q-14-7-8-12 5-5 10 4 5 8 13 8m62 0q8 0 13-8 5-9 10-4 6 5-8 12M89 17q-6-8 1-10l3-6 4 6q7 2 1 10" />
      <path d="M33 48q-10 14-19 11-4-2-6-7-5 13 14 19h143q19-6 14-19-2 5-6 7-9 3-19-11M34 59h119M49 71v39m13-39v39m63-39v39m13-39v39" />
      <circle cx="93" cy="89" r="16" />
      <path d="M43 108h101v13H43Zm8 13v51m17-51v51m50-51v51m17-51v51M45 168h96q13 0 19 9H26q6-9 19-9Zm-20 9-17 14h169l-17-14M8 191v24h24v-9q3-9 14-3 18 9 32 4 8-3 15 0 8 3 15 0 14 5 32-4 11-6 14 3v9h23v-24" />
    </>
  ),
  cuisine: (
    <>
      <path d="M67 111c-14-25 22-32 9-52-5-7-10-10-10-18M96 113c-19-28 24-38 14-64-6-14-19-23-15-37 2-7 7-12 13-16M129 104c-14-22 16-32 7-52-3-6-6-9-7-15" />
      <ellipse cx="96" cy="136" rx="75" ry="11" />
      <path d="M21 136c4 42 33 67 75 67s71-25 75-67M65 198v9c0 5 14 8 31 8s31-3 31-8v-9" />
    </>
  ),
};

export function HeritageIcon({ kind }: { kind: HeritageIconKind }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="-11 -15 210 240"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="heritage-icon"
    >
      {drawings[kind]}
    </svg>
  );
}

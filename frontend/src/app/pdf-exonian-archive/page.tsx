import FancyBigTitle from '@/components/FancyBigTitle';
import Link from 'next/link';
import { getIssues } from '@/actions/getIssues';
import IssuesGrid from './IssueGrid';           // ↓ the client child

export default async function PdfArchivePage() {
  const issues = await getIssues();              // runs on the server
  return (
    <>
      <FancyBigTitle title="PDF Exonian Archives" />
      <p>
        Please click on any of the issues below to see the full issue. As the website is currently in testing, we don't have all the issues here. Please View older issues at&nbsp;
        <Link href="https://archive.theexonian.com">archive.theexonian.com</Link>.
      </p>

      {/* interactive grid */}
      <IssuesGrid issues={issues} />
    </>
  );
}

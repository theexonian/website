import FancyBigTitle from '@/components/FancyBigTitle';
import Link from 'next/link';
import { getIssues } from '@/actions/getIssues';
import IssuesGrid from './IssueGrid';           // ↓ the client child

export default async function PdfArchivePage() {
  const issues = await getIssues();              // runs on the server
  return (
    <>
      <div className="w-full max-w-[80rem] mx-auto p-6">
        <FancyBigTitle title="PDF Exonian Archives" />
        <p>
          Click on a recent issue below to access the full PDF. Older issues are available at&nbsp;
          <Link href="https://archive.theexonian.com">archive.theexonian.com</Link>.
        </p>

        {/* interactive grid */}
        <IssuesGrid issues={issues} />
      </div>
    </>
  );
}

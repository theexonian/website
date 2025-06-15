import { getAuthorBySlug } from '@/actions/getAuthorBySlug';
import PreviewNoImage from '@/components/PreviewNoImage';
import Image from 'next/image';
import { MdOutlineEmail } from 'react-icons/md';
import * as Constants from "@/components/Constants"
import Link from "next/link";

export default async function Page({ params }: { params: { slug: string } }) {
	const author = await getAuthorBySlug(params.slug);

	return (
    <>
      <div className="w-full flex justify-center py-8">
        {author.picture ? (
          <Image
            src={
              author.picture.url.startsWith("http")
                ? author.picture.url
                : `http://${Constants.STRAPI_IP}:1337${author.picture.url}`
            }
            alt={author.fullname}
            height={96}
            width={96}
            className="rounded-full w-24 h-24 object-cover"
          />
        ) : (
          <Image
            src={"/Small.png"}
            alt="Missing Image"
            height={96}
            width={96}
          />
        )}
      </div>
      <div className="w-full flex justify-center font-serif text-4xl">
        <h1>{author.fullname}</h1>
      </div>
      {/* <div className="w-full flex justify-center font-sans text-md items-center text-neutral-600 font-light">
				<p>{author.position}</p>
				<div className="p-2 font-xl">
					<Link href={'mailto:' + author.email}>
						<MdOutlineEmail />
					</Link>
				</div>
			</div> */}
      <div className="w-full flex justify-center font-serif text-neutral-500 font-thin">
        <div className="w-1/2 md:w-2/3 text-center text-sm md:text-xs">
          <p>{author.description}</p>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center font-serif py-10">
        <hr className="border-black w-full" />
        <h1 className="text-2xl pt-3 font-semibold">Latest Articles</h1>
        {author.articles.map((article) => (
          <PreviewNoImage
            key={article.slug}
            title={article.title}
            description={article.description}
            tag={article.tag}
            slug={article.slug}
            publishedAt={article.publishedAt}
          />
        ))}
      </div>
    </>
  );
}

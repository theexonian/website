import Image from "next/image";
import { IoShareSocialOutline } from "react-icons/io5";
import { BiFontFamily, BiPrinter } from "react-icons/bi";
import { HiOutlineNewspaper } from "react-icons/hi";

export default function Page() {
	return (
		<div className="w-full flex justify-center">
			<article className="prose md:prose-sm pt-8 font-serif prose-figcaption:font-sans prose-p:indent-8">
				<h3 className="font-bold text-3xl bg-gradient-to-r from-[#B40A0A] to-[#f71e1e] inline-block text-transparent bg-clip-text m-0">
					Life
				</h3>
				<h1>
					Academy Hosts 2023-2024 George Bennett Fellow: Emma Zimmerman
				</h1>
				<span className="p-0 m-0">
					By:
					<a
						className="hover:text-red-500 duration-200 font-bold no-underline"
						href="/writers"
					>
						{" "}
						AMY LIN
					</a>
					,
					<a
						className="hover:text-red-500 duration-200 font-bold no-underline"
						href="/writers"
					>
						{" "}
						MAX MANTEL
					</a>
					, and
					<a
						className="hover:text-red-500 duration-200 font-bold no-underline"
						href="/writers"
					>
						{" "}
						ROXANE PARK
					</a>
				</span>
				<br />
				<span className="p-0 m-0">Published: Dec. 17, 2023 at 5:30 am ET</span>
				<div className="flex flex-row gap-5">
					<div className="flex items-center gap-2 text-red-700">
						<IoShareSocialOutline className="text-xl" /> Share
					</div>
					<div className="flex items-center gap-2 text-red-700">
						<BiFontFamily className="text-xl" /> Font
					</div>
					<div className="flex items-center gap-2 text-red-700">
						<HiOutlineNewspaper className="text-xl" /> Publication
					</div>
					<div className="flex items-center gap-2 text-red-700">
						<BiPrinter className="text-xl" /> Print
					</div>
				</div>
				<hr className="border-neutral-400"/>
				<figure>
					<Image
						src={"/Article.png"}
						width="0"
						height="0"
						sizes="25vw"
						className="w-full h-auto"
						alt={"Logo of The Exonian"}
					/>
					<figcaption>
						Emma Zimmerman poses for a photo, Courtesy of Grounded
						Podcast
					</figcaption>
				</figure>
				<p>“This essay is called Impermanence.”</p>
				<p>
					The Assembly Hall fell silent enough to hear the drop of a pin,
					students and teachers alike eager to immerse themselves in the
					speaker’s story. The tale that would follow was a captivating
					account of her experience with Long COVID that weaves her
					relationship with her grandmother, mortality, and mariposa into
					a striking comparison between illness and age.
				</p>
				<p>
					This speaker, who possesses such an impressive command of
					anaphora and allegory, poetic syntax, and her own unique voice,
					is Emma Zimmerman: writer, journalist, and the 2023 recipient of
					the Academy’s George Bennett Fellowship.
				</p>
				<p>
					The George Bennett Fellowship, endowed by alumnus Elias B. M.
					Kulukundis ‘55, is presented to a promising, unpublished author
					and provides them with a one-year opportunity to live in Exeter
					as the Writer in Residence. According to the official
					description, “the purpose of the George Bennett Fellowship is to
					provide time and freedom from material considerations to a
					person seriously contemplating or pursuing a career as a
					writer.” Having been launched in 1968, past recipients include
					Debra Allbery, A. Manette Ansay, Gina Apostol, Vasugi
					Ganeshananthan, and Ilya Kaminsky.
				</p>
				<p>
					When asked about her passion for writing, Zimmerman expressed
					her opinion on the strength of writing. “When I found creative
					nonfiction in college, I discovered such power in looking at the
					complex world, and then translating all these complex emotions
					to the page in a way that’s compelling to a reader,” she shared.
					“I think that when you’re writing, it forces your brain to slow
					down and put different pieces together. Writing — not only
					words, but rhythms and descriptions, and the way you sew those
					words together – is a powerful mechanism of expression.”{" "}
				</p>
				<p>
					Zimmerman explained how she selected Exeter and the fellowship
					as a space for her to work on her craft. “I was looking for
					different fellowships and teaching opportunities after
					graduating [with an MFA from NYU], and Exeter was one that was
					on my radar,” she explained. “It kept popping up in searches and
					it seemed like a very dreamy opportunity to have the chance to
					write. At the time I was working on my master’s thesis and
					hoping to turn it into a book,”
				</p>
				<p>
					To Zimmerman, the opportunity presented by the fellowship was
					obvious: “It is every writer’s dream to have a year to just
					write a book.”{" "}
				</p>
				<p>
					The unique environment and community of Exeter have been a
					crucial part in helping Zimmerman’s process thus far. “The
					students are so friendly and intelligent,” she said. “I’m
					impressed by the students of course, but also by the faculty—how
					much they do, how engaged they are in their teaching, and what
					different experiences they bring to the classroom. It’s
					definitely a special place. This environment has been lovely,
					and so has the access to trails here. I think the flexibility of
					this fellowship has been an incredible asset to my work.”
				</p>
				<p>
					In addition to her personal creative writing, Zimmerman has
					served as a journalist exploring the intersection between social
					justice and sports, in particular women’s trail running,
					regularly printing pieces in publications like Trail Runner,
					Outside, Women’s Running, Tracksmith Journal, Runner’s World,
					and Taproot Magazine.
				</p>
				<p>
					Unsurprisingly, many students were stunned by Zimmerman’s
					reading of Impermanence.“What I remember from Ms. Zimmerman’s
					assembly is her imagery and poetic writing style,” said senior
					and co-head of the on-campus literary magazine Pendulum Hope
					Gantt. “I appreciated her presentation because her voice and
					intonation made the piece engaging.”
				</p>
				<p>
					As a writer herself, Gantt hopes to take advantage of
					Zimmerman’s office hours from 9:50 to 10:40 a.m. every Thursday
					at her office in the library. “Especially during senior season,
					when I’m writing a lot of personal essays, it’s valuable to get
					another perspective,” she said. “The goal of any essay is to
					communicate, so you want anyone who reads it, no matter their
					background or prior knowledge about you, to be able to
					understand more about who you are.”
				</p>
				<p>
					Likewise, faculty have been impressed and excited about
					Zimmerman’s presence on campus. “I love her energy,” Instructor
					in English Katie Brule said. She has been able to form a close
					relationship with Zimmerman as fellow young faculty members,
					dog-lovers, and runners. “I think that kind of energy can have a
					positive impact on students in general. She’s so curious, which
					feels like an important word and mindset for our campus this
					year, and that curiosity spreads. Regarding her writing, I think
					her consideration of how we interact with the outdoors feels
					important in getting our community to look more closely at the
					spaces we’re in.”
				</p>
				<p>
					“I think it’s really cool and rare for a high school to have a
					program like this, where a wonderful visiting writer early in
					their career comes and is in residence. It’s a gift for the
					writer to be able to have that time, but it’s also, I think, a
					gift for the community. It’s very special to have her presence
					on campus, and I think it’s neat to have a creative nonfiction
					writer as well, because we haven’t in the last couple of years,
					and given that so much of our English curriculum is rooted in
					creative nonfiction,” Instructor in English Chelsea Woodard
					continued, “She mentioned that she had several students come to
					her office hours to read everything from college essays to
					pieces that they were working on personally. So, I think it’s
					really positive that students are already seeking her out. She’s
					very friendly and approachable. I think that she has already had
					a positive impact on the community, and that she will continue
					to do that.”
				</p>
				<p>
					“I hope that she gets to bring what feels authentic for her to
					bring to the community. I think it’s different for each Bennett
					fellow. I hope for her as a writer that the time is
					fruitful––it’s such a gift to have a year to write without other
					obligations and to have access to students, colleagues, books,
					and space. So, I hope it’s a creatively productive time for
					her,” Woodard added.{" "}
				</p>
				<p>
					“It was the strength of her manuscript. The topic and her
					approach were compelling,” Woodard, an instructor on the
					selection committee for fellowship, reflected on what stood out
					to her from Zimmerman’s application.{" "}
				</p>
				<p>
					As a writer experienced in storytelling, Zimmerman is eager to
					share her insights and advice on the art of creative writing and
					the many genres she has mastered: fiction, creative nonfiction,
					and journalism.{" "}
				</p>
				<p>
					“Don’t get too bogged down by where you’re going with writing or
					what exactly you’re writing about. If there’s something that you
					feel [is] important to write about, or even if it’s not
					important [but] you’re drawn to it, go with it. Explore
					different forms of writing. I think many writers give this line
					of advice to younger writers, but if you have a story that you
					want to tell, just write it. Get it on paper. Try as hard as you
					can to not get too wrapped up in the little details of writing,”
					she advised.{" "}
				</p>
				<p>
					Reflecting upon the impact she intends to leave on the students
					at the Academy, Zimmerman said, “I hope to continue having
					conversations with students about creative nonfiction and the
					power that they might be able to find in it, and I hope to
					continue learning from all the students here, because whenever I
					have a conversation with students, I’m really impressed by
					everything they’re thinking about in their own work and lives
					and how engaged they are with the outside world. I very much
					feel like there’s a give and take and I’m getting a lot from the
					students here, but I do hope to give back to them as well.”
				</p>
				<p>
					More specifically, she elaborated on the ways that she would
					like to accomplish this during the remainder of her time at the
					Academy. “I don’t pretend to believe that I have anything extra
					special to give to you students,” Zimmerman said. “You all have
					so many gifts of your own and you’re all such talented people.
					But I do hope that I can help some people view their writing in
					different ways [and] find the power that lies in their own
					stories, or in the stories that obsess them.”{" "}
				</p>
			</article>
		</div>
	);
}

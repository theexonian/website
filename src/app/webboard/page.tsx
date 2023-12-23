import Image from "next/image";
import PreviewSeniorOfTheWeek from "@/components/PreviewSeniorOfTheWeek";
import PreviewNoDesc from "@/components/PreviewNoDesc";
import PreviewWithDesc from "@/components/PreviewWithDesc";
import PreviewCenter from "@/components/PreviewCenter";
import Preview from "@/components/Preview";
import RowPreview from "@/components/RowPreview";
import FancyBigTitle from "@/components/FancyBigTitle";

export default function Page() {
	return (
		<>
			<div className="font-serif pt-5">
				<h1 className="text-7xl font-semibold -my-2">Exonian Web Boards</h1>
				<h1>
                    <i>15 boards and counting.</i>
				</h1>
				<hr className="w-1/3 border-black" />
			</div>
			<FancyBigTitle title="Exonian Web Boards" lowerText="15 boards and counting."/>
			<div className="prose font-serif pl-16">
				<div>
					<h2>The 15th Exonian Web Board</h2>
					<h3>Chief Digital Editors</h3>
					<p>Byran Huang '25</p>
					<p>Eric Li '25</p>
					<h3>Technical Director</h3>
					<p>Davido Zhang '25</p>
					<h3>Head Section Editor and Designers</h3>
					<p>Emily Chai-Onn '25</p>
					<p>Freddie Chang '25</p>
					<h3>Section Editor</h3>
					<p>Sophie Yu '26</p>
				</div>
				<div>
					<hr className="border-neutral-600" />
				</div>
				<div>
					<h2>The 14th Exonian Web Board</h2>
					<h3>Chief Digital Editor</h3>
					<p>Catherine Wu ‘24</p>
					<h3>Technical Directors</h3>
					<p>Byran Huang ‘25</p>
					<p>Eric Li ‘25</p>
					<h3>Head Developer and Designer</h3>
					<p>Ugo Barrah ‘24</p>
					<h3>Head Section Editor</h3>
					<p>Chengyue Zhang ‘24</p>
					<h3>Section Editors</h3>
					<p>Emily Chai-Onn ‘25</p>
					<p>Freddie Chang ‘25</p>
					<p>Gunn Sukhum ‘24</p>
					<p>Mitchell Tam ‘24</p>
					<p>Alaysha Zhang ‘24</p>
					<p>Davido Zhang ‘25</p>
				</div>
				<div>
					<hr className="border-neutral-600" />
				</div>
				<div>
					<div>
						<h2>The 13th Exonian Web Board</h2>
						<h3>Chief Digital Editor</h3>
						<p>Tony Cai ’23</p>
						<h3>Head Directors of Technology</h3>
						<p>Byran Huang ‘25</p>
						<p>Chaney Hollis ‘23</p>
						<h3>Developers</h3>
						<p>Ugo Barrah ‘24</p>
						<p>Eric Li ‘25</p>
						<h3>Head Section Editors</h3>
						<p>Jack Fallon ‘23</p>
						<p>Franklin Chow ‘23</p>
						<h3>Head Designer</h3>
						<p>Max Chuang ‘23</p>
						<h3>Head Artistic Director</h3>
						<p>Ava Zhao ‘24</p>
						<h3>Digital Artist</h3>
						<p>Hannah Park ‘24</p>
					</div>
				</div>
				<div>
					<hr className="border-neutral-600" />
				</div>
				<div>
					<div>
						<h2>The 12th Exonian Web Board</h2>
						<h3>Chief Digital Editor</h3>
						<p>Sabrina Kearney ’22</p>
						<h3>Head Section Editors</h3>
						<p>Chieko Imamura ‘22</p>
						<p>Anna Tran ‘22</p>
						<h3>Technical Director</h3>
						<p>Tony Cai ‘23</p>
						<h3>Head Videographer</h3>
						<p>Maegan Paul ‘21</p>
						<h3>Developers</h3>
						<p>Riley Jones ‘23</p>
						<p>Trevor Piltch ‘23</p>
						<p>Achyuta Rajaram ‘24</p>
						<p>Griffin Li ‘24</p>
					</div>
				</div>
				<div>
					<hr className="border-neutral-600" />
				</div>
				<div>
					<div>
						<h2>The 11th Exonian Web Board</h2>
						<h3>Chief Digital Editor</h3>
						<p>Maegan Paul ‘21</p>
						<h3>Technical Director</h3>
						<p>Rachael Kim ‘21</p>
						<h3>Head Designer</h3>
						<p>Daniel Zhang ‘22</p>
						<h3>Head Artistic Director</h3>
						<p>Sabrina Kearney ‘22</p>
					</div>
				</div>
				<div>
					<hr className="border-neutral-600" />
				</div>
				<div>
					<div>
						<h2>The 10th Exonian Web Board</h2>
						<h3>Chief Digital Editors</h3>
						Joy Liu ‘20
						<br />
						Kelly Mi ‘20
						<h3>Head Section Editor</h3>
						<p>Jeffrey Cheng ‘20</p>
						<h3>Section Editor</h3>
						Maegan Paul ‘21
						<br />
						David Kim ‘20
						<br />
						Arman Tang ‘20
						<h3>Photo Editor</h3>
						<p>Jeffrey Cheng ‘20</p>
						<h3>Technical Director</h3>
						<p>Penny Brant ‘20</p>
						<h3>Developer</h3>
						<p>Maegan Paul ‘21</p>
						<h3>Videographer</h3>
						<p>Mouhamed Gaye ‘20</p>
					</div>
				</div>
				<div>
					<hr className="border-neutral-600" />
				</div>
				<div>
					<div>
						<h2>The 9th Exonian Web Board</h2>
						<h3>Chief Digital Editor</h3>
						<p>Jenny Yang '19</p>
						<h3>Head Section Editor</h3>
						<p>Ava Harrington '19</p>
						<h3>Senior Section Editor</h3>
						<p>Lauren Leatham '19</p>
						<h3>Section Editors</h3>
						<p>Arman Tang '20</p>
						<p>Jaq Lai '21</p>
						<h3>Head Photo Editor</h3>
						<p>Andrew Liquigan '19</p>
						<h3>Photo Editors</h3>
						<p>Elizabeth Griffin '21</p>
						<h3>Technical Director</h3>
						<p>Pavan Garidipuri '19</p>
						<h3>Developer</h3>
						<p>Jin Hong '19</p>
						<h3>Head Social Media Editor</h3>
						<p>Niko Amber '19</p>
						<h3>Head&nbsp;Videographer</h3>
						<br />
						Kelly Mi '20
					</div>
				</div>
				<div>
					<hr className="border-neutral-600" />
				</div>
				<div>
					<div>
						<h2>The 8th Exonian Web Board</h2>
						<h3>Chief Digital Editor</h3>
						<br />
						Stuart Rucker ‘18
						<h3>Technical Director</h3>
						<br />
						Carson Fleming ‘18
						<h3>Head&nbsp;Section Editor</h3>
						<br />
						Jenny Yang ‘19
						<h3>Senior Section Editors</h3>
						<br />
						Jared Zhang ‘19
						<br />
						Gabriel Laniewski ‘18
						<h3>Section Editors</h3>
						<br />
						Ava Harrington ‘18
						<br />
						Lauren Leatham ‘19
						<br />
						Catherine Griffin ‘19
						<h3>Head Photo Editor</h3>
						<br />
						Andrew Liquigan ‘19
						<h3>Photo Editors</h3>
						<br />
						Ava Harrington ‘19
						<br />
						Catherine Griffin ‘19
						<h3>Graphic Designers</h3>
						<br />
						Niko Amber ‘19
						<br />
						Gabirel Laniewski ‘18
						<h3>Head&nbsp;Videographer</h3>
						<br />
						Lucas Schroeder ‘18
						<h3>Head Social Media Editor</h3>
						<br />
						Lucas Schroeder ‘18
						<h3>Social Media Editors</h3>
						<br />
						Niko Amber ‘19
						<br />
						Lauren Leatham ‘19
					</div>
				</div>
				<div>
					<hr className="border-neutral-600" />
				</div>
				<div>
					<div>
						<h2>The 7th Exonian Web Board</h2>
						<h3>Chief Digital Editor</h3>
						<br />
						Brandon Liu '17
						<h3>Head&nbsp;Section Editor</h3>
						<br />
						Geyang Qin '17
						<h3>Section Editors</h3>
						<br />
						Grant Goodwin '18
						<br />
						Andrew Liquigan '19
						<br />
						Jenny Yang '19
						<h3>Head Photo Editor</h3>
						<br />
						Jessica Zhao '17
						<h3>Visual Director</h3>
						<br />
						Steven Kim '17
						<h3>Head&nbsp;Videographer</h3>
						<br />
						Lucas Schroeder '18
						<h3>Technical Director</h3>
						<br />
						Stuart Rucker '18
						<h3>Developers</h3>
						<br />
						Lucas Webb ’17
						<br />
						Raj Das '19
						<br />
						Jacob Zimmerman '19
					</div>
				</div>
				<div>
					<hr className="border-neutral-600" />
				</div>
				<div>
					<div>
						<h2>The 6th Exonian Web Board</h2>
						<h3>Head of Web Board</h3>
						<br />
						Cesar Zamudio ’16
						<h3>Head Section Editors</h3>
						<br />
						Meghan Chou ’17
						<h3>Section Editors</h3>
						<br />
						Geyang Qin ’17
						<br />
						Lucas Webb ’17
						<br />
						Michelle Lee ‘17
						<br />
						Brandon Liu ’17
						<h3>Head Photo Editor</h3>
						<br />
						Julia Jackson
						<h3>Visual Director</h3>
						<br />
						Michelle Lee ‘17
						<h3>Technical Director</h3>
						<br />
						Brandon Liu '17
						<h3>Developers</h3>
						<br />
						ByungJun "Steven" Kim '17
						<br />
						Lucas Webb '17
						<br />
						Stuart Rucker '18
					</div>
				</div>
				<div>
					<hr className="border-neutral-600" />
				</div>
				<div>
					<div>
						<h2>The 5th Exonian Web Board</h2>
						<h3>Head of Web Board</h3>
						<br />
						Brandon Wang ’15
						<h3>Head Section Editor</h3>
						<br />
						Connor Glendon ’15
						<br />
						<h3>Senior Section Editors</h3>
						<br />
						Mark Oet ’15
						<br />
						Austin Lowell ’15
						<br />
						Michael Baldyga ’15
						<br />
						Cesar Zamudio ’16
						<h3>Head Photo Editor</h3>
						<br />
						Connor Bloom ’15
						<h3>Senior Photo Editors</h3>
						<br />
						Amanda Zhou ’15
						<br />
						Jessica Zhao ’16
						<h3>Visual Director</h3>
						<br />
						Alex Weitzman ’15
						<h3>Head Videographer</h3>
						<br />
						Dana Tung ’15
						<h3>Senior Videographers</h3>
						<br />
						Luis Dominguez ’15
						<br />
						Daniel Hahn ’17
						<br />
						Antonio Gomez ’16
						<h3>Senior Developers</h3>
						<br />
						Duncan Nyland ’15
						<br />
						Frank Fan ’16
						<br />
						Tyler Hou ’17
					</div>
				</div>
				<div>
					<hr className="border-neutral-600" />
				</div>
				<div>
					<div>
						<h2>The 4th&nbsp; Exonian Web Board&nbsp;</h2>
						<h3>Web Editor</h3>
						<p>Tyler Weitzman '14</p>
						<h3>Technical Director</h3>
						<p>Brandon Wang '15</p>
						<h3>Directors of Operations</h3>
						Joon Kang '14
						<br />
						Lexi Pae '14
						<h3>Visual Editor</h3>
						<p>Alex Weitzman '15</p>
						<h3>Head Photo Editor</h3>
						<p>Asile Patin '14</p>
						<h3>Head Videographer</h3>
						<p>Thomas Clark '14</p>
						<h3>Head Graphic Artist</h3>
						<p>Ashley Keem '14</p>
						<h3>Section Editors</h3>
						Connor Glendon '15
						<br />
						Phillip Wu '13
						<h3>Photo Editor</h3>
						Amanda Zhou '15
						<br />
						Connor Bloom '15
						<h3>Videographer</h3>
						<p>Dana Tung '15</p>
					</div>
				</div>
				<div>
					<hr className="border-neutral-600" />
				</div>
				<div>
					<div>
						<h2>The 3rd&nbsp; Exonian Web Board</h2>
						<h3>Web Editor</h3>
						<p>Siddharth Reddy '13</p>
						<h3>Director of Operations</h3>
						Tiffany Tuedor '13
						<br />
						David Xue '13
						<h3>Technical Director</h3>
						<p>Tyler Weitzman '14</p>
						<h3>Head Photo Editor</h3>
						<p>Lexi Pae '14</p>
						<h3>Head Videographer</h3>
						<p>Rachel Armstrong '13</p>
						<h3>Head Graphic Artist</h3>
						<p>Ruby Feng '13</p>
						<h3>Section Editors</h3>
						Connor Glendon '15
						<br />
						Phillip Wu '13
						<br />
						Agnes Zhu '14
						<h3>Photo Editor</h3>
						<p>Joon Kang '14</p>
						<h3>Videographer</h3>
						<p>Thomas Clark '14</p>
					</div>
				</div>
				<div>
					<hr className="border-neutral-600" />
				</div>
				<div>
					<div>
						<h2>The 2nd Exonian Online Board</h2>
						<h3>Web Editor</h3>
						<p>Christine McEvoy</p>
						<h3>Director of Operations</h3>
						<p>JeeHae Kang</p>
						<h3>Section Editors</h3>
						Anna Barr &nbsp;- Opinions
						<br />
						Julia Gnip &nbsp;- Opinions
						<br />
						Charlie Gaillard &nbsp;- Life
						<br />
						Sarah Kaseman &nbsp;- Sports
						<br />
						Isabel Mattson &nbsp;- Sports
						<br />
						Luis Verdi &nbsp;- Sports
						<br />
						Lexi Pae &nbsp;- News
						<br />
						Philip Wu &nbsp;- News
						<br />
						David Xue &nbsp;- Humor
						<h3>Photo Editors</h3>
						Tiffany Tuedor
						<br />
						Katie Kimberling
						<br />
						Suk Joon Kang
						<br />
						Marina Imbriani
						<br />
						Asile Patin
						<h3>Head Videographer</h3>
						<p>Rachel Armh3</p>
						<h3>Videographers</h3>
						Thomas Clark
						<br />
						Brian Gao
						<br />
						Lily George
						<h3>Technical Director</h3>
						<h3> </h3>Sid Reddy
						<h3>Assistant Technical Director</h3>
						<p>Tyler Weitzman</p>
						<h3>Graphic Artists</h3>
						Ruby Feng
						<br />
						Lily George
						<br />
						Emily Moore
						<br />
						Ashley Keem
						<br />
						Agnes Zhu
					</div>
				</div>
				<div>
					<hr className="border-neutral-600" />
				</div>
				<div>
					<div>
						<h2>The 1st Exonian Online Board</h2>
						<h3>Online Chief Editor</h3>
						<p>EuNa Noh</p>
						<h3>Online Chief Business Manager</h3>
						<p>Liz Dethy</p>
						<h3>Online News Editors</h3>
						<p>William V. Ang, Sahng-Ah Yoo</p>
						<h3>Online Opinion Editors</h3>
						<p>Anna S. Barr, Woenho Chung</p>
						<h3>Online Exeter Life Editors</h3>
						<p>Gaillard, Charles D., Mattson, Isabel R.</p>
						<h3>Online Sports Editors</h3>
						<p>McEvoy, Christine M., Kaseman, Sarah C.</p>
						<h3>Online Humor Editor/CLifesaver Editor</h3>
						<p>Ross O. Schlaikjer</p>
						<h3>Online Editorial Associates</h3>
						Cristina Hughes, Katelyn McEvoy, Siddharth G. Reddy,
						Tiffany O. Tuedor
						<h3>Online News Photo Editor</h3>
						<p>Connor C. Bellows</p>
						<h3>Online Opinion/Humor Photo Editor</h3>
						<p>Albert Chu</p>
						<h3>Online Exeter Life Photo Editor</h3>
						<p>James M. Ryan</p>
						<h3>Online Sports Photo Editor</h3>
						<p>Ainsley M. Fahey</p>
						<h3>Online Subscription Managers</h3>
						<p>Virginia Giannini, James M. Ryan</p>
					</div>
				</div>
			</div>
		</>
	);
}

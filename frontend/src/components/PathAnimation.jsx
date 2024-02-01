import { motion, animate } from "framer-motion";

const icon = {
	hidden: {
		opacity: 0,
		pathLength: 0,
		fill: "rgba(0, 0, 0, 0)",
	},
	visible: {
		opacity: 1,
		pathLength: 1,
		fill: "rgba(0, 0, 0, 1)",
	},
};

export default function PathAnimation(props) {
	let animated =
		"animate-[0s_logo_0s_ease-in-out_forwards,0.75s_fade-in_ease-in-out_forwards]";
	let svg_init = "visible";
	if (props.animated === true) {
		animated = "animate-[1s_logo_1s_ease-in-out_forwards]";
		svg_init = "hidden";
	}
	return (
		<motion.div
			className={
				"w-1/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed " +
				animated
			}
			transition={{
				delay: 0.5,
				duration: 0.5,
				ease: [0.4, 0.71, 0.2, 1.01],
			}}
		>
			<motion.svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 782 741"
				className="item"
			>
				<motion.path
					d="M146.77 218.08C143.01 158.47 139.31 99.88 135.51 39.71C177.99 80.93 219.47 121.18 261.61 162.07C284.33 107.92 306.81 54.33 329.61 0C340.42 16.3 350.73 31.82 361 47.36C385.24 84.03 409.51 120.69 433.62 157.45C435.63 160.52 438.02 160.87 441.17 160.87C552.16 160.83 663.15 160.83 774.13 160.83C776.26 160.83 778.38 160.83 781.35 160.83C777.06 171.08 773.14 180.57 769.14 190.04C734.08 272.98 698.59 355.74 664.09 438.92C644.37 486.47 622.16 532.82 599.85 579.15C585.7 608.54 571.59 637.96 557.45 667.36C556.89 668.53 556.23 669.65 555.45 671.11C542.98 666.93 530.7 662.81 518.42 658.68C497.28 651.57 476.17 644.41 455 637.39C453.23 636.8 451.08 636.76 449.23 637.1C409.12 644.48 369.03 651.95 328.93 659.4C310.44 662.84 291.83 665.76 273.48 669.82C252.21 674.53 231.1 680.03 210.02 685.56C141.44 703.52 72.9 721.66 4.35001 739.71C3.25001 740 2.11001 740.09 0.0100098 740.44C2.59001 733.54 4.92001 727.28 7.28001 721.02C22.75 679.89 38.42 638.84 53.63 597.61C61.06 577.48 67.72 557.06 74.54 536.71C75.21 534.71 75.18 532.05 74.46 530.07C56.7 481.27 38.79 432.52 20.92 383.76C19.1 378.79 17.32 373.8 15.31 368.23C44.24 363.41 72.74 358.66 101.96 353.79C84.63 292.69 67.41 231.98 49.83 170.02C82.65 186.29 114.29 201.98 146.78 218.09L146.77 218.08ZM193.45 563.56C194.35 561.74 194.67 560.99 195.07 560.28C232.33 494.9 269.58 429.52 306.85 364.14C333.89 316.7 360.91 269.25 388.07 221.88C389.91 218.66 389.78 216.45 387.74 213.45C379.77 201.76 372.07 189.88 364.25 178.08C357.48 167.87 350.69 157.68 343.37 146.65C324.18 192.37 305.35 237.25 286.27 282.71C262.9 260.06 240.04 237.9 217.19 215.74C216.85 215.93 216.51 216.11 216.17 216.3C218.61 255.09 221.06 293.88 223.56 333.69C202.02 323.01 181.23 312.7 159.42 301.89C169.73 338.31 179.75 373.72 189.89 409.57C162.65 414.1 136.15 418.5 109.36 422.95C109.84 424.4 110.07 425.18 110.35 425.94C119.64 451.25 128.34 476.79 138.43 501.77C145.28 518.72 148.97 535.07 142.4 553C134.21 575.33 126.89 597.99 119.16 620.49C117.09 626.53 114.88 632.53 112.54 639.1C114.02 638.86 114.66 638.8 115.26 638.64C134.58 633.6 153.9 628.54 173.23 623.49C198.83 616.8 224.27 609.37 250.08 603.66C276.88 597.73 304.05 593.52 331.05 588.47C368.35 581.5 405.67 574.68 442.89 567.3C453.23 565.25 462.6 565.95 472.44 569.81C486.52 575.34 501.11 579.55 515.4 584.55C518.9 585.77 520.19 584.81 521.71 581.58C531.07 561.7 540.73 541.97 550.25 522.17C555.34 511.59 560.37 500.98 565.87 489.45C441.41 514.22 317.93 538.79 193.44 563.56H193.45ZM676.7 230.17H670.54C603.24 230.17 535.93 230.21 468.63 230.07C464.37 230.07 462.18 231.48 460.12 235.11C419.03 307.48 377.81 379.77 336.62 452.09C334.22 456.3 331.89 460.56 329.14 465.5C331.79 465.16 333.45 465.04 335.06 464.72C369.33 457.89 403.59 451.02 437.85 444.18C490.71 433.62 543.58 423.1 596.42 412.4C598.26 412.03 600.58 410.28 601.3 408.59C623.47 356.54 645.47 304.42 667.48 252.31C670.5 245.17 673.44 237.99 676.69 230.18L676.7 230.17Z"
					variants={icon}
					initial={svg_init}
					animate="visible"
					transition={{
						default: { duration: 1, ease: "easeInOut" },
						fill: {
							duration: 1.5,
							delay: 0.5,
							ease: [1, 0, 0.3, 0.5],
						},
					}}
				/>
			</motion.svg>
		</motion.div>
	);
}
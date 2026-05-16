export default function SuggestionsBox() {
	return (
		<div className="mt-6 mb-3 rounded-lg bg-[rgb(246,246,246)] pl-5 pr-6 pt-5 pb-2 mr-3 flex flex-col">
			<div className="text-xl sm:text-lg font-bold flex font-serif w-full border-[rgb(230,230,230)] leading-none mb-2">
				Have Suggestions For Our Website?
				<a
					href="mailto:theexonianwb@gmail.com"
					className="ml-auto font-sans text-sm text-red-700 font-bold hover:underline text-right mr-2 lg:hidden"
				>
					Contact Us
				</a>
			</div>
			<div className="flex flex-col md:gap-6">
				<p className="text-sm font-serif text-foreground mb-3">
					We're always looking to improve the design of our website and would love to hear your suggestions! If you have any ideas or feedback, please don't hesitate to reach out.
				</p>
			</div>
			<a /* Hidden on larger screens, visible on mobile */
				href="mailto:theexonianwb@gmail.com"
				className="hidden lg:inline-flex font-sans text-sm text-red-700 font-bold hover:underline pb-2"
			>
				Contact Us
			</a>
		</div>
	);
}

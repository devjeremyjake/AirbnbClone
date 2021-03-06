import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";

const Search = ({ searchResults }) => {
	const router = useRouter();
	const { location, startDate, endDate, noOfGuests } = router.query;
	const formattedStartDate = format(new Date(startDate), "dd MMMM yyyy");
	const formattedEndDate = format(new Date(endDate), "dd MMMM yyyy");

	const range = `${formattedStartDate} - ${formattedEndDate}`;

	return (
		<div className="h-screen">
			<Header placeholder={`${location} | ${range} | ${noOfGuests} guests`} />
			<main className="flex">
				<section className="flex-grow pt-14 px-6">
					<p className="text-xs">
						300+ Stays {range} for {noOfGuests} guests
					</p>
					<h1 className="text-3xl font-semibold mt-2 mb-6">
						Stays in {location}
					</h1>
					<div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
						<p
							className="px-4 py-2 border rounded-full cursor-pointer 
                        bg-gray-100 hover:shadow-lg active:scale-94 transition duration-100 ease-out transform"
						>
							Cancellation flexibility
						</p>
						<p
							className="px-4 py-2 border rounded-full cursor-pointer 
                        bg-gray-100 hover:shadow-lg active:scale-94 transition duration-100 ease-out transform"
						>
							Type of Place
						</p>
						<p
							className="px-4 py-2 border rounded-full cursor-pointer 
                        bg-gray-100 hover:shadow-lg active:scale-94 transition duration-100 ease-out transform"
						>
							Price
						</p>
						<p
							className="px-4 py-2 border rounded-full cursor-pointer 
                        bg-gray-100 hover:shadow-lg active:scale-94 transition duration-100 ease-out transform"
						>
							Rooms and Beds
						</p>
					</div>
					<div className="flex flex-col">
						{searchResults?.map((item) => (
							<InfoCard key={item.img} content={item} />
						))}
					</div>
				</section>
				{/* <section></section> */}
			</main>
			<Footer />
		</div>
	);
};

export default Search;

export async function getServerSideProps() {
	const searchResults = await fetch("https://links.papareact.com/isz").then(
		(res) => res.json()
	);

	return {
		props: {
			searchResults,
		},
	};
}

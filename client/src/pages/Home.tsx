import { useList } from "@pankod/refine-core";
import {
	PieChart,
	PropertyReferrals,
	TotalRevenue,
	PropertyCard,
	TopAgent,
} from "../components";

import { Typography, Box, Stack } from "@mui/material";

const Home = () => {
	return (
		<Box>
			<Typography fontSize={25} fontWeight={700} color="#11142D">
				Dashboard
			</Typography>
			<Box mt="2px" display="flex" flexWrap="wrap" gap={4}>
				<PieChart
					title="Properties for Sale"
					value={684}
					series={[75, 25]}
					colors={["#475be8", "#e4e8ef"]}
				/>
				<PieChart
					title="Properties for Rent"
					value={550}
					series={[60, 40]}
					colors={["#475be8", "#e4b8ef"]}
				/>
				<PieChart
					title="Total Customers"
					value={5684}
					series={[75, 25]}
					colors={["#275be8", "#e4e8ef"]}
				/>
				<PieChart
					title="Total Cities"
					value={555}
					series={[75, 25]}
					colors={["#475be8", "#e4e8ef"]}
				/>
			</Box>
		</Box>
	);
};

export default Home;

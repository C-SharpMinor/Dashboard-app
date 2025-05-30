import ReactApexChart from "react-apexcharts";
import { Box, Typography, Stack } from "@mui/material";
import { PieChartProps } from "../../interfaces/home";

const PieChart = ({ title, value, series, colors }: PieChartProps) => {
	return (
		<Box>
			<Stack direction="column">
				<Typography fontSize={14} color="#808191">
					{title}
				</Typography>
				<Typography fontSize={24} color="#11142d" fontWeight={700} mt={1}>
					{value}
				</Typography>
			</Stack>

			<ReactApexChart
				options={{
					chart: { type: "donut" },
					colors,
					legend: { show: false },
					dataLabels: { enabled: false },
				}}
				type="pie"
				series={series}
				height={150}
			/>
		</Box>
	);
};

export default PieChart;

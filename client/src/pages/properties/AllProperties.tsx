import React from "react";
import { Add } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { useList } from "@refinedev/core";
import { useNavigate } from "react-router-dom";

import { PropertyCard, CustomButton } from "../../components";

const AllProperties = () => {
	const navigate = useNavigate();
	return (
		<Box>
			<Stack direction="row" justifyContent="space-between" alignItems="center">
				<Typography fontSize={25} fontWeight={700} color="#11142d">
					{" "}
					All Properties{" "}
				</Typography>

				<CustomButton
					title="Add Property"
					handleClick={() => navigate("/properties/create")}
					backgroundColor="#5C64F2"
					color="#fcfcfc"
					icon={<Add />}
				/>
			</Stack>
		</Box>
	);
};

export default AllProperties;

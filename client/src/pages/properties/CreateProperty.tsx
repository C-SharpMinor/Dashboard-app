import React, { useState } from "react";
import { useGetIdentity } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form"; //would've put above but that module has no 'FieldValues' then again, useForm could've come down here but the purpose of this is to learn refine so lemme leave it with @refinedev...

import { useNavigate } from "react-router-dom";
import Form from "../../components/common/Form";

const CreateProperty = () => {
	type IUser = {
		email: string;
		username?: string;
	};

	const navigate = useNavigate();
	const { data: user } = useGetIdentity<IUser>();
	const [propertyImage, setPropertyImage] = useState({ name: "", url: "" });
	const {
		refineCore: { onFinish, formLoading },
		register,
		handleSubmit,
	} = useForm();

	const handleImageChange = (file: File) => {
		const reader = (readFile: File) =>
			new Promise<string>((resolve, reject) => {
				const fileReader = new FileReader();
				fileReader.onload = () => resolve(fileReader.result as string);
				fileReader.readAsDataURL(readFile);
			});

		reader(file).then((result: string) =>
			setPropertyImage({ name: file?.name, url: result })
		);
	};

	const onFinishHandler = async (data: FieldValues) => {
		if (!propertyImage.name) return alert("Please select an image");

		await onFinish({
			...data,
			photo: propertyImage.url,
			email: user?.email || "unknown",
		});
	};

	return (
		<Form
			type="Create"
			register={register}
			onFinish={onFinish}
			formLoading={formLoading}
			handleSubmit={handleSubmit}
			handleImageChange={handleImageChange}
			onFinishHandler={onFinishHandler}
			propertyImage={propertyImage}
		/>
	);
};

export default CreateProperty;

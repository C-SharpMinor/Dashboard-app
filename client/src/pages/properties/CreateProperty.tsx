import React, { useState } from "react";
import { useGetIdentity } from "@refinedev/core";
import { FieldValues, useForm } from "@refinedev/react-hook-form";
import { useNavigate } from "react-router-dom";
import Form from "../../components/common/Form";

const CreateProperty = () => {
	const navigate = useNavigate();
	const { data: user } = useGetIdentity();
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

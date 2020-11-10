import { useState } from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import style from "../styles/pages/home.module.scss";

interface PropsHome {
	imageLink: string;
}

export default function Home({ imageLink }: PropsHome) {
	const [image, setImage] = useState(imageLink);
	const [loading, setLoading] = useState(false);

	const GetNewImage = async () => {
		setLoading(true);

		let response = await axios.get(
			"https://api.giphy.com/v1/gifs/random?api_key=uspJht4FxAOWcWkpob2t63EjunkQ7XK4&tag=&rating=g"
		);

		if (response.status === 200) {
			setLoading(false);
			setImage(response.data.data.image_original_url);
		}
	};

	return (
		<>
			<Head>
				<title>Random Gif App</title>
			</Head>
			<main id={style.body}>
				<h1>Random Gif App</h1>

				{loading ? (
					<div id={style.containerLoading}>
						<span></span>
					</div>
				) : (
					<div
						id={style.containerGif}
						style={{
							backgroundImage: `url(${image})`,
						}}
					></div>
				)}

				<button onClick={() => GetNewImage()}>New Gif</button>
			</main>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	let response = await axios
		.get(
			"https://api.giphy.com/v1/gifs/random?api_key=uspJht4FxAOWcWkpob2t63EjunkQ7XK4&tag=&rating=g"
		)
		.then(res => res.data.data.image_original_url);

	return {
		props: { imageLink: response },
	};
};

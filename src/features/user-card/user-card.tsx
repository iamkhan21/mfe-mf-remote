import React from "react";
import { Box, Button, Card, Heading } from "@radix-ui/themes";

type UserCardProps = {
	label?: string;
};

const UserCard: React.FC<UserCardProps> = (props) => {
	const channel = React.useRef<BroadcastChannel>();

	React.useEffect(() => {
		channel.current = new BroadcastChannel("channel");

		function onMessage(event: MessageEvent) {
			console.log("remote button received: ", event.data);
		}

		channel.current?.addEventListener("message", onMessage);

		return () => {
			channel.current?.removeEventListener("message", onMessage);
		};
	}, []);

	function sendMessage() {
		channel.current?.postMessage("Hello from remote");
	}

	return (
		<Card>
			<Heading size="6">User card</Heading>

			<Box py="4">
				<Button onClick={sendMessage}>Tesyt Button</Button>
			</Box>
		</Card>
	);
};

export default UserCard;

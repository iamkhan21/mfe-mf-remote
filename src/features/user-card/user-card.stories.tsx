import type { Story } from "@ladle/react";
import type React from "react";
import UserCard, { type User } from "./user-card";
import { Button, Flex } from "@radix-ui/themes";

export const EmptyExample: Story<React.ComponentProps<typeof UserCard>> =
	() => <UserCard />;

EmptyExample.storyName = "Empty";

export const PrefilledExample: Story<React.ComponentProps<typeof UserCard>> = (
	args,
) => <UserCard {...args} />;

PrefilledExample.storyName = "Prefilled";

PrefilledExample.args = {
	user: {
		name: "John Doe",
		email: "john@doe.com",
		phone: "+1 555 555 5555",
		avatar: "https://avatars.githubusercontent.com/u/12345678?s=200&v=4",
	},
};

export const ExampleWithRxDB: Story<React.ComponentProps<typeof UserCard>> =
	() => {
		function handleSubmit(user: User) {
			console.log(user);
		}

		function clearDB() {
			window.indexedDB.deleteDatabase("rem");
		}

		return (
			<>
				<UserCard onSubmit={handleSubmit} />
				<Flex gap="4" py="4" align="center" justify="end">
					<Button color="red" variant="soft" onClick={clearDB}>
						Clear DB
					</Button>
					<Button color="green" type="submit" form={UserCard.formId}>
						Save to DB
					</Button>
				</Flex>
			</>
		);
	};

ExampleWithRxDB.storyName = "With RxDB";

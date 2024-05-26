import { type ChangeEvent, type Reducer, useReducer } from "react";
import { Card, Grid, Separator, Text, TextField } from "@radix-ui/themes";

export type User = {
  name: string;
  email: string;
  phone: string;
  avatar: string;
};

type UserCardProps = {
	user?: User;
	onSubmit?: (user: User) => void;
};

const USER_FORM_ID = "user-form";

function UserCard({
	user = {
		name: "",
		email: "",
		phone: "",
		avatar: "",
	},
	onSubmit = () => {},
}: UserCardProps) {
	const [state, dispatch] = useReducer<
		Reducer<
			User,
			{
				type: keyof User;
				payload: User[keyof User];
			}
		>
	>(
		(state, action) => ({
			...state,
			[action.type]: action.payload,
		}),
		user,
	);

	function handleInput(e: ChangeEvent<HTMLInputElement>) {
		dispatch({
			type: e.target.name as keyof User,
			payload: e.target.value,
		});
	}

	return (
		<Card asChild>
			<form
				id={USER_FORM_ID}
				onSubmit={(e) => {
					e.preventDefault();
					onSubmit(state);
				}}
			>
				<TextField.Root
					placeholder="Username"
					value={state.name}
					name="name"
					required
					onChange={handleInput}
				/>
				<Separator my="3" size="4" />
				<Grid columns="auto 1fr" gapY="3" gapX="4">
					<Text size="4">Email:</Text>
					<TextField.Root
						placeholder="Email"
						name="email"
						type="email"
						required
						value={state.email}
						onChange={handleInput}
					/>
					<Text size="4">Phone:</Text>
					<TextField.Root
						placeholder="Phone"
						name="phone"
						type="tel"
						value={state.phone}
						required
						onChange={handleInput}
					/>
				</Grid>
			</form>
		</Card>
	);
}

export default UserCard;

UserCard.formId = USER_FORM_ID;
